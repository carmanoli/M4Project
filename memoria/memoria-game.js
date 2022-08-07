class MemoriaGame  {

  constructor () {
    this._playState = "stopped";
    // stopped
    // started
    // paused
    this.timerSeconds = 0;

    const date = new Date();
    let dateJSON = date.toJSON();
  
    this.gameRecord = {
      username: "",
      game: "memoria",
      playSate: this.playState, 
      repeatedFlips: 0,
      time: 0,
      date: dateJSON,
      gameSize: 0
    }
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