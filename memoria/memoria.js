window.onload = createGame;

// read files from git
// https://stackoverflow.com/questions/9272535/how-to-get-a-file-via-github-apis

let cardHand;
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
// cardHand  [values]     : x y z ...
//                          | | |
//                          v v v
// gameState [Keys]       : 1 2 3 4 5 6 ...
// gameState [Keys].cardId: 1 1 2 2 4 4 ...
let gameState = [];

// cardId
// cardState: [hidden, shown, match]
// flipTimes // number of times the card has been shown/views

function getCardID(row, column){
  // given a row and a column get the id of the card
  let key = row * columns + column;
  gameState[cardHand[key]].cardId;
}

function setGameState(){
  for (let i = 0; i <= gameSize; i++){
    gameState.push({cardId: Math.floor(i / 2), cardState: 'hidden'});
  }
}

function dealCards(){
  cardHand = [...Array(10).keys()];
  console.log(cardHand);
  shuffle(cardHand);
  console.log(cardHand);
}

function createGame(){
  gameSize = 12;
  columns = 4;
  rows = gameSize / columns;
  setGameState();

  console.log(gameState);
  
  dealCards();
  createGrid();
}

function createGrid() {
  for (let row = 0; row < rows; row++){
    let gridRow = $(
      `<div id="grid-row-1" class="grid-row">
      </div>`
    );
  
    $('#game-grid').append(
      gridRow
    );

    for (let i = 0 ; i < 4; i++){
      gridRow.append(
        `
          <div class="grid-separator">
          </div>    
          <div class="grid-card mt-5">
            <img src="./carddeck/poker/${row * columns + i}.png">
          </div>
        `
      );
    }
  
    gridRow.append(
      `
        <div class="grid-separator">
        </div> 
      `
    );
  }
}

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