//Get DOM elements
const columns = document.querySelectorAll('.column')
const cells = document.querySelectorAll('.cell');

//Players
const player1 = 'red';
const player2 = 'yellow';
let currentPLayer = 1;

//Playing Conditions
let isPLaying = true;
let firstMove = Math.floor(Math.random() * 2 + 1);

//Inicialize Game
const init = () =>{
    for(i = 0; i < cells.length; i++){
        cells[i].classList.remove('player1-color', 'player2-color');
        cells[i].classList.add('not-taken');
    }
}
init();

const playGame = () => {
    currentPLayer = firstMove;
    
    for(i = 0; i < cells.length; i++){
        cells[i].addEventListener('click',(e) =>{
            //Get selected Cell and Column
            const selectedCell = e.target.id.split("_")[0];
            const selectedColumn = e.target.id.split("_")[1] 
            console.log(selectedCell, selectedColumn)
            const square = selectedCell + selectedColumn

            console.log(square)
            
        })
    }

}
playGame()