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
        currentPLayer = 0
        winner = 0
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