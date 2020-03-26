class Timer {
    constructor(durationInput, startButton, pauseButton, pomButton, shortButton, longButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;

        this.pomButton = pomButton;
        this.shortButton = shortButton;
        this.longButton = longButton;

        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete
        }

        this.displayTime(1500);
        document.title = "25:00";

        this.pauseButton.style.display = "none";

        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);

        this.pomButton.addEventListener('click', this.pomodoro);
        this.shortButton.addEventListener('click', this.short);
        this.longButton.addEventListener('click', this.long);
    }

    pomodoro = () => {
        document.title = "25:00";
        this.displayTime(1500);
        this.colorSwap("red", "green", "blue");

        this.activeBtn(this.shortButton, this.longButton, this.pomButton);
    }

    short = () => {
        document.title = "5:00";
        this.displayTime(300);
        this.colorSwap("blue", "red", "green");

        this.activeBtn(this.pomButton, this.longButton, this.shortButton);
    }

    long = () => {
        document.title = "15:00";
        this.displayTime(900);
        this.colorSwap("blue", "green", "red");

        this.activeBtn(this.pomButton, this.shortButton, this.longButton);
    }

    start = () => {

        //this.startButton = element.addProperty('display');
        if (this.onStart) this.onStart(this.timeLeft);
        this.interval = setInterval(this.tick, 1000);
        this.startButton.style.display = "none";
        this.pauseButton.style.display = "";
    };

    pause = () => {
        clearInterval(this.interval);
        this.pauseButton.style.display = "none";
        this.startButton.style.display = "";
    }

    tick = () => {
        if(this.timeLeft <= 0){
            this.pause();
            if (this.onComplete) this.onComplete();
        }
        else {
            this.timeLeft = this.timeLeft -1;
            const value = this.formatTime(this.timeLeft)
            this.durationInput.innerHTML = value;
            document.title = value;

            if(this.onTick) this.onTick(this.timeLeft);
        }
    }

    formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        if (seconds < 10 ) {
            seconds = `0${seconds}`;
        }
        return `${minutes}:${seconds}`;
    }

    displayTime = (time) => {
        this.durationInput.innerHTML = time;
        this.timeLeft = durationInput.innerHTML;

        this.durationInput.innerHTML = this.formatTime(this.timeLeft);
    }

    colorSwap = (del1, del2, add) => {
        const body = document.querySelector('body');
        const cls = [del1 , del2];
        body.classList.remove(...cls);
        body.classList.add(add); 

        const circle = document.querySelector('.c')
        circle.classList.remove(...cls);
        circle.classList.add(add);
    }

    activeBtn = (non, non_, active) => {
        non.classList.remove('active');
        non_.classList.remove('active');

        active.classList.add('active');

    }
}