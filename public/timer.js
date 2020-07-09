class Timer {
    constructor(durationInput, startButton, pauseButton, repeatButton, pomButton, shortButton, longButton, heading, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        this.repeatButton = repeatButton;

        this.pomButton = pomButton;
        this.shortButton = shortButton;
        this.longButton = longButton;

        this.heading = heading;

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
        this.repeatButton.addEventListener('click', this.repeat);

        this.pomButton.addEventListener('click', this.pomodoro);
        this.shortButton.addEventListener('click', this.short);
        this.longButton.addEventListener('click', this.long);
    }

    pomodoro = () => {
        duration = 1500;
        document.title = this.formatTime(duration);

        this.heading.innerHTML = "✔ Work time";

        this.resetCircle();

        clearInterval(this.interval);
        this.btnSwap(this.pauseButton, this.startButton)

        this.displayTime(duration);
        this.colorSwap("blue", "purple", "green");

        this.activeBtn(this.pomButton, this.shortButton, this.longButton);
    }

    short = () => {
        duration = 300;
        document.title = this.formatTime(duration);

        this.heading.innerHTML = "✔ Break time";

        this.resetCircle();

        clearInterval(this.interval);
        this.btnSwap(this.pauseButton, this.startButton)

        this.displayTime(duration);
        this.colorSwap("green", "blue", "purple");

        this.activeBtn(this.shortButton, this.pomButton, this.longButton);
    }

    long = () => {
        duration = 900;
        document.title = this.formatTime(duration);

        this.heading.innerHTML = "✔ Break time";

        this.resetCircle();

        clearInterval(this.interval);
        this.btnSwap(this.pauseButton, this.startButton)
        
        this.displayTime(duration);
        this.colorSwap("purple", "blue", "green");

        this.activeBtn(this.longButton, this.pomButton, this.shortButton);
    }

    start = () => {
        if (this.onStart) this.onStart(this.timeLeft);

        this.interval = setInterval(this.tick, 1000);
        this.btnSwap(this.startButton, this.pauseButton);
    };

    pause = () => {
        clearInterval(this.interval);
        this.btnSwap(this.pauseButton, this.startButton);
    }

    repeat = () => {
        if (duration > 0){
            document.title = this.formatTime(duration);

            clearInterval(this.interval);
            this.resetCircle();

            this.btnSwap(this.pauseButton, this.startButton)
            
            this.displayTime(duration);
        }
    }

    tick = () => {
        if(this.timeLeft <= 0){
            this.pause();
            if (this.onComplete)  {
                this.startButton.style.display = "none";
                this.onComplete();
            }
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

    colorSwap = (setColor, ...delColor) => {
        const body = document.querySelector('body');
        body.classList.remove(...delColor);
        body.classList.add(setColor); 

        const circle = document.querySelector('.front-c')
        circle.classList.remove(...delColor);
        circle.classList.add(setColor);
    }

    btnSwap = (hide, display) => {
        hide.style.display = "none";
        display.style.display = "";
    }

    activeBtn = (setActive, delActiveA, delActiveB) => {
        delActiveA.classList.remove('active');
        delActiveB.classList.remove('active');

        setActive.classList.add('active');
    }

    resetCircle = () => {
        circle.setAttribute('stroke-dashoffset', '0');
    }
}