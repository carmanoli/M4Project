//Get DOM elements
const cells = $('.cell');
const columns = $('.column');
const headerCells = $('.view-play');

const winnerResultEl = document.querySelector('#winner-result');
const winnerColorEl = document.querySelector('#winner-color');
let winner = null;


let contador = cells.length;
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
                    player2El.classList.add('player-active')
                    winnerColorEl.style.background = 'yellow';
                    winnerResultEl.innerHTML = player2.value + ' Won';
                }else if(currentPLayer === 2){
                    player1El.classList.add('player-active')
                    winnerColorEl.style.background = 'red';
                    winnerResultEl.innerHTML = player1.value + ' Won';
                }else{
                    winnerColorEl.style.background = 'orange';
                    winnerResultEl.innerHTML = "It's a Draw";
                }
            }
            return
        }
    }

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