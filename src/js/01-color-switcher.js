const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let intervalId = null;

stopBtn.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', () => {
    body.style.backgroundColor = getRandomHexColor();
    intervalId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    },1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
});

stopBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    stopBtn.disabled = true;
    startBtn.disabled = false;
});