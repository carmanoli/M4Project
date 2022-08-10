if (typeof window.MemoriaGame === 'undefined') {
  // as this page may be loaded again from index

  // This class assumes the following:
  // - there is an elemeent with id timer, to display the timer

  console.log("window.MemoriaGame:");
  window.MemoriaGame = class   {

    gameSize = 0;
    player = "";
    columns = 0;
    rows = 0;
    carddeck = "ldr";

    get gameRecord() {
      console.log("this.#gameRecord: ", this.#gameRecord);
      console.log("this.player: ", this.player);
     
      this.#gameRecord.gameSize = this.gameSize;
      this.#gameRecord.playSate = this._playState;
      this.#gameRecord.time = this.timerSeconds;
      this.#gameRecord.changed = new Date().toJSON();
      this.#gameRecord.carddeck = this.carddeck;
      console.log("this.#gameRecord: ", this.#gameRecord);
      return this.#gameRecord;
    }

    #gameRecord = {
      uuid: "",
      player: [],
      game: "memoria",
      playSate: this._playState, 
      repeatedFlips: 0,
      time: 0,
      created: new Date().toJSON(),
      changed: new Date().toJSON(),
      winner: "",
      gameSize: 0,
      carddeck: this.carddeck
    }

    constructor (players) {
      this.#gameRecord.player.push (...players);
      this._playState = "stopped";
      // stopped
      // started
      // paused
      this.timerSeconds = 0;
      this.#displayTimer()
      // const date = new Date();
      // let dateJSON = date.toJSON();
    }

    // ================================================================================
    // playSate
    get playSate() {
      return this._playSate;
    }

    set playSate(playState) {
      this._playSate = playState;
    }

    stop(){
      this.playState = "stopped";
      this.#timerStop()
    }

    start(){
      if (this.playState == "paused") {
        this.playState = "started";
        return;
      }
      this.playState = "started";
      this.#timerStart();
    }

    pause(){
      this.playState = "paused";
    }

    // ================================================================================
    // timer
    // https://stackoverflow.com/questions/62378276/timer-code-with-the-javascript-class-and-constructor
    #timerStart(){
      if (this.playState != "started") {
        this.playState = "started";
      }
      this.timerSeconds = 0;
      this.timerInterval = window.setInterval(() => this.#timerTick(),1000);
    }

    #timerStop(){
      if (this.playState != "stopped") {
        this.playState = "stopped";
      }
      window.clearInterval(this.timerInterval);
    }

    #timerTick(){
      if (this.playState == "paused") {
        return;
      }
      this.timerSeconds++;
      this.#displayTimer()
    }

    #displayTimer(){
      let minutes = Math.floor(this.timerSeconds / 60);
      let seconds = this.timerSeconds - minutes * 60;
      let timerString = 
        (new Array(2).join('0') + minutes).slice(-2) +
        ':' +
        (new Array(2).join('0') + seconds).slice(-2)
        ;

      if($("#timer").length !== 0) {
        $("#timer").val(timerString);
      }
      //else
      // alert("Timer not defined!");
    }
  }
}