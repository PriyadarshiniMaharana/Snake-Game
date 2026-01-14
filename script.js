// Selecting HTML elements
let gameContainer = document.querySelector(".game-container");
let scoreContainer = document.querySelector(".score-container");

// Food position
let foodX, foodY;

// Snake head starting position (center of grid)
let headX = 12, headY = 12;

// Snake movement direction (initially stopped)
let velocityX = 0, velocityY = 0;

// Snake body array (stores coordinates of each part)
let snakeBody = [];

// Game score
let score = 0;


// Function to generate random food position
function generateFood() {
    foodX = Math.floor(Math.random() * 25) + 1;
    foodY = Math.floor(Math.random() * 25) + 1;

    // Ensure food does not appear on snake body
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeBody[i][1] == foodY && snakeBody[i][0] == foodX) {
            generateFood(); // regenerate food if collision occurs
        }
    }
}


// Function that runs when game ends
function gameOver() {
    headX = 12;
    headY = 12;
    generateFood();
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    score = 0;

    scoreContainer.innerHTML = "Score : " + score;
    alert("Game Over");
}


// Main game rendering function
function renderGame() {

    // Draw food on board
    let updatedGame = `<div class="food" style="grid-area: ${foodY}/${foodX};"></div>`;

    // If snake eats the food
    if (foodX == headX && headY == foodY) {
        snakeBody.push([foodX, foodY]); // grow snake
        generateFood(); // new food
        score += 10;
        scoreContainer.innerHTML = "Score : " + score;
    }

    // Remove last part of snake (movement effect)
    snakeBody.pop();

    // Update snake head position
    headX += velocityX;
    headY += velocityY;

    // Add new head position to front of snake
    snakeBody.unshift([headX, headY]);

    // Game over if snake hits wall
    if (headX == 0 || headY == 0 || headX == 26 || headY == 26) {
        gameOver();
    }

    // Game over if snake hits itself
    for (let i = 1; i < snakeBody.length; i++) {
        if (
            snakeBody[0][0] == snakeBody[i][0] &&
            snakeBody[0][1] == snakeBody[i][1]
        ) {
            gameOver();
        }
    }

    // Draw each snake part on screen
    for (let i = 0; i < snakeBody.length; i++) {
        updatedGame += `<div class="snake" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]};"></div>`;
    }

    // Update HTML
    gameContainer.innerHTML = updatedGame;
}


// Generate first food
generateFood();

// Run game every 150ms
setInterval(renderGame, 150);


// Handle keyboard controls
document.addEventListener("keydown", function (e) {
    let key = e.key;

    // Move Up
    if (key == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;

    // Move Down
    } else if (key == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;

    // Move Left
    } else if (key == "ArrowLeft" && velocityX != 1) {
        velocityY = 0;
        velocityX = -1;

    // Move Right
    } else if (key == "ArrowRight" && velocityX != -1) {
        velocityY = 0;
        velocityX = 1;
    }
});
