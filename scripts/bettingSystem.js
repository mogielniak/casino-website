const BettingSystem = (() => {
    let userBalance = 1000;
    let currentBet = 0;

    const updateDisplay = () => {
        const balanceElement = document.getElementById('balance');
        if(balanceElement) balanceElement.textContent = userBalance;

        const currentBetElement = document.getElementById('current-bet');
        if(currentBetElement) currentBetElement.textContent = currentBet;
    };

    return {
        init() {
            const customBetInput = document.getElementById('custom-bet');

            document.querySelectorAll('.chip').forEach(chip => {
                chip.addEventListener('click', () => {
                    const currentValue = parseInt(customBetInput.value) || 0;
                    const chipValue = parseInt(chip.dataset.amount);

                    customBetInput.value = (currentValue + chipValue).toString();
                    currentBet = currentValue + chipValue;
                    updateDisplay();
                });
            });

            document.getElementById('custom-bet').addEventListener('input', (e) => {
                currentBet = parseInt(e.target.value) || 0;
                updateDisplay();
            });

            document.getElementById('place-bet').addEventListener('click', () => {
                if(currentBet <= 0) {
                    alert("Place a valid bet");
                    return;
                }

                if(currentBet > userBalance) {
                    alert("Insufficient funds");
                    return;
                }

                userBalance -= currentBet;
                updateDisplay();
                window.dispatchEvent(new CustomEvent('bet-placed', {
                    detail: { amount: currentBet }
                }));
                document.getElementById('bet-modal').style.display = 'none';
            });
        },

        win(multiplier = 1) {
            userBalance += currentBet * (1 + multiplier);
            currentBet = 0;
            updateDisplay();
        },

        push() {
            userBalance += currentBet;
            currentBet = 0;
            updateDisplay();
        },

        lose() {
            currentBet = 0;
            updateDisplay();
        },

        reset() {
            currentBet = 0;
            const customBetInput = document.getElementById('custom-bet');
            if(customBetInput) customBetInput.value = '';
            updateDisplay();
        },

        get balance() { return userBalance },
        get currentBet() { return currentBet }
    };
})();

document.addEventListener('DOMContentLoaded', () => BettingSystem.init());