const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');

let duration;

const timer = new Timer(durationInput, startButton, pauseButton, {
    onStart() {
        console.log("Start")
    },
    onTick() {
        console.log("Tick...")
    },
    onComplete() {
        console.log("Completed!")
    }
});