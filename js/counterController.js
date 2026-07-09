let wins = 0;
let losses = 0;

function handleButtonPress(type) {
    switch(type) {
        case "win+" :
            wins++;
            break;

        case "win-" :
            if(wins > 0) wins--;
            break;    

        case "lose+" :
            losses++;
            break;  

        case "lose-" :
            if(losses > 0) losses--;
            break;

        case "clear" :
            wins = losses = 0;
            break;
    }
    document.getElementById('wins').textContent = wins;
    document.getElementById('losses').textContent = losses;
}