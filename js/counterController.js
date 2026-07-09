let wins = 0;
let losses = 0;
const STORAGE_KEY = 'obs-winloss-counter-state';
let channel;

function updateLabels() {
    document.getElementById('wins').textContent = wins;
    document.getElementById('losses').textContent = losses;
}

function saveState() {
    const state = { wins, losses, updated: Date.now() };
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
        console.warn('Failed to save state to localStorage', err);
    }

    if (channel) {
        channel.postMessage(state);
    }
}

function setState(newWins, newLosses) {
    const updated = newWins !== wins || newLosses !== losses;
    wins = newWins;
    losses = newLosses;
    if (updated) {
        updateLabels();
    }
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
    saveState();
}

function loadState() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const state = JSON.parse(stored);
            if (typeof state.wins === 'number' && typeof state.losses === 'number') {
                wins = state.wins;
                losses = state.losses;
            }
        }
    } catch (err) {
        console.warn('Failed to load state from localStorage', err);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('win-plus').addEventListener('click', () => handleButtonPress('win+'));
    document.getElementById('win-minus').addEventListener('click', () => handleButtonPress('win-'));
    document.getElementById('lose-plus').addEventListener('click', () => handleButtonPress('lose+'));
    document.getElementById('lose-minus').addEventListener('click', () => handleButtonPress('lose-'));
    document.getElementById('clear-button').addEventListener('click', () => handleButtonPress('clear'));

    try {
        channel = new BroadcastChannel('obs-winloss-counter');
        channel.addEventListener('message', (event) => {
            if (event.data && typeof event.data.wins === 'number' && typeof event.data.losses === 'number') {
                setState(event.data.wins, event.data.losses);
            }
        });
    } catch (err) {
        console.warn('BroadcastChannel not available', err);
    }

    window.addEventListener('storage', (event) => {
        if (event.key === STORAGE_KEY && event.newValue) {
            try {
                const state = JSON.parse(event.newValue);
                if (typeof state.wins === 'number' && typeof state.losses === 'number') {
                    setState(state.wins, state.losses);
                }
            } catch (err) {
                console.warn('Failed to parse storage event state', err);
            }
        }
    });

    loadState();
    updateLabels();
});