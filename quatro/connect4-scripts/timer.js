const timerEl = document.querySelector('.timer');
const finalTimerEl = document.querySelector('#game-time');
//Timmer
countTimer = () =>{
    setInterval(() =>{ 
        if(!isPLaying) return
        seconds++;
        if(seconds >= 60){
            seconds = 0
            minutes++
        }

        let s = seconds < 10 ? '0' + seconds: seconds;
        let m = minutes < 10 ? '0' + minutes: minutes;

       
        timerEl.innerHTML = m + ':' + s;

    }, 1000)
}