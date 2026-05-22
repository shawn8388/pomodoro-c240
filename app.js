const WORK_DURATION_SECONDS = 25 * 60;
const timerValue = document.getElementById('timerValue');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const sessionCount = document.getElementById('sessionCount');

let timerInterval = null;
let remainingSeconds = WORK_DURATION_SECONDS;

function initApp() {
  updateDisplay(remainingSeconds);
  bindUIEvents();
}

function bindUIEvents() {
  startButton.addEventListener('click', () => {
    startTimer();
  });

  pauseButton.addEventListener('click', () => {
    // placeholder for pause behavior
  });

  resetButton.addEventListener('click', () => {
    // placeholder for reset behavior
  });
}

function startTimer() {
  if (timerInterval !== null) {
    return;
  }

  remainingSeconds = WORK_DURATION_SECONDS;
  updateDisplay(remainingSeconds);

  timerInterval = setInterval(() => {
    remainingSeconds -= 1;
    if (remainingSeconds < 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      console.log('work complete');
      return;
    }

    updateDisplay(remainingSeconds);

    if (remainingSeconds === 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      console.log('work complete');
    }
  }, 1000);
}

function pauseTimer() {
  // placeholder
}

function resumeTimer() {
  // placeholder
}

function resetTimer() {
  // placeholder
}

function switchMode(mode) {
  // placeholder
}

function updateTimer() {
  // placeholder
}

function updateDisplay(seconds) {
  if (!timerValue) {
    return;
  }

  timerValue.textContent = formatTime(seconds);
}

function updateProgressRing(remainingSeconds, totalSeconds) {
  // placeholder
}

function playTransitionSound() {
  // placeholder
}

function loadSessionCount() {
  // placeholder
}

function saveSessionCount(count) {
  // placeholder
}

function incrementSessionCount() {
  // placeholder
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const sec = seconds % 60;
  const minuteString = String(minutes).padStart(2, '0');
  const secondString = String(sec).padStart(2, '0');
  return `${minuteString}:${secondString}`;
}

function setControlStates(isRunning, isPaused) {
  // placeholder
}

function setModeVisuals(mode) {
  // placeholder
}

window.addEventListener('DOMContentLoaded', initApp);
