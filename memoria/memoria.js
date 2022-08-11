//window.onload = createGame;
$(document).ready(function(){
  setupGame();


});

var memoriaGame;

function setupGame(){
  // console.log(window.location.host); 
  // cartada - hand
  console.log("=".repeat(80));
  console.log("setupGame()");
  console.log("memoriaGame", memoriaGame);

  if (memoriaGame !== undefined) {
    console.log("memoriaGame.playState()", memoriaGame.playState);
    memoriaGame.stop();
  }

  $('#select-deck input').on('change', function() {
    // alert($('input[name=option-deck]:checked', '#select-deck').val());
  });

  // popular o select com os nomes já existentes
  playerNames()
  .then((playerNames) => {
      // adicionar elementos ao select
      $('#select-player').empty();

      if (!playerNames){
        return
      }

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
    memoriaGame.carddeck = $('input[name=option-deck]:checked', '#select-deck').val();

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

  memoriaGame.turnState = 0;

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
  console.log(memoriaGame.gameState);
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
  return memoriaGame.gameState[key].cardId;
}

function setGameState(){
  memoriaGame.gameState = [];
  for (let i = 0; i < memoriaGame.gameSize; i++){
    memoriaGame.gameState.push({cardId: Math.floor(i / 2), cardState: 'hidden', flipTimes: 0});
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
      switch (memoriaGame.gameState[row * memoriaGame.columns + i].cardState) {
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
  let card = memoriaGame.gameState[cardId];
  if (card.cardState == 'shown' || memoriaGame.turnState == 2){
    // if the user clicked on the card that is already turned we will not do anything
    // also if turnState == 2, means it is validting if there is a match
    return;
  }
  
  card.flipTimes++;
  memoriaGame.turnState++;
  card.cardState = 'shown';
  
  let cardWidth = $(`#cardKey-${cardId}`).width();
  $(`#cardKey-${cardId}`).animate(
    {
      left: '+=' + $(`#cardKey-${cardId}`).width() / 2,
      width: 0,
      height: $(`#cardKey-${cardId}`).height()
    }, 
    300,
    function() {
      $(`#cardKey-${cardId}`).attr('src', `./memoria/carddeck/${memoriaGame.carddeck}/${card.cardId}.png`);
      $(`#cardKey-${cardId}`).animate(
        {
          left: '-=' + cardWidth / 2,
          width: cardWidth,
          height: $(`#cardKey-${cardId}`).height()
        }, 
        300)
    }
    );


//  $(`#cardKey-${cardId}`).attr('src', `./memoria/carddeck/${memoriaGame.carddeck}/${card.cardId}.png`);






  if (memoriaGame.turnState == 2) {
    // let's see if we have a match
    isMatch();
  }
}

function isMatch(){
  let shownCards = memoriaGame.gameState.filter(card => {
    return card.cardState == 'shown'
  })

  if (shownCards[0].cardId === shownCards[1].cardId) {
    // we have a match
    setTimeout(setCardState, memoriaGame.flipTimeout, "match");
    // setCardState("match");
  }
  else
  {
    setTimeout(setCardState, memoriaGame.flipTimeout, "hidden");
    //setCardState("hide");
  }
}

function setCardState(cardState){
  // set cardstate of turned cards (2) to "hidden" or "match" accordingly
//  console.log("=".repeat(80));
//  console.log("hideCards:");
memoriaGame.gameState.forEach(
    function (value, index) {
      if (memoriaGame.gameState[index].cardState === 'shown') {
        memoriaGame.gameState[index].cardState = cardState;
        switch (cardState) {
          case  'hidden':
            $(`#cardKey-${index}`).attr('src', `./memoria/carddeck/${memoriaGame.carddeck}/backcard.png`);
            break;
          case  'match': 
            $(`#cardKey-${index}`).css('z-index', 1).animate(
              {
                top: window.scrollY + window.innerHeight
              }, 
              1000, function() {
                $(`#cardKey-${index}`).attr('style', "visibility: hidden;");
              }
            );
            break;        
          }
        }
      }
  );

  memoriaGame.turnState = 0;
  let hiddenCards = memoriaGame.gameState.filter(card => {
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
// but, as the user didn't memorize its face, it repeated the flip
function getRepeatedFlips() {
  console.log("getRepeatedFlips: " + JSON.stringify(memoriaGame.gameState));
  console.log("getRepeatedFlips: " + memoriaGame.gameState.map(card => card.flipTimes));
  console.log("getRepeatedFlips: " + memoriaGame.gameState.map(card => card.flipTimes).filter(flipTimes => flipTimes > 2));
  console.log("getRepeatedFlips: " + memoriaGame.gameState.map(card => card.flipTimes)
  .filter(flipTimes => flipTimes > 2)
  .map(flipTimes => flipTimes - 2)
  .reduce((partialSum, a) => partialSum + a, 0));

  return memoriaGame.gameState.map(card => card.flipTimes)
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
  let currentIndex = memoriaGame.gameState.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [memoriaGame.gameState[currentIndex].cardId, memoriaGame.gameState[randomIndex].cardId] = [
      memoriaGame.gameState[randomIndex].cardId, memoriaGame.gameState[currentIndex].cardId];
  }
  // return array;
}