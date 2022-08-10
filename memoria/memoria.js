//window.onload = createGame;
$(document).ready(function(){
  setupGame();
});

var memoriaGame;

// let gameRecord;
// read files from git
// https://stackoverflow.com/questions/9272535/how-to-get-a-file-via-github-apis

// let cardHand; // disposition of the cards in the grid

// var columns, rows; // column star with 1, row star with zero

var deckSize; 
// var gameSize; // current game number of cards
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
var gameState = [];
// cardId
// cardState: [hidden, shown, match]
// flipTimes // number of times the card has been shown/views

var turnState = 0; // each turn has the following sequential states: 
// 0 - none - no card has been turned
// 1 - one card has been flipped
// 2 - two cards had been flipped - we have to trigger validations:
// is there a match?
// has the game ended?
// reset the turnState

var flipTimeout = 1000;



function setupGame(){
  // console.log(window.location.host); 
  // cartada - hand
  console.log("setupGame()");

  // popular o select com os nomes já existentes
  playerNames()
  .then((playerNames) => {
      // adicionar elementos ao select
      $('#select-player').empty();

      $('#select-player').append($('<option>', {
        value: 0,
        text: 'Select an existing user'
      }));
      console.log("setupGame");
      console.log( $("#select-player option[value=0]").text());
      $("#select-player option[value=0]").attr('disabled', true)
      $("#select-player option[value=0]").attr('selected', true)

      // <option value="0" disabled selected>Select an existing user</option>

      for (var i = 0; i < playerNames.length; i++) {
        var option = document.createElement("option");
        option.value = i + 1;
        option.text = playerNames[i];
        $('#select-player').append(option);
      }
  })
  


  $('#buttonPlay').on('click', function(event) {
    //alert($("#gameSize").val());



    // verificar se já não esamos a meio do jogo
    if (memoriaGame !== undefined && memoriaGame.playState == "started") {
      return;
    }

    // verificar se não estamos pausados
    if (memoriaGame !== undefined && memoriaGame.playState == "paused") {
      console.log("memoriaGame.playState: ", "paused");
      memoriaGame.start();
      $('#buttonPause').removeClass("blink");
      return;
    }
    
    console.log("Selected user");
    console.log($('#select-player').find(":selected").val());
    console.log($('#select-player').find(":selected").text());

    if ($('#new-player').val().trim() != ""){
      // verificar se temos um novo user
      $('#player').val($('#new-player').val().trim());
    }
    else 
    if(Number($('#select-player').find(":selected").val() > 0)){
      // senão temos um novo user, verificar se foi selecionado um jogador existente
      $('#player').val($('#select-player').find(":selected").text());

      // lets reset selection
      $('#select-player')[0].selected = true;
    }

    if ($('#player').val().trim() === ""){
      alert("Insert a player name, please!");
      return;
    }

    memoriaGame = new MemoriaGame([$('#player').val()]);
    gameStart();
  });


  $('#buttonStop').on('click', function(event) {
 
    if (memoriaGame !== undefined && 
      (memoriaGame.playState == "started" ||
      memoriaGame.playState == "paused"
      )
      ) {
      if (confirm('You will loose current game status! Are you sure?')) {
        
        console.log('Game stopped by user.');
      } else {
        // Do nothing!
        return;
      }
    }

    memoriaGame.stop();
    resetGame();
  });

}

function resetGame(){
  // this function is usual call when we already played one time
  // and the player is defined 
  //if (memoriaGame !== undefined ) {
  //  console.log("memoriaGame.playState: ", memoriaGame.playState);
  //}

  turnState = 0;

  // para o caso de o jogo ser parado estando paused
  $('#buttonPause').removeClass("blink");

  $("#memoria-setup").css("display", "");
  $("#game-grid").css("display","none");

  memoriaGame = new MemoriaGame([$('#player').val()]);

}

function gameStart() {

  console.log("memoriaGame: ", memoriaGame);
  memoriaGame.gameSize = Number($('#gameSize').val());
  // memoriaGame.player = $('#player').val();

  // memoriaGame.gameSize = 12;
  switch (memoriaGame.gameSize) {
    case 12:
    case 16:
      memoriaGame.columns = 4;
      break;
    case 20:
      memoriaGame.columns = 5;
      break;
    default:
      columns = 5;
    }
    memoriaGame.rows = memoriaGame.gameSize / memoriaGame.columns;

  setGameState();
  console.log(gameState);
  // dealCards();
  shuffleGameState();
  showGrid();

  $("#memoria-setup").css("display", "none");
  $("#game-grid").css("display","");

  console.log("memoriaGame.payer", memoriaGame.payer);
  memoriaGame.start();
//  alert(JSON.stringify(memoriaGame.gameRecord));

  $('#buttonPause').on('click', function(event) {
    memoriaGame.pause();
    $('#buttonPause').addClass("blink");
  });
}

function getCardID(row, column){
  // given a row and a column get the id of the card
  let key = row * memoriaGame.columns + column;
  return gameState[key].cardId;
}

function setGameState(){
  gameState = [];
  for (let i = 0; i < memoriaGame.gameSize; i++){
      gameState.push({cardId: Math.floor(i / 2), cardState: 'hidden', flipTimes: 0});
  }
}

function showGrid() {
  $('#game-grid').empty();
  for (let row = 0; row < memoriaGame.rows; row++){
    let gridRow = $(
      `<div id="grid-row-1" class="grid-row">
      </div>`
    );
    $('#game-grid').append(
      gridRow
    );
    for (let i = 0 ; i < memoriaGame.columns; i++){
      let htmlCard = "";
      htmlCard +=  `<div class="grid-card" >`;
      switch (gameState[row * memoriaGame.columns + i].cardState) {
        case  'hidden':
          htmlCard += `<img id='cardKey-${row * memoriaGame.columns + i}' class="card" src="./memoria/carddeck/${memoriaGame.carddeck}/backcard.png">`;
          break;
        case  'shown':
          htmlCard += `<img id='cardKey-${row * memoriaGame.columns + i}' class="card" src="./memoria/carddeck/${memoriaGame.carddeck}/${getCardID(row, i)}.png">`;
          break;
        case  'match':
          htmlCard += `<img id='cardKey-${row * memoriaGame.columns + i}' class="card" style="visibility: hidden;"  src="./memoria/carddeck/${memoriaGame.carddeck}/backcard.png">`;
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

function handleTurnEvent(cardId){
  let card = gameState[cardId];
  if (card.cardState == 'shown' || turnState == 2){
    // if the user clicked on the card that is already turned we will not do anything
    // also if turnState == 2, means it is validting if there is a match
    return;
  }
  
  card.flipTimes++;
  turnState++;
  card.cardState = 'shown';
  $(`#cardKey-${cardId}`).attr('src', `./memoria/carddeck/${memoriaGame.carddeck}/${card.cardId}.png`);

  if (turnState == 2) {
    // let's see if we have a match
    isMatch();
  }
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
    setTimeout(setCardState, flipTimeout, "hidden");
    //setCardState("hide");
  }
}

function setCardState(cardState){
  // set cardstate of turned cards (2) to "hidden" or "match" accordingly
//  console.log("=".repeat(80));
//  console.log("hideCards:");
  gameState.forEach(
    function (value, index) {
      if (gameState[index].cardState === 'shown') {
        gameState[index].cardState = cardState;
        switch (cardState) {
          case  'hidden':
            $(`#cardKey-${index}`).attr('src', `./memoria/carddeck/${memoriaGame.carddeck}/backcard.png`);
            break;
          case  'match': 
            $(`#cardKey-${index}`).attr('style', "visibility: hidden;");
            break;        
          }
        }
      }
  );

  turnState = 0;
  let hiddenCards = gameState.filter(card => {
    return card.cardState == 'hidden'
  })
  console.log("if (hiddenCards.length === 0):");
  if (hiddenCards.length === 0) {
    // no more cards to play we have a win
    // alert("Parabés ganhou!: " + totalSeconds);
    memoriaGame.stop();
    console.log("memoriaGame.stop();:");
    // ===================================================================
    // Save game results
    memoriaGame.gameRecord.repeatedFlips = getRepeatedFlips();

    // memoriaGame.gameSize = memoriaGame.gameSize;
    memoriaGame.playSate = memoriaGame.playSate;
    memoriaGame.gameRecord.uuid = uuidv4();
    alert(`Parabéns terminou em ${memoriaGame.timerSeconds} segundos!`);
    console.log("memoriaGame.gameRecord: " + JSON.stringify(memoriaGame.gameRecord));
    saveGameRecord(memoriaGame.gameRecord);

    // Preparar para novo jogo
    resetGame();
  }
}

// Repeated times is when the card was flipped more than 2 times, ie,
// when it was not only to view its face and to make a match, 
// but as the user didn't memorize its face it repeated the flip
function getRepeatedFlips() {
  console.log("getRepeatedFlips: " + JSON.stringify(gameState));
  console.log("getRepeatedFlips: " + gameState.map(card => card.flipTimes));
  console.log("getRepeatedFlips: " + gameState.map(card => card.flipTimes).filter(flipTimes => flipTimes > 2));
  console.log("getRepeatedFlips: " + gameState.map(card => card.flipTimes)
  .filter(flipTimes => flipTimes > 2)
  .map(flipTimes => flipTimes - 2)
  .reduce((partialSum, a) => partialSum + a, 0));

  return gameState.map(card => card.flipTimes)
    .filter(flipTimes => flipTimes > 2)
    .map(flipTimes => flipTimes - 2)
    .reduce((partialSum, a) => partialSum + a, 0);
}

function setClick(){
  $(".card").click((event) => {
    if (memoriaGame.playState !== "started") {
      alert("Game is not started!");
      return;
    }
    handleTurnEvent(event.target.id.split("-")[1]);
    //handleTurnEvent(gameState[event.target.id.split("-")[1]]);
  })
}

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