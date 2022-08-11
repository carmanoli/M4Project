//DOM elements
const startingDisplayEl = document.querySelector('.start-display');
const gameRulesDisplay = document.querySelector('.rules-display')
const overallGameDisplay = document.querySelector('.game-conteiner');
const gameOverDisplayEl = document.querySelector('.winner-display');

//buttons
const startGameBtn = document.querySelector('#start-game-btn');
const newGameBtn = document.querySelector('#new-game-btn');
const gameRules = document.querySelector('#game-rules-btn')
const backBtn = document.querySelector('#back-btn');
const viewBoardBtn = document.querySelector('#last-play-btn')

//Start Game
startGameBtn.addEventListener('click',() =>{
    //Check if inputs have names
    if(player1.value != '' && player2.value != ''){
        countTimer()
        init();
        playGame();
    }else{
        alert('Missing player name!')
    }
})

//New Game Function
newGameBtn.addEventListener('click', () =>{
    init()
})

//Show Game rules
gameRules.addEventListener('click', () =>{
    gameRulesDisplay.classList.remove('hidden');
    startingDisplayEl.classList.add('hidden');
})

//Return to Connect 4 main page
backBtn.addEventListener('click', () =>{
    startingDisplayEl.classList.remove('hidden');
    gameRulesDisplay.classList.add('hidden');
})

//Show Board after the game for 3 seconds (Can press button again)
viewBoardBtn.addEventListener('click', () =>{
    gameOverDisplayEl.classList.add('reduce-opacity')
    setTimeout(()=>{
        gameOverDisplayEl.classList.remove('reduce-opacity')
    },3000)

})