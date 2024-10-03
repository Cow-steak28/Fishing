// Select DOM elements
const canvas = document.getElementById('game-canvas');
const castBtn = document.getElementById('cast-btn');
const reelBtn = document.getElementById('reel-btn');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const upgradeRodBtn = document.getElementById('upgrade-rod');
const upgradeBaitBtn = document.getElementById('upgrade-bait');
const planetName = document.getElementById('planet-name');

// Set canvas dimensions
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
const ctx = canvas.getContext('2d');

// Initial game state
let isCasting = false;
let isReeling = false;
let fishCaught = false;
let score = 0;
let highScore = 0;
let rodLevel = 1;
let baitLevel = 1;

// Load high score from localStorage (for PWA offline usage)
if (localStorage.getItem('highScore')) {
    highScore = localStorage.getItem('highScore');
    highScoreElement.textContent = highScore;
}

// Handle casting the line
castBtn.addEventListener('click', () => {
    if (!isCasting && !fishCaught) {
        isCasting = true;
        displayMessage('Casting the line...');
        castLine();
    }
});

// Handle reeling in
reelBtn.addEventListener('click', () => {
    if (isCasting && !isReeling && fishCaught) {
        isReeling = true;
        displayMessage('Reeling in...');
        reelFish();
    }
});

// Cast the line function
function castLine() {
    // Simulate casting delay
    setTimeout(() => {
        fishCaught = Math.random() < 0.5; // 50% chance of catching fish
        if (fishCaught) {
            displayMessage('Fish caught! Reel it in!');
        } else {
            displayMessage('No fish this time. Try again.');
            resetGame();
        }
        isCasting = false;
    }, 2000); // Casting takes 2 seconds
}

// Reel the fish function
function reelFish() {
    // Simulate reeling in delay
    setTimeout(() => {
        if (fishCaught) {
            score += rodLevel * baitLevel; // Increase score based on rod and bait level
            updateScore();
            displayMessage('You caught a fish!');
        } else {
            displayMessage('The fish got away.');
        }
        resetGame();
    }, 2000); // Reeling in takes 2 seconds
}

// Update the score and high score
function updateScore() {
    scoreElement.textContent = score;
    if (score > highScore) {
        highScore = score;
        highScoreElement.textContent = highScore;
        localStorage.setItem('highScore', highScore); // Save new high score
    }
}

// Reset game state after casting or reeling
function resetGame() {
    isCasting = false;
    isReeling = false;
    fishCaught = false;
}

// Display messages in-game
function displayMessage(message) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    ctx.font = '24px Arial';
    ctx.fillStyle = '#00796b';
    ctx.fillText(message, 10, canvas.height / 2);
}

// Upgrade rod for better chances and higher score
upgradeRodBtn.addEventListener('click', () => {
    rodLevel++;
    displayMessage(`Rod upgraded! Current level: ${rodLevel}`);
});

// Upgrade bait for better chances and higher score
upgradeBaitBtn.addEventListener('click', () => {
    baitLevel++;
    displayMessage(`Bait upgraded! Current level: ${baitLevel}`);
});
