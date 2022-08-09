const player1 = document.querySelector('#player1-name');;
const player2 = document.querySelector('#player2-name');
const player1El = document.querySelector('#player-one');
const player2El = document.querySelector('#player-two');

let isPLaying = false;
let isPLayingAnim = false;
let seconds, minutes, currentPLayer;

//Inicialize Game
const init = () =>{
    startingDisplayEl.classList.add('hidden');
    overallGameDisplay.classList.remove('hidden');

    //Clean all cells from last game
    for(i = 0; i < cells.length; i++){
        cells[i].classList.remove('player1-color', 'player2-color');
        cells[i].classList.add('not-taken');
    }
    
    //Remove the last player active (In case of new game)
    player1El.classList.add('waitting-player');
    player2El.classList.add('waitting-player');
    player1El.classList.remove('player-active');
    player2El.classList.remove('player-active');
    //Sort the first player to play
    let firstMove = Math.floor(Math.random() * 2 + 1);
    currentPLayer = firstMove;
    //Add first player active
    if(currentPLayer == 1){
        player1El.classList.remove('waitting-player');
        player1El.classList.add('player-active');
    }else{
        player2El.classList.remove('waitting-player');
        player2El.classList.add('player-active');
    }

    //Show player names
    player1El.innerHTML = player1.value;
    player2El.innerHTML = player2.value;

    //Start Game
    gameOverDisplayEl.classList.add('hidden');
    isPLaying = true;
    isPLayingAnim = true;
    winner = null
    contador = cells.length;

    //Reset Timer
    clearInterval(countTimer)
    seconds = 0
    minutes = 0
}