let balanceChart = null;

function initializeBalanceChart() {
    const ctx = document.getElementById('balance-chart').getContext('2d');

    balanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Balance Over Time',
                data: [],
                borderColor: '#4CAF50',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Round'
                    }
                },
                y: {
                    display: true,
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Balance'
                    }
                }
            }
        }
    });

    updateBalanceChart(BettingSystem.balanceHistory);
}

function updateBalanceChart(history) {
    if (!balanceChart) return;

    const maxRounds = 20;
    const startRound = Math.max(0, history.length - maxRounds);

    balanceChart.data.labels = history.slice(startRound).map((_, index) => `Round ${startRound + index}`);
    balanceChart.data.datasets[0].data = history.slice(startRound);

    balanceChart.options.scales.y.Max = Math.max(...history) * 1.1;

    balanceChart.update();
}