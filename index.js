const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');

let duration;

const timer = new Timer(durationInput, startButton, pauseButton, {
    onStart() {

    },
    onTick() {

    },
    onComplete() {
        
    }
});