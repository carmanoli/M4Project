
// Estrutura geral do arquivo jQuery functions.js

$(function(){

    const player1Name = document.querySelector('#player1-name');
    const player2Name = document.querySelector('#player2-name');
    const player1El = document.querySelector('#player-one');
    const player2El = document.querySelector('#player-two');
    const startBtn = document.querySelector('#start-btn');
    const roundsEl = $('#rounds')

    let isPlaying = false;
    let seconds = 0;
    let minutes = 0;
    const beforeGame = document.querySelector(".before-game");
    const gamecontent = document.querySelector(".game-content");

    let rondas= 0;
    let round1Winner = null;
    let round2Winner = null;
    let round3Winner = null;
    let round4Winner = null;
    let round5Winner = null;

    let player1Points = null;
    let player2Points = null;

    // ///////////////////////////////// JIMMY
    // const viewBoardBtn = document.querySelector('#last-play-btn')
    // const gameOverDisplayEl = document.querySelector('.winner-display');

// funcao salvar nome jogadores no local storage
    function saveGameRecord(gameRecord){
        let M4G_string = localStorage.getItem("M4G");
        let M4G = [];
        if (M4G_string) {
            M4G = JSON.parse(M4G_string);
        }
        M4G.push(gameRecord)
        localStorage.setItem("M4G", JSON.stringify(M4G));
    }





// timer

    const timerEl = document.querySelector('.timer');

//Timmer
    countTimer = () => {
        setInterval(() => {
            seconds++;
            if (seconds >= 60) {
                seconds = 0
                minutes++
            }

            let s = seconds < 10 ? '0' + seconds : seconds;
            let m = minutes < 10 ? '0' + minutes : minutes;


            timerEl.innerHTML = m + ':' + s;

        }, 1000)}


    // Start button
    let showTable = document.getElementById("table");
    let resetBtn = document.getElementsByClassName("reset")

    startBtn.addEventListener('click', () =>{

        //Check if inputs have names
        if(player1Name.value != '' && player2Name.value != ''){

            player1El.innerHTML = player1Name.value
            player2El.innerHTML = player2Name.value

            //oculta box com de inicio com nomes players
            beforeGame.classList.add ("hidden");
            gamecontent.classList.remove ("hidden");
           //resetBtn.classList.remove ("reset");
            countTimer();


            // pop up faltam nomes players
        }else{
            alert('Missing player name!')

       }

    })


// Click nas celulas
let counter = 9
        $(".cell").click(function () {
            var bg = $(this).css("background-image");
            if (bg === "none" || bg === "") {
                var fig = "url(" + "./galo/" + turn.toString() + ".png)";
                $(this).css("background-image", fig);
                turn = (turn === 1 ? 2 : 1);
                setTimeout(winningCondition, 10);
                counter --
            }
        });


        //variáveis de quem é a vez e o vencedor
        var turn = 1;
        var winner = "";


        // Função determina se ha 3 celulas com mesma imagem e aponta quem ganhou


    function clearTable () {
        $("#cell1").css("background-image", "");
        $("#cell2").css("background-image", "");
        $("#cell3").css("background-image", "");
        $("#cell4").css("background-image", "");
        $("#cell5").css("background-image", "");
        $("#cell6").css("background-image", "");
        $("#cell7").css("background-image", "");
        $("#cell8").css("background-image", "");
        $("#cell9").css("background-image", "");
    }

        function whoWon(a, b, c) {

            var checkA = $("#cell" + a).css("background-image");
            var checkB = $("#cell" + b).css("background-image");
            var checkC = $("#cell" + c).css("background-image");
            if ((checkA == checkB) && (checkB == checkC) && (checkA != "none" && checkA != "")) {
                rondas = rondas + 1;

                if (checkA.indexOf("./galo/1.png") >= 0) {
                    winner = "X";
                    player1Points = player1Points + 1;
                } else {
                    winner = "O";
                    player2Points = player2Points + 1;
                }
                roundWinner();
                roundsEl.text (rondas);
                return true;
            } else {
                return false;
            }
        }

        // Função verifica se atingiu algumas das 8 condiçoes pra ganhar o jogo
        function winningCondition() {

            if (whoWon(1, 2, 3) || whoWon(4, 5, 6) || whoWon(7, 8, 9) ||
                whoWon(1, 4, 7) || whoWon(2, 5, 8) || whoWon(3, 6, 9) ||
                whoWon(1, 5, 9) || whoWon(3, 5, 7)
            ) {
                //$("#result").html("<h1>O jogador " + winner + "venceu! </h1>");
               // $(".cell").off("click");
                clearTable ();
                alert("Parabens o jogador " + winner + " venceu a jogada !");
                // resetBtn.classList.remove ("reset");
                counter = 9;
            } else if (counter <= 0){
                clearTable()
                alert('empate')
                counter = 9
                rondas = rondas + 1;
                roundsEl.text (rondas);
            }

        }

        function roundWinner () {
            if (rondas === 5) {
                if (player1Points > player2Points) {
                    alert ("<h1>X venceu a ronda!</h1>");
                    $(".cell").off("click");
                } else { alert ("<h1>O venceu a ronda!</h1>");
                        $(".cell").off("click");
                    }
                rondas = 0;
            }
        }

    // ///////////////////////////////// JIMMY
   /* viewBoardBtn.addEventListener('click', () =>{
        gameOverDisplayEl.classList.add('reduce-opacity')
        setTimeout(()=>{
            gameOverDisplayEl.classList.remove('reduce-opacity')
        },3000)

    })
    */
})