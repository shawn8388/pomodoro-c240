## Plan: Pomodoro Web App

This plan uses exactly three files: `index.html`, `style.css`, and `app.js`.

### Files

- `index.html`
  - Defines the app structure: timer display, circular progress ring, work/break labels, pause/resume/reset controls, and session counter.
  - Loads `style.css` and `app.js`, and provides accessible semantic markup for the Pomodoro UI.

- `style.css`
  - Styles the timer layout, responsive card, buttons, and the circular progress visual.
  - Implements visual states for work vs break, paused state, and transitions without any JavaScript logic.

- `app.js`
  - Contains all app logic: timer state, countdown loop, controls, mode transitions, sound playback, and localStorage persistence.
  - Wires UI events to behavior and updates DOM elements for time, progress, and session count.

### Function signatures

All functions live in `app.js`; `index.html` and `style.css` are structural and styling only.

- `initApp(): void`
- `bindUIEvents(): void`
- `startTimer(durationSeconds: number): void`
- `pauseTimer(): void`
- `resumeTimer(): void`
- `resetTimer(): void`
- `switchMode(mode: 'work' | 'break'): void`
- `updateTimer(): void`
- `updateDisplay(remainingSeconds: number): void`
- `updateProgressRing(remainingSeconds: number, totalSeconds: number): void`
- `playTransitionSound(): void`
- `loadSessionCount(): number`
- `saveSessionCount(count: number): void`
- `incrementSessionCount(): void`
- `formatTime(seconds: number): string`
- `setControlStates(isRunning: boolean, isPaused: boolean): void`
- `setModeVisuals(mode: 'work' | 'break'): void`

### Sensible build order

1. Create `index.html` with the static structure and placeholders for timer display, progress ring, controls, and session count.
2. Create `style.css` to style the layout, circular progress, and button states so the UI is visually complete before logic is added.
3. In `app.js`, define DOM references and the initial app state.
4. Implement timer control logic: `startTimer`, `pauseTimer`, `resumeTimer`, `resetTimer`, `updateTimer`, and `switchMode`.
5. Add persistence and polish: session counter storage, `playTransitionSound`, `formatTime`, `updateProgressRing`, and control-state updates.
