if (typeof window.MemoriaGame === 'undefined') {
  // as this page may be loaded again from index
  console.log("window.MemoriaGame:", window.MemoriaGame);
  window.MemoriaGame = class   {

    gameSize = 0;
    player = "";

    get gameRecord() {
      console.log("this.#gameRecord: ", this.#gameRecord);
      console.log("this.player: ", this.player);
      
      this.#gameRecord.player = this.player;
      this.#gameRecord.gameSize = this.gameSize;
      this.#gameRecord.playSate = this._playState;
      
      this.#gameRecord.changed = new Date().toJSON(),
      console.log("this.#gameRecord: ", this.#gameRecord);
      return this.#gameRecord;
    }

    #gameRecord = {
      uuid: "",
      player: "",
      game: "memoria",
      playSate: this._playState, 
      repeatedFlips: 0,
      time: 0,
      created: new Date().toJSON(),
      changed: new Date().toJSON(),
      gameSize: 0
    }

    constructor () {
      this._playState = "stopped";
      // stopped
      // started
      // paused
      this.timerSeconds = 0;

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
      let minutes = Math.floor(this.timerSeconds / 60);
      let seconds = this.timerSeconds - minutes * 60;
      let timerString = 
        (new Array(2).join('0') + minutes).slice(-2) +
        ':' +
        (new Array(2).join('0') + seconds).slice(-2)
        ;
      document.getElementById("timer").value = timerString;
    }
  }
}