// Blackjack Game Component with Solana Devnet betting
const BlackjackGame = () => {
  const [betSol, setBetSol] = React.useState(0.1);
  const [status, setStatus] = React.useState('betting'); // betting | player | dealer | settled
  const [deck, setDeck] = React.useState([]);
  const [playerHand, setPlayerHand] = React.useState([]);
  const [dealerHand, setDealerHand] = React.useState([]);
  const [message, setMessage] = React.useState('');
  const [processing, setProcessing] = React.useState(false);
  const [txLinks, setTxLinks] = React.useState([]);

  const L = solanaWeb3.LAMPORTS_PER_SOL;

  const newDeck = () => {
    const suits = ['♠', '♥', '♦', '♣'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const cards = [];
    for (const s of suits) {
      for (const r of ranks) cards.push({ r, s });
    }
    // Shuffle
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  };

  const handValue = (hand) => {
    let total = 0;
    let aces = 0;
    for (const c of hand) {
      if (c.r === 'A') { total += 11; aces++; }
      else if (['K', 'Q', 'J'].includes(c.r)) total += 10;
      else total += parseInt(c.r, 10);
    }
    while (total > 21 && aces > 0) { total -= 10; aces--; }
    return total;
  };

  const draw = (count = 1) => {
    const d = [...deck];
    const drawn = [];
    for (let i = 0; i < count; i++) drawn.push(d.shift());
    setDeck(d);
    return drawn;
  };

  const resetGame = () => {
    setStatus('betting');
    setDeck([]);
    setPlayerHand([]);
    setDealerHand([]);
    setMessage('');
    setProcessing(false);
    setTxLinks([]);
  };

  const deal = async () => {
    if (!window.walletConnected) {
      window.setShowWalletModal(true);
      return;
    }
    if (betSol <= 0) return alert('Enter a valid bet');
    setProcessing(true);
    try {
      const lamports = Math.floor(betSol * L);
      const sig = await window.SolanaCasino.placeBet(lamports);
      setTxLinks((prev) => [...prev, { type: 'bet', sig }]);

      const d = newDeck();
      setDeck(d);
      const ph = [d[0], d[2]];
      const dh = [d[1], d[3]];
      setPlayerHand(ph);
      setDealerHand(dh);
      setDeck(d.slice(4));
      setStatus('player');

      const pv = handValue(ph);
      const dv = handValue([dh[0]]);
      if (pv === 21) {
        // Natural blackjack: 1.5x profit (total return 2.5x)
        await settle('blackjack');
      } else {
        setMessage('Your move: Hit or Stand');
      }
    } catch (e) {
      console.error(e);
      alert(e.message || 'Bet transaction failed or rejected');
      resetGame();
    } finally {
      setProcessing(false);
    }
  };

  const hit = () => {
    if (status !== 'player') return;
    const [card] = draw(1);
    const newHand = [...playerHand, card];
    setPlayerHand(newHand);
    const v = handValue(newHand);
    if (v > 21) {
      setMessage('Busted!');
      settle('lose');
    }
  };

  const stand = async () => {
    if (status !== 'player') return;
    setStatus('dealer');
    // Dealer draws to 17+
    let dh = [...dealerHand];
    while (handValue(dh) < 17) {
      const [c] = draw(1);
      dh = [...dh, c];
    }
    setDealerHand(dh);

    const pv = handValue(playerHand);
    const dv = handValue(dh);
    if (dv > 21) return settle('win');
    if (pv > dv) return settle('win');
    if (pv < dv) return settle('lose');
    return settle('push');
  };

  const settle = async (outcome) => {
    setProcessing(true);
    try {
      const playerPkStr = window.playerAddress;
      const lamports = Math.floor(betSol * L);
      if (outcome === 'win') {
        const payoutLamports = lamports * 2; // return including winnings
        const sig = await window.SolanaCasino.payout(payoutLamports, playerPkStr);
        setTxLinks((prev) => [...prev, { type: 'payout', sig }]);
        setMessage('You win! Payout sent.');
      } else if (outcome === 'blackjack') {
        const payoutLamports = Math.floor(lamports * 2.5);
        const sig = await window.SolanaCasino.payout(payoutLamports, playerPkStr);
        setTxLinks((prev) => [...prev, { type: 'payout', sig }]);
        setMessage('Blackjack! 2.5x payout sent.');
      } else if (outcome === 'push') {
        const payoutLamports = lamports; // refund
        const sig = await window.SolanaCasino.payout(payoutLamports, playerPkStr);
        setTxLinks((prev) => [...prev, { type: 'refund', sig }]);
        setMessage('Push. Bet refunded.');
      } else {
        setMessage('House wins.');
      }
    } catch (e) {
      console.error(e);
      alert('Payout failed. Ensure house has SOL on devnet.');
    } finally {
      setStatus('settled');
      setProcessing(false);
    }
  };

  const renderCard = (card, hidden=false) => {
    const isRed = card?.s === '♥' || card?.s === '♦';
    const cls = hidden ? 'card-hidden' : isRed ? 'card-red' : 'card-black';
    return (
      <div className={`playing-card ${cls}`}>{hidden ? '' : `${card.r}${card.s}`}</div>
    );
  };

  if (!window.walletConnected) {
    return (
      <div className="bg-stake-gray rounded-3xl p-8 border border-stake-purple/30">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gradient mb-4">Blackjack</h2>
          <p className="text-gray-300 mb-6">Play with SOL on Devnet</p>
          <div className="bg-stake-dark rounded-2xl p-6 border border-stake-purple/30">
            <h3 className="text-xl font-semibold text-white mb-4">Connect Your Wallet</h3>
            <p className="text-gray-300 mb-4">Connect your wallet to start playing Blackjack</p>
            <button 
              onClick={() => window.setShowWalletModal(true)}
              className="bg-gradient-to-r from-stake-purple to-stake-pink text-white px-8 py-3 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    );
  }

  const pv = handValue(playerHand);
  const dv = status === 'player' ? handValue([dealerHand[0]]) : handValue(dealerHand);

  const explorer = (sig) => `https://explorer.solana.com/tx/${sig}?cluster=devnet`;

  return (
    <div className="bg-stake-gray rounded-3xl p-8 border border-stake-purple/30">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gradient mb-4">Blackjack</h2>
        <p className="text-gray-300 mb-6">Devnet SOL betting. Ensure House has SOL for payouts.</p>

        <div className="bg-stake-dark rounded-2xl p-6 border border-stake-purple/30 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <p className="text-gray-300 text-sm">Player</p>
              <p className="text-stake-purple text-sm break-all">{window.playerAddress}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-300 text-sm">Bet (SOL)</p>
              <input 
                type="number" step="0.01" min="0.01"
                value={betSol}
                onChange={(e) => setBetSol(parseFloat(e.target.value))}
                className="w-full bg-stake-gray border border-stake-purple rounded-lg px-3 py-2 text-white text-center"
              />
            </div>
            <div className="text-center">
              <p className="text-gray-300 text-sm">Status</p>
              <p className="text-lg font-semibold text-stake-purple">{status}</p>
            </div>
          </div>
          <div className="text-stake-purple text-sm">Network: Devnet</div>
        </div>

        {/* Hands */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-stake-dark rounded-2xl p-6 border border-stake-purple/30">
            <h3 className="text-xl font-semibold mb-2">Dealer {status === 'player' ? `(${dv})` : `(${dv})`}</h3>
            <div className="flex justify-center"> 
              {dealerHand.length > 0 ? (
                <>
                  {renderCard(dealerHand[0])}
                  {status === 'player' ? renderCard(dealerHand[1], true) : renderCard(dealerHand[1])}
                  {dealerHand.slice(2).map((c, i) => <React.Fragment key={i}>{renderCard(c)}</React.Fragment>)}
                </>
              ) : (
                <div className="text-gray-400">No cards</div>
              )}
            </div>
          </div>
          <div className="bg-stake-dark rounded-2xl p-6 border border-stake-purple/30">
            <h3 className="text-xl font-semibold mb-2">You ({pv})</h3>
            <div className="flex justify-center">
              {playerHand.length > 0 ? playerHand.map((c, i) => <React.Fragment key={i}>{renderCard(c)}</React.Fragment>) : <div className="text-gray-400">No cards</div>}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3 mb-4">
          {status === 'betting' && (
            <button disabled={processing} onClick={deal} className={`px-6 py-3 rounded-full ${processing ? 'bg-gray-600' : 'bg-gradient-to-r from-stake-purple to-stake-pink hover:opacity-90'}`}>Deal</button>
          )}
          {status === 'player' && (
            <>
              <button onClick={hit} className="px-6 py-3 rounded-full bg-stake-purple hover:opacity-90">Hit</button>
              <button onClick={stand} className="px-6 py-3 rounded-full bg-stake-pink hover:opacity-90">Stand</button>
            </>
          )}
          {status === 'settled' && (
            <button onClick={resetGame} className="px-6 py-3 rounded-full bg-gray-600 hover:bg-gray-500">Play Again</button>
          )}
        </div>

        {message && <div className="text-stake-purple mb-4">{message}</div>}

        {/* Tx history */}
        {txLinks.length > 0 && (
          <div className="bg-stake-dark rounded-2xl p-4 border border-stake-purple/30">
            <h4 className="font-semibold mb-2">Transactions</h4>
            <ul className="text-sm space-y-1">
              {txLinks.map((t, i) => (
                <li key={i} className="text-gray-300">
                  {t.type}: <a className="underline" href={explorer(t.sig)} target="_blank" rel="noopener noreferrer">{t.sig.slice(0, 8)}…</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// Export for use in main HTML
window.BlackjackGame = BlackjackGame;