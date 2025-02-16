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
            loadGame(game);
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

    const activePage = document.getElementById(`${pageId}${pageId === 'blackjack' ? '-game' : ''}`);
    activePage.classList.add('show');

    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
        if(tab.dataset.page === pageId) tab.classList.add('active');
    });
}

function loadGame(game) {
    if(game === 'blackjack') {
        showPage('blackjack');
        setTimeout(() => {
            window.blackjack.init();
            window.blackjack.newGame();
        }, 50);
    }
}