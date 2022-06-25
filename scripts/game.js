const gameWord = document.getElementById("gameWord");
const gameClue = document.getElementById("clue");
const buttons = document.getElementById("keyboard");
const guessCount = document.getElementById("guessCount");
const popup = document.getElementById("popup");
const playAgainBtn = document.getElementById("playAgain");
const gameEnd = document.getElementById("gameEnd");
const gifPath = "../gifs/";
const victorySound = new Audio("../sounds/victory.wav");
const defeatSound = new Audio("../sounds/cry.wav");

const maxGuesses = 7;
const timeOut = 200;
victorySound.volume = volumeLimit;
defeatSound.volume = volumeLimit;

let storedWord;
let wordIndex;
let wordArray = [];
let wrongGuesses = 0;
let correctGuesses = 0;
let timeoutHandler;
let frameHandler;

function setUpGame() {
    cancelAnimationFrame(frameHandler);
    keyboard.resetKeys();
    wrongGuesses = 0;
    correctGuesses = 0;
    rotation = 0;
    guessCount.classList = "";
    popup.classList = "";
    innerPopup.classList = "";
    endGIF.style.transform = `rotate(0deg)`;
    popup.style.display = "none";
    hangManPic.setAttribute("src", `${imagePath}astronaut0.png`);

    if (gameData === null) {
        console.log("No game data loaded");
        return;
    }

    wordIndex = getRandomInt(gameData.length);
    storedWord = gameData[wordIndex].word;

    wordArray = Array(storedWord.length).fill("_")
    wordCheck(wordIndex);

    gameClue.innerHTML = `<p>${gameData[wordIndex].clue}</p>`;
    guessCount.innerHTML = `Wrong Attempts: ${wrongGuesses}/${maxGuesses}`;
}

function gameOver(pass) {
    if (pass) {
        popup.style.display = "block";
        gameEnd.innerHTML = "You got it!";
        innerPopup.classList.add("winBorder");
        // console.log(innerPopup.classList);
        endGIF.setAttribute("src", `${gifPath}win-crop.gif`);
        // frameHandler = requestAnimationFrame(rotateGIF());
        wordReveal.innerHTML = `The word was "${storedWord}"`;
        victorySound.pause();
        victorySound.currentTime = 0;
        victorySound.play();
    } else {
        popup.style.display = "block";
        innerPopup.classList.add("failBorder");
        // console.log(innerPopup.classList);
        gameEnd.innerHTML = "Not quite...";
        endGIF.setAttribute("src", `${gifPath}lose-crop.gif`);
        // frameHandler = requestAnimationFrame(rotateGIF());
        wordReveal.innerHTML = `The word was "${storedWord}"`;
        defeatSound.pause();
        defeatSound.currentTime = 0;
        defeatSound.play();
    }

}

playAgainBtn.addEventListener("click", function () {
    setUpGame();
});

window.addEventListener("DOMContentLoaded", function () {
    keyboard.initialize();
    loadData();
    timeoutHandler = setTimeout(function () {
        setUpGame();
    }, timeOut)
});

victorySound.addEventListener("play", function () {
    frameHandler = requestAnimationFrame(rotateImg);
});

defeatSound.addEventListener("play", function () {
    frameHandler = requestAnimationFrame(tiltImg);
});