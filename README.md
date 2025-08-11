# $TOKABU Casino - Premium Gaming Experience

A modern casino platform featuring classic casino games with a beautiful, responsive design. Currently featuring Blackjack and Roulette games with plans for $TOKABU token integration on Solana blockchain.

## 🎰 Features

### 🃏 Blackjack Game
- **8-Deck Shoe**: Authentic casino experience with 8 decks
- **Professional Rules**: Standard casino Blackjack rules
- **Multiple Actions**: Hit, Stand, Double Down, Split, Surrender
- **Insurance Betting**: When dealer shows an Ace
- **Blackjack Payouts**: 3:2 for natural Blackjack
- **Real-time Gameplay**: Smooth animations and card dealing

### 🎲 Roulette Game
- **European Roulette**: Single zero wheel (0-36)
- **Multiple Bet Types**: Numbers, Red/Black, Even/Odd, High/Low
- **Realistic Payouts**: Up to 35:1 for single number bets
- **Smooth Animations**: Wheel spinning and result display
- **Bet History**: Track your previous bets and results

### 🎨 User Experience
- **Modern UI**: Beautiful gradient design with animations
- **Responsive Design**: Works on desktop and mobile
- **Smooth Animations**: Card dealing, wheel spinning, and transitions
- **Game Statistics**: Real-time balance and bet tracking
- **Comprehensive Rules**: Detailed game instructions

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required - runs directly in the browser

### Installation & Running

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/tokabu-casino.git
   cd tokabu-casino
   ```

2. **Open in your browser:**
   
   **Option 1: Direct file opening**
   - Simply double-click `index.html` to open in your default browser
   
   **Option 2: Local server (recommended)**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```
   
   Then open `http://localhost:8000` in your browser

3. **Start playing!**
   - Choose between Blackjack or Roulette
   - Set your bet amount
   - Enjoy the games!

## 🎮 How to Play

### Blackjack
1. **Start a Game**
   - Click "New Game" to initialize a new Blackjack session
   - Set your bet amount using the slider
   - Click "Deal Cards" to begin

2. **Game Actions**
   - **Hit**: Take another card
   - **Stand**: Keep your current hand
   - **Double**: Double your bet and take one more card
   - **Split**: Split pairs into two separate hands
   - **Surrender**: Give up your hand for half your bet back
   - **Insurance**: Bet against dealer Blackjack when dealer shows Ace

3. **Winning**
   - **Blackjack** (Ace + 10/face): Pays 3:2
   - **Regular Win**: Pays 1:1
   - **Push**: Tie game, bet returned
   - **Insurance Win**: Pays 2:1 if dealer has Blackjack

### Roulette
1. **Place Your Bet**
   - Choose your bet type (number, color, even/odd, etc.)
   - Set your bet amount
   - Click on the betting area to place your bet

2. **Bet Types**
   - **Single Number**: Pays 35:1
   - **Red/Black**: Pays 1:1
   - **Even/Odd**: Pays 1:1
   - **High (19-36)/Low (1-18)**: Pays 1:1

3. **Spin the Wheel**
   - Click "Spin" to start the wheel
   - Watch the ball land on your number
   - Collect your winnings!

## 🏗️ Project Structure

```
tokabu-casino/
├── index.html              # Main casino application
├── roulette-game.js        # Roulette game logic
├── blackjack.jpeg          # Blackjack game image
├── roulette.jpeg           # Roulette game image
├── chart.jpeg              # Chart image
├── tokabu.jpeg             # Tokabu logo
├── logo-white.png          # White logo
└── README.md               # This file
```

## 🔧 Technical Details

### Game Rules

#### Blackjack
- **Dealer Rules**: Hit on 16, stand on 17
- **Blackjack**: Ace + 10/face card (automatic win)
- **Splitting**: Available for pairs of equal value
- **Doubling**: Available on first two cards
- **Surrender**: Available on first two cards
- **Insurance**: Offered when dealer shows Ace

#### Roulette
- **Wheel Type**: European (single zero)
- **Numbers**: 0-36
- **House Edge**: ~2.7% (European Roulette)
- **Betting Options**: Inside and outside bets

### Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **UI Framework**: Tailwind CSS
- **React**: CDN version for component structure
- **Animations**: CSS animations and transitions
- **Responsive Design**: Mobile-first approach

## 🎯 Game Statistics

### Blackjack
- **House Edge**: ~0.5%
- **Decks**: 8 decks (416 cards)
- **Shuffle**: Automatic after each game
- **Payouts**: 
  - Blackjack: 3:2
  - Regular Win: 1:1
  - Insurance: 2:1
  - Surrender: 0.5:1

### Roulette
- **House Edge**: ~2.7%
- **Numbers**: 37 (0-36)
- **Payouts**:
  - Single Number: 35:1
  - Red/Black: 1:1
  - Even/Odd: 1:1
  - High/Low: 1:1

## 🔮 Future Features

### Planned Solana Integration
- **Wallet Connection**: Phantom wallet integration
- **$TOKABU Tokens**: Native SPL token integration
- **Smart Contracts**: On-chain game state
- **Provably Fair**: Blockchain-based randomness
- **Real Money Gaming**: Actual token betting

### Additional Games
- **Slots**: Classic slot machine games
- **Poker**: Texas Hold'em and other variants
- **Craps**: Dice game with multiple betting options
- **Baccarat**: High-stakes card game

## 🛠️ Development

### Local Development
1. Clone the repository
2. Open `index.html` in your browser
3. Use browser developer tools for debugging
4. Make changes and refresh to see updates

### Customization
- **Styling**: Modify Tailwind classes in `index.html`
- **Game Logic**: Edit `roulette-game.js` for game mechanics
- **Assets**: Replace images in the root directory
- **Colors**: Update the Tailwind config in the HTML file

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎉 Acknowledgments

- **$TOKABU Community**: For the amazing support and feedback
- **Casino Gaming Experts**: For the authentic game rules
- **UI/UX Designers**: For the beautiful casino interface
- **Open Source Community**: For the amazing tools and libraries

## 📞 Support

- **Discord**: Join our community
- **Twitter**: @TOKABU_Casino
- **Website**: tokabu.casino
- **Email**: support@tokabu.casino

## ⚠️ Disclaimer

This is currently a demonstration application for entertainment purposes. Please gamble responsibly and only with funds you can afford to lose. This application does not guarantee winnings. Users must be 18+ to play.

---

**$TOKABU Casino - Where Entertainment Meets Innovation! 🎰🚀**