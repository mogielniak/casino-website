const Blackjack = {
    gameOver: false,

    init() {
        this.bindEvents();
        deckManager.createDeck();
        deckManager.shuffleDeck();
    },

    bindEvents() {
        document.getElementById('new-game').addEventListener('click', () => this.newGame());
        document.getElementById('hit').addEventListener('click', () => this.hit());
        document.getElementById('stand').addEventListener('click', () => this.stand());
    },

    newGame() {
        this.gameOver = false;
        deckManager.playerHand = [];
        deckManager.dealerHand = [];
        document.getElementById('message').textContent = '';

        deckManager.createDeck();
        deckManager.shuffleDeck();

        deckManager.playerHand.push(deckManager.deck.pop());
        deckManager.dealerHand.push(deckManager.deck.pop());
        deckManager.playerHand.push(deckManager.deck.pop());
        deckManager.dealerHand.push(deckManager.deck.pop());

        this.updateDisplay();
    },

    calculateScore(hand) {
        let score = 0;
        let aces = 0;

        for (let card of hand) {
            if (card.value === 'A') {
                aces += 1;
                score += 11;
            } else if (['J', 'Q', 'K'].includes(card.value)) {
                score += 10;
            } else {
                score += parseInt(card.value);
            }
        }

        while (score > 21 && aces > 0) {
            score -= 10;
            aces -= 1;
        }

        return score;
    },

    updateDisplay() {
        const dealerElement = document.getElementById('dealer-hand');
        const playerElement = document.getElementById('player-hand');

        dealerElement.innerHTML = deckManager.dealerHand.map((card, index) => {
            if (index === 0 && !this.gameOver) {
                return `<div class="card back">🂠</div>`;
            }
            return `<div class="card ${card.color}">${card.value}${card.suit}</div>`;
        }).join('');

        playerElement.innerHTML = deckManager.playerHand.map(card => `
            <div class="card ${card.color}">${card.value}${card.suit}</div>
        `).join('');

        document.getElementById('dealer-score').textContent =
            `Dealer's Score: ${this.gameOver ? this.calculateScore(deckManager.dealerHand) : '?'}`;
        document.getElementById('player-score').textContent =
            `Your Score: ${this.calculateScore(deckManager.playerHand)}`;
    },

    hit() {
        if (this.gameOver) return;

        deckManager.playerHand.push(deckManager.deck.pop());
        const score = this.calculateScore(deckManager.playerHand);

        if (score > 21) {
            this.gameOver = true;
            document.getElementById('message').textContent = 'Bust! You lose!';
        }
        this.updateDisplay();
    },

    stand() {
        if (this.gameOver) return;

        this.gameOver = true;

        while (this.calculateScore(deckManager.dealerHand) < 17) {
            deckManager.dealerHand.push(deckManager.deck.pop());
        }

        const playerScore = this.calculateScore(deckManager.playerHand);
        const dealerScore = this.calculateScore(deckManager.dealerHand);

        this.updateDisplay();

        if (playerScore > 21) {
            document.getElementById('message').textContent = 'You busted! Dealer wins!';
        } else if (dealerScore > 21) {
            document.getElementById('message').textContent = 'Dealer busted! You win!';
        } else if (playerScore > dealerScore) {
            document.getElementById('message').textContent = 'You win!';
        } else if (dealerScore > playerScore) {
            document.getElementById('message').textContent = 'Dealer wins!';
        } else {
            document.getElementById('message').textContent = 'Push!';
        }
    }
};

window.blackjack = Blackjack;