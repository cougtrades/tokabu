// Roulette Game Component
const RouletteGame = () => {
    const [betAmount, setBetAmount] = React.useState(10);
    const [selectedBet, setSelectedBet] = React.useState(null);
    const [isSpinning, setIsSpinning] = React.useState(false);
    const [result, setResult] = React.useState(null);
    const [balance, setBalance] = React.useState(1000);
    const [betHistory, setBetHistory] = React.useState([]);

    // Roulette numbers (0-36)
    const rouletteNumbers = [
        0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
    ];

    const placeBet = (betType, value) => {
        if (balance < betAmount) return;
        setSelectedBet({ type: betType, value, amount: betAmount });
    };

    const spinWheel = () => {
        if (!selectedBet || isSpinning) return;
        
        setIsSpinning(true);
        setResult(null);
        
        // Simulate spinning delay
        setTimeout(() => {
            const winningNumber = Math.floor(Math.random() * 37);
            setResult(winningNumber);
            
            // Calculate winnings
            let won = false;
            let winnings = 0;
            
            if (selectedBet.type === 'number' && selectedBet.value === winningNumber) {
                won = true;
                winnings = selectedBet.amount * 35;
            } else if (selectedBet.type === 'red' && isRed(winningNumber)) {
                won = true;
                winnings = selectedBet.amount * 2;
            } else if (selectedBet.type === 'black' && isBlack(winningNumber)) {
                won = true;
                winnings = selectedBet.amount * 2;
            } else if (selectedBet.type === 'even' && winningNumber % 2 === 0 && winningNumber !== 0) {
                won = true;
                winnings = selectedBet.amount * 2;
            } else if (selectedBet.type === 'odd' && winningNumber % 2 === 1) {
                won = true;
                winnings = selectedBet.amount * 2;
            } else if (selectedBet.type === 'low' && winningNumber >= 1 && winningNumber <= 18) {
                won = true;
                winnings = selectedBet.amount * 2;
            } else if (selectedBet.type === 'high' && winningNumber >= 19 && winningNumber <= 36) {
                won = true;
                winnings = selectedBet.amount * 2;
            }
            
            // Update balance and history
            const newBalance = won ? balance + winnings - selectedBet.amount : balance - selectedBet.amount;
            setBalance(newBalance);
            setBetHistory(prev => [...prev, {
                bet: selectedBet,
                result: winningNumber,
                won,
                winnings: won ? winnings : 0
            }]);
            
            setSelectedBet(null);
            setIsSpinning(false);
        }, 3000);
    };

    const isRed = (number) => {
        const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
        return redNumbers.includes(number);
    };

    const isBlack = (number) => {
        return number !== 0 && !isRed(number);
    };

    const getNumberColor = (number) => {
        if (number === 0) return 'bg-green-600';
        return isRed(number) ? 'bg-red-600' : 'bg-black';
    };

    if (!window.walletConnected) {
        return (
            <div className="bg-stake-gray rounded-3xl p-8 border border-stake-purple/30">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gradient mb-4">Roulette</h2>
                    <p className="text-gray-300 mb-6">European Roulette with $TOKABU tokens</p>
                    
                    <div className="bg-stake-dark rounded-2xl p-6 border border-stake-purple/30">
                        <h3 className="text-xl font-semibold text-white mb-4">Connect Your Wallet</h3>
                        <p className="text-gray-300 mb-4">Connect your wallet to start playing Roulette</p>
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

    return (
        <div className="bg-stake-gray rounded-3xl p-8 border border-stake-purple/30">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gradient mb-4">Roulette</h2>
                <p className="text-gray-300 mb-6">European Roulette with $TOKABU tokens</p>
                
                {/* Balance and Bet Amount */}
                <div className="bg-stake-dark rounded-2xl p-6 border border-stake-purple/30 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                            <p className="text-gray-300 text-sm">Balance</p>
                            <p className="text-2xl font-bold text-green-400">{balance} $TOKABU</p>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-300 text-sm">Bet Amount</p>
                            <input 
                                type="number" 
                                value={betAmount}
                                onChange={(e) => setBetAmount(Number(e.target.value))}
                                className="w-full bg-stake-gray border border-stake-purple rounded-lg px-3 py-2 text-white text-center"
                                min="1"
                                max={balance}
                            />
                        </div>
                        <div className="text-center">
                            <p className="text-gray-300 text-sm">Selected Bet</p>
                            <p className="text-lg font-semibold text-stake-purple">
                                {selectedBet ? `${selectedBet.type}: ${selectedBet.value}` : 'None'}
                            </p>
                        </div>
                    </div>
                    
                    <div className="text-stake-purple text-sm">
                        Connected to {window.blockchainType?.toUpperCase()}: {window.playerAddress?.slice(0, 8)}...{window.playerAddress?.slice(-6)}
                    </div>
                </div>

                {/* Roulette Wheel */}
                <div className="bg-stake-dark rounded-2xl p-6 border border-stake-purple/30 mb-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Roulette Wheel</h3>
                    <div className="flex justify-center mb-4">
                        <div className={`w-32 h-32 rounded-full border-4 border-stake-purple flex items-center justify-center text-2xl font-bold ${
                            isSpinning ? 'animate-spin' : ''
                        }`}>
                            {result !== null ? (
                                <div className={`w-20 h-20 rounded-full ${getNumberColor(result)} flex items-center justify-center text-white`}>
                                    {result}
                                </div>
                            ) : (
                                <div className="text-stake-purple">?</div>
                            )}
                        </div>
                    </div>
                    
                    <button 
                        onClick={spinWheel}
                        disabled={!selectedBet || isSpinning}
                        className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
                            !selectedBet || isSpinning
                                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-stake-purple to-stake-pink text-white hover:shadow-2xl hover:scale-105'
                        }`}
                    >
                        {isSpinning ? 'Spinning...' : 'Spin Wheel'}
                    </button>
                </div>

                {/* Betting Options */}
                <div className="bg-stake-dark rounded-2xl p-6 border border-stake-purple/30 mb-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Place Your Bets</h3>
                    
                    {/* Number Grid */}
                    <div className="grid grid-cols-13 gap-1 mb-4">
                        <div className="col-span-1">
                            <button 
                                onClick={() => placeBet('number', 0)}
                                className={`w-12 h-12 rounded-lg font-bold text-white transition-all duration-200 ${
                                    selectedBet?.type === 'number' && selectedBet?.value === 0
                                        ? 'bg-stake-purple shadow-lg'
                                        : 'bg-green-600 hover:bg-green-500'
                                }`}
                            >
                                0
                            </button>
                        </div>
                        {Array.from({length: 36}, (_, i) => i + 1).map(num => (
                            <div key={num} className="col-span-1">
                                <button 
                                    onClick={() => placeBet('number', num)}
                                    className={`w-12 h-12 rounded-lg font-bold text-white transition-all duration-200 ${
                                        selectedBet?.type === 'number' && selectedBet?.value === num
                                            ? 'bg-stake-purple shadow-lg'
                                            : getNumberColor(num) === 'bg-red-600' 
                                                ? 'bg-red-600 hover:bg-red-500' 
                                                : 'bg-black hover:bg-gray-800'
                                    }`}
                                >
                                    {num}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Outside Bets */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <button 
                            onClick={() => placeBet('red', 'red')}
                            className={`p-3 rounded-lg font-semibold transition-all duration-200 ${
                                selectedBet?.type === 'red'
                                    ? 'bg-stake-purple text-white shadow-lg'
                                    : 'bg-red-600 text-white hover:bg-red-500'
                            }`}
                        >
                            Red (2x)
                        </button>
                        <button 
                            onClick={() => placeBet('black', 'black')}
                            className={`p-3 rounded-lg font-semibold transition-all duration-200 ${
                                selectedBet?.type === 'black'
                                    ? 'bg-stake-purple text-white shadow-lg'
                                    : 'bg-black text-white hover:bg-gray-800'
                            }`}
                        >
                            Black (2x)
                        </button>
                        <button 
                            onClick={() => placeBet('even', 'even')}
                            className={`p-3 rounded-lg font-semibold transition-all duration-200 ${
                                selectedBet?.type === 'even'
                                    ? 'bg-stake-purple text-white shadow-lg'
                                    : 'bg-stake-gray text-white hover:bg-stake-light-gray'
                            }`}
                        >
                            Even (2x)
                        </button>
                        <button 
                            onClick={() => placeBet('odd', 'odd')}
                            className={`p-3 rounded-lg font-semibold transition-all duration-200 ${
                                selectedBet?.type === 'odd'
                                    ? 'bg-stake-purple text-white shadow-lg'
                                    : 'bg-stake-gray text-white hover:bg-stake-light-gray'
                            }`}
                        >
                            Odd (2x)
                        </button>
                        <button 
                            onClick={() => placeBet('low', 'low')}
                            className={`p-3 rounded-lg font-semibold transition-all duration-200 ${
                                selectedBet?.type === 'low'
                                    ? 'bg-stake-purple text-white shadow-lg'
                                    : 'bg-stake-gray text-white hover:bg-stake-light-gray'
                            }`}
                        >
                            1-18 (2x)
                        </button>
                        <button 
                            onClick={() => placeBet('high', 'high')}
                            className={`p-3 rounded-lg font-semibold transition-all duration-200 ${
                                selectedBet?.type === 'high'
                                    ? 'bg-stake-purple text-white shadow-lg'
                                    : 'bg-stake-gray text-white hover:bg-stake-light-gray'
                            }`}
                        >
                            19-36 (2x)
                        </button>
                    </div>
                </div>

                {/* Bet History */}
                {betHistory.length > 0 && (
                    <div className="bg-stake-dark rounded-2xl p-6 border border-stake-purple/30">
                        <h3 className="text-xl font-semibold text-white mb-4">Recent Bets</h3>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                            {betHistory.slice(-5).reverse().map((bet, index) => (
                                <div key={index} className="flex justify-between items-center p-2 bg-stake-gray rounded-lg">
                                    <span className="text-gray-300">
                                        {bet.bet.type}: {bet.bet.value} (${bet.bet.amount})
                                    </span>
                                    <span className="text-gray-300">→ {bet.result}</span>
                                    <span className={bet.won ? 'text-green-400' : 'text-red-400'}>
                                        {bet.won ? `+${bet.winnings}` : `-${bet.bet.amount}`}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Export for use in main HTML
window.RouletteGame = RouletteGame;
