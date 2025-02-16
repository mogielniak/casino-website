const DeckManager = {
    deck: [],
    playerHand: [],
    dealerHand: [],

    createDeck() {
        const suits = ['♠', '♣', '♥', '♦'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        this.deck = [];

        for(let suit of suits) {
            for(let value of values) {
                this.deck.push({
                    suit,
                    value,
                    color: (suit === '♥' || suit === '♦') ? 'red' : 'black'
                });
            }
        }
    },

// Fisher-Yates algorithm
    shuffleDeck() {
        for(let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }
};

window.deckManager = DeckManager;