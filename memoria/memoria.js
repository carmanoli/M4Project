window.onload = createGame;

let memoriaGame = new MemoriaGame;

function gameStart() {
  if ($('#player').val().trim() === ""){
    alert("Insert a player name, please!");
    return;
  }

  memoriaGame.gameRecord.username = $('#player').val();
  memoriaGame.gameRecord.gameSize = gameSize;

  memoriaGame.start();
  alert(JSON.stringify(memoriaGame.gameRecord));

  $('#buttonPause').on('click', function(event) {
    memoriaGame.pause();

    $('#buttonPause').addClass("blink");
  });
}

// let gameRecord;
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

let flipTimeout = 1000;

function createGame(){
  // cartada - hand
  $('#buttonPlay').on('click', function(event) {
    if (memoriaGame.playState == "paused") {
      memoriaGame.start();
      $('#buttonPause').removeClass("blink");
      return;
    }
    gameStart();
  });





  gameSize = 12;
  columns = 4;
  rows = gameSize / columns;

  setGameState();

 // console.log(gameState);
  
  dealCards();
  showGrid();
  
}

function getCardID(row, column){
  // given a row and a column get the id of the card
  let key = row * columns + column;
  return gameState[key].cardId;
  // return gameState[cardHand[key]].cardId;
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
  // console.log(cardHand);
  // shuffle(cardHand);
  shuffleGameState();
  // console.log(cardHand);
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
        case  'match':
          htmlCard += `<img id='cardKey-${row * columns + i}' class="card" style="visibility: hidden;"  src="./carddeck/poker/backcard.png">`;
          break;
      }
      htmlCard +=  `</div>`;

      gridRow.append(
        htmlCard
      );
      // console.log("row: ", row, " column: ", i, "getCardID: ", getCardID(row, i));
    }
  }  
  setClick();
}


function handleTurnEvent(card){


  if (card.cardState == 'shown' || card.cardState == 2){
    // if the user clicked on the card that is already turned we will not do anything
    // also if cardState == 2, means it is validting if there is a match
    
    return;
  }
  
  turnState++;
  switch (turnState){
    case 1:
      // start of the turn
      card.cardState = 'shown';

      break;
    case 2:
      // second card
      // let's see if we have a match
      card.cardState = 'shown';
      
      isMatch();

      break;
  }
  showGrid();
}

function isMatch(){
  let shownCards = gameState.filter(card => {
    return card.cardState == 'shown'
  })

  if (shownCards[0].cardId === shownCards[1].cardId) {
    // we have a match

    setTimeout(setCardState, flipTimeout, "match");
    // setCardState("match");
  }
  else
  {
    console.log("=".repeat(80));
    console.log("flipTimeout:");
    console.log(flipTimeout);
    
    setTimeout(setCardState, flipTimeout, "hidden");
    //setCardState("hide");
  }
  console.log("=".repeat(80));
  console.log("shownCards:");
  console.log(shownCards);
}

function setCardState(cardState){
  // set cardstate of turned cards (2) to "hidden" or "match" accordingly

  console.log("=".repeat(80));
  console.log("hideCards:");





  gameState.forEach(
    function (value, index) {
      if (gameState[index].cardState === 'shown') {
        gameState[index].cardState = cardState;
        switch (cardState) {
          case  'hidden':
            $(`#cardKey-${index}`).attr('src', "./carddeck/poker/backcard.png");
            break;
          case  'match': 
            $(`#cardKey-${index}`).attr('style', "visibility: hidden;");
            break;        
          }
        }
      }
  );


  switch (cardState) {
    case  'hidden':
  //    $(`#cardKey-${row * columns + i}`).attr('src', "./carddeck/poker/backcard.png");


//      htmlCard += `<img id='cardKey-${row * columns + i}' class="card" src="./carddeck/poker/backcard.png">`;
      break;
    case  'shown':
//      htmlCard += `<img id='cardKey-${row * columns + i}' class="card" src="./carddeck/poker/${getCardID(row, i)}.png">`;
      break;
    case  'match':
//      htmlCard += `<img id='cardKey-${row * columns + i}' class="card" style="visibility: hidden;"  src="./carddeck/poker/backcard.png">`;
      break;
  }



  turnState = 0;
  let hiddenCards = gameState.filter(card => {
    return card.cardState == 'hidden'
  })
  if (hiddenCards.length === 0) {
    // no more cards to play we have a win
    // alert("Parabés ganhou!: " + totalSeconds);
    memoriaGame.stop();
    alert("Parabés ganhou!: " + memoriaGame.timerSeconds);

  }
  
  // showGrid();
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

function shuffleGameState() {
  let currentIndex = gameState.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [gameState[currentIndex].cardId, gameState[randomIndex].cardId] = [
      gameState[randomIndex].cardId, gameState[currentIndex].cardId];
  }
  // return array;
}

/*
function shuffle2(array) {
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
*/


