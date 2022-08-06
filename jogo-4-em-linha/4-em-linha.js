//Get DOM elements
const cells = document.querySelectorAll('.cell');
const columns = $('.column');
const headerCells = document.querySelectorAll('.view-play');

const startingDisplayEl = document.querySelector('.start-display');
const gameRulesDisplay = document.querySelector('.rules-display')
const overallGameDisplay = document.querySelector('.game-conteiner');
const gameOverDisplayEl = document.querySelector('.winner-display');

const player1El = document.querySelector('#player-one');
const player2El = document.querySelector('#player-two');
const winnerResultEl = document.querySelector('#winner-result');
const winnerColorEl = document.querySelector('#winner-color');

const timerEl = document.querySelector('.timer');
const finalTimerEl = document.querySelector('#game-time');

//Buttons
const startGameBtn = document.querySelector('#start-game-btn');
const newGameBtn = document.querySelector('#new-game-btn');
const gameRules = document.querySelector('#game-rules-btn')
const backBtn = document.querySelector('#back-btn');

//Players
const player1 = document.querySelector('#player1-name');;
const player2 = document.querySelector('#player2-name');
let currentPLayer = 1;
let winner = null;

//Playing Conditions
let isPLaying = false;
let contador = cells.length;

let seconds = 0;
let minutes = 0;

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
    winner = null

    //Reset Timer
    clearInterval(countTimer)
    seconds = 0
    minutes = 0
}

//Timmer
countTimer = () =>{
    setInterval(() =>{ 
        if(!isPLaying) return
        seconds++;
        if(seconds >= 60){
            seconds = 0
            minutes++
        }

        let s = seconds < 10 ? '0' + seconds: seconds;
        let m = minutes < 10 ? '0' + minutes: minutes;

       
        timerEl.innerHTML = m + ':' + s;

    }, 1000)
}

//Game Logic \\\\ Changing the game status
const clickCell = (idValue) =>{
    if(!isPLaying){
        return
    }

    //Check last cell available
    let column = idValue.split('_')[1];
    for(i = 5; i >= 0; i--){
        let idElement = i + '_' + column
        let cell = document.getElementById(idElement)

        if(cell.classList.contains('not-taken')){
            //Players playing
            if(currentPLayer == 1){ //Player 1 playing
                cell.classList.add('player1-color');
                cell.classList.remove('not-taken');

                player1El.classList.add('waitting-player');
                player1El.classList.remove('player-active');
                player2El.classList.remove('waitting-player');
                player2El.classList.add('player-active');

                currentPLayer = 2;
            }else{ //Player 2 playing
                cell.classList.add('player2-color');
                cell.classList.remove('not-taken');

                player2El.classList.add('waitting-player');
                player2El.classList.remove('player-active');
                player1El.classList.remove('waitting-player');
                player1El.classList.add('player-active');

                currentPLayer = 1;
            }

            //Check result (Win/Draw)
            checkWinConditions()

            //End Game
            if(winner != null){
                isPLaying = false
                gameOverDisplayEl.classList.remove('hidden')
                
                let s = seconds < 10 ? '0' + seconds: seconds;
                let m = minutes < 10 ? '0' + minutes: minutes;
                let minOrSec = minutes >= 1? 'minutes' : 'seconds'
                timerEl.innerHTML = m + ':' + s;
                finalTimerEl.innerHTML = `The game lasted ${m}:${s} ${minOrSec}`

                if(currentPLayer === 1){
                    winnerColorEl.style.background = 'yellow';
                    winnerResultEl.innerHTML = player2.value + ' Won';
                }else{
                    winnerColorEl.style.background = 'red';
                    winnerResultEl.innerHTML = player1.value + ' Won';
                }
            }
            return
        }
    }

}

//Winning/Draw conditions
checkHorizontal = () =>{
    for(let row = 0; row <= 7; row++){
        for(col = 0; col <= 5; col++){
            let cell = $("#"+row +'_'+col)
            if(!cell.hasClass('not-taken')){
                let c0 = cell.attr("class");
                let c1 = $("#"+row +'_'+(col+1)).attr("class");
                let c2 = $("#"+row +'_'+(col+2)).attr("class");
                let c3 = $("#"+row +'_'+(col+3)).attr("class");
                if(c0 && c0 == c1 && c0 == c2 && c0 == c3){
                    winner = c0.split(' ')[1].split('-')[0];
                    return
                }
            }
        }
    
    }
}

checkVertical = () =>{
    for(let col = 0; col <= 5; col++){
        for(row = 0; row <= 7; row++){
            let cell = $("#"+row +'_'+col)
            if(!cell.hasClass('not-taken')){
                let r0 = cell.attr("class");
                let r1 = $("#"+(row + 1) +'_'+col).attr("class");
                let r2 = $("#"+(row + 2) +'_'+col).attr("class");
                let r3 = $("#"+(row + 3) +'_'+col).attr("class");
                if(r0 && r0 == r1 && r0 == r2 && r0 == r3){
                    winner = r0.split(' ')[1].split('-')[0];
                    return 
                }
            }
        }
    
    }
}

checkDiagonalLeftToRigth = () =>{
    for(let col = 0; col <= 5; col++){
        for(row = 0; row <= 7; row++){
            let cell = $("#"+row +'_'+col)
            if(!cell.hasClass('not-taken')){
                let d0 = cell.attr("class");
                let d1 = $("#"+(row - 1) +'_'+(col + 1)).attr("class");
                let d2 = $("#"+(row - 2) +'_'+(col + 2)).attr("class");
                let d3 = $("#"+(row - 3) +'_'+(col + 3)).attr("class");
                if(d0 && d0 == d1 && d0 == d2 && d0 == d3){
                    winner = d0.split(' ')[1].split('-')[0];
                    return 
                }
            }
        }
    
    }
}

checkDiagonalRigthToLeft = () =>{
    for(let col = 0; col <= 5; col++){
        for(row = 0; row <= 7; row++){
            let cell = $("#"+row +'_'+col)
            if(!cell.hasClass('not-taken')){
                let d0 = cell.attr("class");
                let d1 = $("#"+(row - 1) +'_'+(col - 1)).attr("class");
                let d2 = $("#"+(row - 2) +'_'+(col - 2)).attr("class");
                let d3 = $("#"+(row - 3) +'_'+(col - 3)).attr("class");
                if(d0 && d0 == d1 && d0 == d2 && d0 == d3){
                    winner = d0.split(' ')[1].split('-')[0];
                    return
                }
            }
        }
    
    }
}

checkDraw = () =>{
    contador --;
    if(contador == 0){
        winner = 'Empate'
    }
    return
}

checkWinConditions = () =>{
    checkVertical();
    checkHorizontal();
    checkDiagonalLeftToRigth();
    checkDiagonalRigthToLeft();
    checkDraw();
}

//Play the Game
playGame = () => {
    //Board header showing color
    columns.each((idx, column) =>{

        column.addEventListener('mouseenter', ()=>{
            if(currentPLayer == 1){
                headerCells[idx].classList.add('player1-move-color');
                
            } else{
                headerCells[idx].classList.add('player2-move-color');
            }
        })
        //Reset color
        column.addEventListener('mouseleave', ()=>{
            headerCells[idx].classList.remove('player1-move-color');
            headerCells[idx].classList.remove('player2-move-color');
        })
        //Reset color without leave mouse
        column.addEventListener('click', () =>{
            headerCells[idx].classList.remove('player1-move-color');
            headerCells[idx].classList.remove('player2-move-color'); 
        })
    })

    for(let i = 0; i < cells.length; i++){
        cells[i].addEventListener('click', () =>{
            clickCell(cells[i].id)
        });
    }
}

//button functions

startGameBtn.addEventListener('click',() =>{
    countTimer()
    init();
    playGame();
})

//New Game Function
newGameBtn.addEventListener('click', () =>{
    init()
})

gameRules.addEventListener('click', () =>{
    gameRulesDisplay.classList.remove('hidden');
    startingDisplayEl.classList.add('hidden');
})

backBtn.addEventListener('click', () =>{
    startingDisplayEl.classList.remove('hidden');
    gameRulesDisplay.classList.add('hidden');
})