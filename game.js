let box = document.getElementById("box");
let result = document.getElementById("result");

let scoreDisplay = document.getElementById("score");
let livesDisplay = document.getElementById("lives");
let timeDisplay = document.getElementById("time");
let bestDisplay = document.getElementById("best");

let startTime;
let timer;
let countdownTimer;

let score = 0;
let lives = 3;
let timeLeft = 30;

let bestTime = null;

function startGame() {

    result.textContent = "Get ready...";

    timeDisplay.textContent = timeLeft;

    box.style.backgroundColor = "red";

    let randomTime = Math.random() * 3000 + 2000;

    timer = setTimeout(function() {

        box.style.backgroundColor = "green";

        startTime = Date.now();

    }, randomTime);
}

function handleClick() {

    if (box.style.backgroundColor === "green") {

        let reactionTime = Date.now() - startTime;

        result.textContent =
            "Reaction time: " + reactionTime + " ms";

        score = score + 1;

        scoreDisplay.textContent = score;

        if (bestTime === null || reactionTime < bestTime) {

            bestTime = reactionTime;

            bestDisplay.textContent =
                bestTime + " ms";

        }

        startGame();

    } else {

        clearTimeout(timer);

        result.textContent = "Too early!";

        lives = lives - 1;

        livesDisplay.textContent = lives;

        if (lives === 0) {

            gameOver();

        } else {

            startGame();

        }
    }
}

function countdown() {

    timeLeft = timeLeft - 1;

    timeDisplay.textContent = timeLeft;

    if (timeLeft === 0) {

        gameOver();

    }
}

function gameOver() {

    clearTimeout(timer);

    clearInterval(countdownTimer);

    box.style.backgroundColor = "gray";

    result.textContent = "Game Over!";

}

function restartGame() {

    score = 0;
    lives = 3;
    timeLeft = 30;
    bestTime = null;

    scoreDisplay.textContent = score;
    livesDisplay.textContent = lives;
    timeDisplay.textContent = timeLeft;
    bestDisplay.textContent = "None";

    clearInterval(countdownTimer);

    countdownTimer =
        setInterval(countdown, 1000);

    startGame();
}

box.addEventListener("click", handleClick);

countdownTimer =
    setInterval(countdown, 1000);

startGame();