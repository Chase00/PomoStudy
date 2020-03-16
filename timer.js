class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete
        }

        this.timeLeft = durationInput.value;

        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
    }

    start = () => {
        if (this.onStart) this.onStart(this.timeLeft);
        this.interval = setInterval(this.tick, 1000);
    };

    pause = () => {
        clearInterval(this.interval);
    }

    tick = () => {
        if(this.timeLeft <= 0){
            this.pause();
            if (this.onComplete) this.onComplete();
        }
        else {
            this.timeLeft = this.timeLeft -1;
            this.durationInput.value = this.timeLeft;

            if(this.onTick) this.onTick(this.timeLeft);
        }
    }
}