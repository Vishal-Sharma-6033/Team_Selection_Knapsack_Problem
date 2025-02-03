const players = [
    { name: 'Rohit Sharma', value: 10, cost: 5 },
    { name: 'Virat Kohli', value: 8, cost: 4 },
    { name: 'MS Dhoni', value: 6, cost: 3 },
    { name: 'Hardik Pandya', value: 7, cost: 4 },
    { name: 'Suryakumar Yadav', value: 9, cost: 5 },
    { name: 'Ravindra Jadeja', value: 5, cost: 2 }
];

const selectedPlayers = [];

document.querySelectorAll('.bg-green-600').forEach((button, index) => {
    button.addEventListener('click', () => {
        selectedPlayers.push(players[index]);
        updateSelectedTeam();
    });
});

document.getElementById('calculate-team').addEventListener('click', () => {
    const budget = 10; // Example budget
    const bestTeam = knapsack(selectedPlayers, budget);
    displayBestTeam(bestTeam);
});

function updateSelectedTeam() {
    const selectedTeamDiv = document.getElementById('selected-team');
    selectedTeamDiv.innerHTML = '';
    selectedPlayers.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.classList.add('bg-gray-200', 'p-4', 'rounded-lg');
        playerDiv.innerHTML = `
            <h3 class="text-xl font-bold">${player.name}</h3>
            <p>Value: ${player.value}</p>
            <p>Cost: ${player.cost}</p>
        `;
        selectedTeamDiv.appendChild(playerDiv);
    });
}

function knapsack(players, budget) {
    const n = players.length;
    const dp = Array(n + 1).fill().map(() => Array(budget + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= budget; w++) {
            if (players[i - 1].cost <= w) {
                dp[i][w] = Math.max(players[i - 1].value + dp[i - 1][w - players[i - 1].cost], dp[i - 1][w]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    let w = budget;
    const bestTeam = [];
    for (let i = n; i > 0 && w > 0; i--) {
        if (dp[i][w] != dp[i - 1][w]) {
            bestTeam.push(players[i - 1]);
            w -= players[i - 1].cost;
        }
    }

    return bestTeam;
}

function displayBestTeam(bestTeam) {
    const selectedTeamDiv = document.getElementById('selected-team');
    selectedTeamDiv.innerHTML = '';
    bestTeam.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.classList.add('bg-gray-200', 'p-4', 'rounded-lg');
        playerDiv.innerHTML = `
            <h3 class="text-xl font-bold">${player.name}</h3>
            <p>Value: ${player.value}</p>
            <p>Cost: ${player.cost}</p>
        `;
        selectedTeamDiv.appendChild(playerDiv);
    });
}