//Get DOM elements
const cells = document.querySelectorAll('.cell');
const headerCells = document.querySelectorAll('.view-play')
const player1El = document.querySelector('#player-one');
const player2El = document.querySelector('#player-two');

//Players
const player1 = 'Jimmy'
const player2 = 'Boris'
let currentPLayer = 1;
let winner = null;

//Playing Conditions
let isPLaying = false;
let contador = cells.length;
let firstMove = Math.floor(Math.random() * 2 + 1);

//Inicialize Game
const init = () =>{
    //Clean all cells from last game
    for(i = 0; i < cells.length; i++){
        cells[i].classList.remove('player1-color', 'player2-color');
        cells[i].classList.add('not-taken');
    }
    
    //Remove the last player active (In case of new game)
    player1El.classList.remove('player-active');
    player2El.classList.remove('player-active');
    //Sort the first player to play
    currentPLayer = firstMove;
    //Add first player active
    if(currentPLayer == 1){
        player1El.classList.add('player-active');
    }else{
        player2El.classList.add('player-active');
    }

    //Show player names
    player1El.innerHTML = player1;
    player2El.innerHTML = player2;

    //Start Game
    isPLaying = true;
}
init()

//Game Logic
const clickCell = (idValue) =>{
    let column = idValue.split('_')[1];
    for(i = 5; i >= 0; i--){
        let idElement = i + '_' + column
        let cell = document.getElementById(idElement)
        if(cell.classList.contains('not-taken')){
            //Players playing
            if(currentPLayer == 1){ //Player 1 playing
                cell.classList.add('player1-color');
                cell.classList.remove('not-taken');

                player1El.classList.remove('player-active');
                player2El.classList.add('player-active');

                currentPLayer = 2;
            }else{ //Player 2 playing
                cell.classList.add('player2-color');
                cell.classList.remove('not-taken');

                player2El.classList.remove('player-active');
                player1El.classList.add('player-active');

                currentPLayer = 1;
            }
            checkWinConditions()
            if(winner != null){
                console.log(winner)
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
    if(isPLaying === true){
        for(let i = 0; i < cells.length; i++){
        cells[i].addEventListener('click', () =>{
            clickCell(cells[i].id)
        });
        }
    }
}
playGame();