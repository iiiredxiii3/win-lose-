let wins = 0;
let losses = 0;

function updateLabels() {
    document.getElementById('wins').textContent = wins;
    document.getElementById('losses').textContent = losses;
}

function handleButtonPress(type) {
    switch (type) {
        case 'win+':
            wins++;
            break;
        case 'win-':
            if (wins > 0) wins--;
            break;
        case 'lose+':
            losses++;
            break;
        case 'lose-':
            if (losses > 0) losses--;
            break;
        case 'clear':
            wins = 0;
            losses = 0;
            break;
    }

    updateLabels();
}

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('win-plus').addEventListener('click', () => handleButtonPress('win+'));
    document.getElementById('win-minus').addEventListener('click', () => handleButtonPress('win-'));
    document.getElementById('lose-plus').addEventListener('click', () => handleButtonPress('lose+'));
    document.getElementById('lose-minus').addEventListener('click', () => handleButtonPress('lose-'));
    document.getElementById('clear-button').addEventListener('click', () => handleButtonPress('clear'));

    updateLabels();
});