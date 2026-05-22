const WORK_DURATION_SECONDS = 25 * 60;
const BREAK_DURATION_SECONDS = 5 * 60;
const RING_RADIUS = 90;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const timerValue = document.getElementById('timerValue');
const phaseLabel = document.getElementById('phaseLabel');
const foregroundCircle = document.getElementById('foregroundCircle');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resumeButton = document.getElementById('resumeButton');
const resetButton = document.getElementById('resetButton');
const sessionCount = document.getElementById('sessionCount');

let timerInterval = null;
let remainingSeconds = WORK_DURATION_SECONDS;
let totalDuration = WORK_DURATION_SECONDS;
let audioContext = null;
const state = {
  phase: 'work',
  isRunning: false,
  isPaused: false,
};

function ensureAudioContext() {
  if (audioContext && audioContext.state !== 'closed') {
    return audioContext;
  }

  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  return audioContext;
}

function playTone(frequency, duration = 0.2) {
  if (!audioContext) {
    return;
  }

  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, now);

  gainNode.gain.setValueAtTime(0.0001, now);
  gainNode.gain.exponentialRampToValueAtTime(0.15, now + 0.01);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start(now);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  oscillator.stop(now + duration + 0.02);
}

function playTransitionSound(nextPhase) {
  if (!audioContext) {
    return;
  }

  const frequency = nextPhase === 'break' ? 440 : 660;
  playTone(frequency, 0.2);
}

function initApp() {
  totalDuration = WORK_DURATION_SECONDS;
  if (foregroundCircle) {
    foregroundCircle.setAttribute('stroke-dasharray', RING_CIRCUMFERENCE);
    updateProgressRing(remainingSeconds, totalDuration);
  }
  updateDisplay(remainingSeconds);
  updatePhaseLabel();
  bindUIEvents();
}

function bindUIEvents() {
  startButton.addEventListener('click', () => {
    ensureAudioContext();
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
    updateProgressRing(remainingSeconds, totalDuration);

    if (remainingSeconds === 0) {
      switchPhase();
      totalDuration = state.phase === 'work' ? WORK_DURATION_SECONDS : BREAK_DURATION_SECONDS;
      updateDisplay(remainingSeconds);
      updatePhaseLabel();
      updateProgressRing(remainingSeconds, totalDuration);
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
  totalDuration = WORK_DURATION_SECONDS;
  state.isRunning = false;
  state.isPaused = false;
  updateDisplay(remainingSeconds);
  updatePhaseLabel();
  updateProgressRing(remainingSeconds, totalDuration);
}

function switchPhase() {
  if (state.phase === 'work') {
    state.phase = 'break';
    remainingSeconds = BREAK_DURATION_SECONDS;
    playTransitionSound('break');
  } else {
    state.phase = 'work';
    remainingSeconds = WORK_DURATION_SECONDS;
    playTransitionSound('work');
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
  if (!foregroundCircle) {
    return;
  }
  
  const offset = RING_CIRCUMFERENCE * (remainingSeconds / totalSeconds);
  foregroundCircle.setAttribute('stroke-dashoffset', offset);
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
