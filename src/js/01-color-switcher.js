const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', handleStart);
stopBtn.addEventListener('click', handleStop);
let intervalId = null;

function handleStart(event) {
  document.body.style.backgroundColor = getRandomHexColor();
  intervalId = setInterval(() => {
    const randomClr = getRandomHexColor();
    document.body.style.backgroundColor = randomClr;
  }, 1000);
  event.currentTarget.disabled = true;
}

function handleStop() {
  clearInterval(intervalId);
  startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
