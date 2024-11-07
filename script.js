let startTime;
let elapsedTime = 0;
let timerInterval;
let running = false;

// HTML elements
const timerDisplay = document.getElementById("timer-display");
const lapTimes = document.getElementById("lap-times");
const startButton = document.getElementById("start-button");
const lapButton = document.getElementById("lap-button");
const stopButton = document.getElementById("stop-button");
const resetButton = document.getElementById("reset-button");

// Start button functionality
startButton.addEventListener("click", () => {
    if (!running) {
        running = true;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
    }
});

// Stop button functionality
stopButton.addEventListener("click", () => {
    if (running) {
        running = false;
        clearInterval(timerInterval);
    }
});

// Reset button functionality
resetButton.addEventListener("click", () => {
    running = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay(0);
    lapTimes.innerHTML = "";
});

// Lap button functionality
lapButton.addEventListener("click", () => {
    if (running) {
        const lapTime = formatTime(elapsedTime);
        const lapElement = document.createElement("div");
        lapElement.className = "lap-time";
        lapElement.innerText = `Lap ${lapTimes.children.length + 1}: ${lapTime}`;
        lapTimes.appendChild(lapElement);
    }
});

// Update display
function updateTime() {
    elapsedTime = Date.now() - startTime;
    updateDisplay(elapsedTime);
}

function updateDisplay(time) {
    timerDisplay.textContent = formatTime(time);
}

// Format time
function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
    return num.toString().padStart(2, "0");
}
