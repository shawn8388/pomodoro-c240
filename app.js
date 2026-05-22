const WORK_DURATION_SECONDS = 25 * 60;
const BREAK_DURATION_SECONDS = 5 * 60;
const timerValue = document.getElementById('timerValue');
const phaseLabel = document.getElementById('phaseLabel');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resumeButton = document.getElementById('resumeButton');
const resetButton = document.getElementById('resetButton');
const sessionCount = document.getElementById('sessionCount');

let timerInterval = null;
let remainingSeconds = WORK_DURATION_SECONDS;
const state = {
  phase: 'work',
  isRunning: false,
  isPaused: false,
};

function initApp() {
  updateDisplay(remainingSeconds);
  updatePhaseLabel();
  bindUIEvents();
}

function bindUIEvents() {
  startButton.addEventListener('click', () => {
    startTimer();
  });

  pauseButton.addEventListener('click', () => {
    pauseTimer();
  });

  resumeButton.addEventListener('click', () => {
    resumeTimer();
  });

  resetButton.addEventListener('click', () => {
    resetTimer();
  });
}

function startTimer() {
  if (timerInterval !== null) {
    return;
  }

  if (!state.isPaused) {
    remainingSeconds = WORK_DURATION_SECONDS;
    state.phase = 'work';
  }

  state.isRunning = true;
  state.isPaused = false;
  updateDisplay(remainingSeconds);

  timerInterval = setInterval(() => {
    remainingSeconds -= 1;
    if (remainingSeconds < 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      state.isRunning = false;
      console.log('work complete');
      return;
    }

    updateDisplay(remainingSeconds);

    if (remainingSeconds === 0) {
      switchPhase();
      updateDisplay(remainingSeconds);
      updatePhaseLabel();
    }
  }, 1000);
}

function pauseTimer() {
  if (timerInterval === null) {
    return;
  }

  clearInterval(timerInterval);
  timerInterval = null;
  state.isRunning = false;
  state.isPaused = true;
}

function resumeTimer() {
  if (!state.isPaused) {
    return;
  }

  startTimer();
}

function resetTimer() {
  if (timerInterval !== null) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  state.phase = 'work';
  remainingSeconds = WORK_DURATION_SECONDS;
  state.isRunning = false;
  state.isPaused = false;
  updateDisplay(remainingSeconds);
  updatePhaseLabel();
}

function switchPhase() {
  if (state.phase === 'work') {
    state.phase = 'break';
    remainingSeconds = BREAK_DURATION_SECONDS;
  } else {
    state.phase = 'work';
    remainingSeconds = WORK_DURATION_SECONDS;
  }
}

function updatePhaseLabel() {
  if (!phaseLabel) {
    return;
  }
  const label = state.phase === 'work' ? 'Work' : 'Break';
  phaseLabel.textContent = label;
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
