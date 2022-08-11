
$(function(){

    const player1Name = document.querySelector('#player1-name');
    const player2Name = document.querySelector('#player2-name');
    const player1El = document.querySelector('#player-one');
    const player2El = document.querySelector('#player-two');
    const startBtn = document.querySelector('#start-btn');
    const roundsEl = $('#rounds')
    const beforeGame = document.querySelector(".before-game");
    const gamecontent = document.querySelector(".game-content");
    const timerEl = document.querySelector('.timer');

    let isPlaying = false;
    let seconds = 0;
    let minutes = 0;
    let rondas= 0;

    let round1Winner = null;
    let round2Winner = null;
    let round3Winner = null;
    let round4Winner = null;
    let round5Winner = null;

    let player1Points = null;
    let player2Points = null;


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
            isPlaying = true;
            player1El.innerHTML = player1Name.value;
            player2El.innerHTML = player2Name.value;

            //oculta box com de inicio com nomes players
            beforeGame.classList.add ("hidden");
            gamecontent.classList.remove ("hidden");
            //////////
            //resetBtn.classList.remove ("reset");
           ///////////
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
            if (!isPlaying) {
                return
            }
            if (bg === "none" || bg === "") {
                var fig = "url(" + turn.toString() + ".png)";
                $(this).css("background-image", fig);
                turn = (turn === 1 ? 2 : 1);
                setTimeout(winningCondition, 10);
                counter --
            }
        });


        //variáveis de quem é a vez e o vencedor
        var turn = 1;
        var winner = "";

        // funcao q limpa as celulas apos alguem ganhar a jogada
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

    // Função determina se ha 3 celulas com mesma imagem e aponta quem ganhou
        function whoWon(a, b, c) {

            var checkA = $("#cell" + a).css("background-image");
            var checkB = $("#cell" + b).css("background-image");
            var checkC = $("#cell" + c).css("background-image");
            if ((checkA == checkB) && (checkB == checkC) && (checkA != "none" && checkA != "")) {
                rondas = rondas + 1;

                if (checkA.indexOf("1.png") >= 0) {
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
                //////////
                // $(".cell").off("click");
                //////////
                clearTable ();
                alert("Parabens o jogador " + winner + " venceu a jogada !");
                //////////
                // resetBtn.classList.remove ("reset");
                //////////
                counter = 9;
            } else if (counter <= 0){
                clearTable()
                alert('empate')
                counter = 9
                rondas = rondas + 1;
                roundsEl.text (rondas);
            }

        }

        // funcao do ganhador da ronda (menlhor de 5 jogadas)
        function roundWinner () {
            if (rondas === 5) {
                if (player1Points > player2Points) {
                    alert ("X venceu a ronda!");

                } else { alert ("O venceu a ronda!");

                    }
                // reset do timer
                rondas = 0;
                seconds = 0
                minutes = 0;
                //impede jogar mais após a ronda (5 jogadas)
                $(".cell").off("click");

            }
        }

})