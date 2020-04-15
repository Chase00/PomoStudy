const durationInput = document.querySelector('.duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const repeatButton = document.querySelector('#repeat');
const pomButton = document.querySelector('#pomodoro');
const shortButton = document.querySelector('#short');
const longButton = document.querySelector('#long');

const heading = document.querySelector('.heading');

const circle = document.querySelector('.front-c');

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);

let duration;

const timer = new Timer(durationInput, startButton, pauseButton, repeatButton, pomButton, shortButton, longButton, heading, {
    onStart(totalDuration) {
        duration = totalDuration;
    },
    onTick(timeRemaining) {
        circle.setAttribute('stroke-dashoffset',
        perimeter * timeRemaining / duration - perimeter
        );
    },
    onComplete() {
        const sound = new Audio('/assets/sounds/completed.mp3');
        sound.volume = 0.5;
        sound.addEventListener("canplaythrough", function() {
            setTimeout(function(){
                sound.play();
            }, 200);
        });
    }
});