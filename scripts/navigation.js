document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const pageId = this.dataset.page;
            showPage(pageId);
        });
    });

    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', function() {
            if(this.classList.contains('coming-soon')) return;
            const game = this.dataset.game;
            showPage(game);
            showBetModal();
        });
    });

    document.querySelector('.back-button')
        .addEventListener('click', function() {
            showPage('games');
    });
});

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('show');
    });

    const backButton = document.querySelector('.back-button');
    if (['games', 'stats', 'account'].includes(pageId)) {
        backButton.classList.remove('visible');
    } else {
        backButton.classList.add('visible');
    }

    const activePage = document.getElementById(`${pageId}${pageId === 'blackjack' ? '-game' : ''}`);
    activePage.classList.add('show');

    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
        if(tab.dataset.page === pageId) tab.classList.add('active');
    });

    if (pageId === 'stats') {
        if (!balanceChart) {
            initializeBalanceChart();
        } else {
            updateBalanceChart(BettingSystem.balanceHistory);
        }
    }
}

function showBetModal(){
    BettingSystem.reset();
    document.getElementById('bet-modal').style.display = 'block';
}