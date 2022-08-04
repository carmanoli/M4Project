//Get DOM elements
const cells = document.querySelectorAll('.cell');

//Players
let currentPLayer = 1;
let winner = null;

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
            //Players playing
            if(currentPLayer == 1){ //Player 1 playing
                cell.classList.add('player1-color');
                cell.classList.remove('not-taken');
                currentPLayer = 2;
            }else{ //Player 2 playing
                cell.classList.add('player2-color');
                cell.classList.remove('not-taken');
                currentPLayer = 1;
            }
            checkHorizontal()
            checkVertical()
            checkDiagonalLeftToRigth()
            checkDiagonalRigthToLeft()
            checkDraw()
            console.log(winner)
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
                    return winner;
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
                    return winner
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
                    return winner
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
                    return winner
                }
            }
        }
    
    }
}

checkDraw = () =>{
    let contador = cells.length;
    contador --;
    console.log(contador)
    if(contador == 0){
        winner = 'Empate'
    }
    return 
}


//Play the Game
playGame = () => {
    for(let i = 0; i < cells.length; i++){
    cells[i].addEventListener('click', () =>{
        clickCell(cells[i].id)
    });
    }
}
playGame();