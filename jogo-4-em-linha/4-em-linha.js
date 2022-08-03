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
