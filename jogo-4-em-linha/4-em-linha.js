//Get DOM elements
const cells = document.querySelectorAll('.cell');

//Players
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
init()

const clickCell = (idValue) =>{
    let column = idValue.split('_')[1];
    for(i = 5; i >= 0; i--){
        let idElement = i + '_' + column
        let cell = document.getElementById(idElement)
        if(cell.classList.contains('not-taken')){
            if(currentPLayer == 1){
                cell.classList.remove('not-taken');
                cell.classList.add('player1-color');
                currentPLayer = 2;
            }else{
                cell.classList.remove('not-taken');
                cell.classList.add('player2-color');
                currentPLayer = 1;
            }
            return
        }
    }

}


playGame = () => {
    for(let i = 0; i < cells.length; i++){
    cells[i].addEventListener('click', () =>{
        clickCell(cells[i].id)
    });
    }
}
playGame();