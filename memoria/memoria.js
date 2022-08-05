window.onload = createGame;

function createGame(){
  // cartada - hand

  gameSize = 20;
  columns = 5;
  rows = gameSize / columns;
  setGameState();

  console.log(gameState);
  
  dealCards();
  showGrid();
}

// read files from git
// https://stackoverflow.com/questions/9272535/how-to-get-a-file-via-github-apis

let cardHand; // disposition of the cards in the grid
let columns, rows; // column star with 1, row star with zero
let deckSize; 
let gameSize; // current game number of cards
              // must be an even number
              // will use ((gameSize / 2) * number) of cards
              // from the deckSize
// gameState tem um numero sequencial de cartas
// as posições cardhand correspondem à posição
// do game state 
// cardHand  [Keys]       : 1 2 3 4 5 6 ...
// cardHand  [values]     : x y z ... (intial key shuffled)
//                          | | |
//                          v v v
// gameState [Keys]       : 1 2 3 4 5 6 ... same as cardKey
// gameState [Keys].cardId: 1 1 2 2 4 4 ...
let gameState = [];
// cardId
// cardState: [hidden, shown, match]
// flipTimes // number of times the card has been shown/views

let turnState = 0; // each turn has the following sequential states: 
// 0 - none - no card has been turned
// 1 - one card has been turned
// 2 - two cards had been turned - we have to trigger validations:
// is there a match?
// has the game ended?
// reset the turnState


function getCardID(row, column){
  // given a row and a column get the id of the card
  let key = row * columns + column;
  return gameState[cardHand[key]].cardId;
}

function setGameState(){
  for (let i = 0; i < gameSize; i++){
//    if (i % 2 == 0)
      gameState.push({cardId: Math.floor(i / 2), cardState: 'hidden'});
//    else 
//      gameState.push({cardId: Math.floor(i / 2), cardState: 'shown'});
  }
}

function dealCards(){
  cardHand = [...Array(gameSize).keys()];
  console.log(cardHand);
  shuffle(cardHand);
  console.log(cardHand);
}

function showGrid() {
  $('#game-grid').empty();
  for (let row = 0; row < rows; row++){
    let gridRow = $(
      `<div id="grid-row-1" class="grid-row">
      </div>`
    );
    $('#game-grid').append(
      gridRow
    );
    for (let i = 0 ; i < columns; i++){
      let htmlCard = "";
      htmlCard +=  `<div class="grid-card" >`;
      switch (gameState[row * columns + i].cardState) {
        case  'hidden':
          htmlCard += `<img id='cardKey-${row * columns + i}' class="card" src="./carddeck/poker/backcard.png">`;
          break;
        case  'shown':
          htmlCard += `<img id='cardKey-${row * columns + i}' class="card" src="./carddeck/poker/${getCardID(row, i)}.png">`;
          break;
      }
      htmlCard +=  `</div>`;

      gridRow.append(
        htmlCard
      );
      console.log("row: ", row, " column: ", i, "getCardID: ", getCardID(row, i));
    }
  }  
  setClick();
}


function handleTurnEvent(cardId){
  // if the user clicked on the card that is already turned we will not do anything
  

  turnState++;
  switch (turnState){
    case 1:
      // sart of the turn
  }

  switch (gameState[event.target.id.split("-")[1]].cardState) {
    case  'hidden':
      gameState[event.target.id.split("-")[1]].cardState = 'shown';
      break;
    case  'shown':
      gameState[event.target.id.split("-")[1]].cardState = 'hidden';
      break;
  }

  showGrid();


}


function setClick(){
  $(".card").click((event) => {
    // alert(JSON.stringify(event.target.id));
    // alert(gameState[event.target.id.split("-")[1]].cardState );
    handleTurnEvent(gameState[event.target.id.split("-")[1]]);
  })
}

$(document).ready(function(){
  // setClick();
});

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}