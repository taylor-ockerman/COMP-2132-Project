const hangManPic = document.getElementById("hangmanPic");
const innerPopup = document.getElementById("innerPopup");
const endGIF = document.getElementById("endGIF");
const correctSound = new Audio("../sounds/correct.wav");
const incorrectSound = new Audio("../sounds//incorrect.wav");
const imagePath = "/images/";

correctSound.volume = 0.2;
incorrectSound.volume = 0.2;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function wordCheck(index) {
    word.innerHTML = "<p>"
    for (let i = 0; i < gameData[index].word.length; i++) {
        if (i == gameData[index].word.length) {
            word.innerHTML += `${wordArray[i]}</p>`;
        } else if (gameData[index].word[i] === " ") {
            //console.log("A SPACE IN THE CLUE WAS DETECTED");
            word.innerHTML += "&nbsp;&nbsp;";
        } else {
            word.innerHTML += `${wordArray[i]} `;
        }
    }
}

function guessCheck() {
    let letterFound = false;
    for (let i = 0; i < storedWord.length; i++) {
        if (clickedKeys[clickedKeys.length - 1].toLowerCase() === storedWord[i]) {
            wordArray[i] = clickedKeys[clickedKeys.length - 1].toLowerCase();
            letterFound = true;
            correctGuesses++;
            correctSound.pause();
            correctSound.currentTime = 0;
            correctSound.play();
        }
        console.log(`Correct: ${correctGuesses}, length: ${storedWord.replace(/\s+/g, '').length}`);
    }
    if (!letterFound) {
        wrongGuesses++;
        guessCount.innerHTML = `Wrong Attempts: ${wrongGuesses}/${maxGuesses}`;
        incorrectSound.pause();
        incorrectSound.currentTime = 0;
        incorrectSound.play();
        hangManPic.setAttribute("src", `${imagePath}astronaut${wrongGuesses < maxGuesses ? wrongGuesses : wrongGuesses - 1}.png`);
        console.log(`src set to: "${imagePath}astronaut${wrongGuesses}.png"`);
    }
    if (wrongGuesses == (maxGuesses - 1)) {
        console.log("should be red text now");
        guessCount.classList.add("danger");
        console.log(guessCount.classList);
    }
    if (wrongGuesses == maxGuesses) {
        //FAIL STATE
        popup.style.display = "block";
        gameOver(false);
        //console.log("HANGMAN LOSS");
    }
    if (correctGuesses == storedWord.replace(/\s+/g, '').length) {
        //console.log("should have won");
        gameOver(true);
    }
    wordCheck(wordIndex);
    //console.log(wordArray);
}

let rotation = 0;
let positive = true;

function rotateGIF() {
    if (rotation > 359) {
        positive = false;
    }
    if (rotation < 1) {
        positive = true
    }
    positive ? rotation += 1 : rotation -= 1;
    endGIF.style.transform = `rotate(${rotation}deg)`;
    console.log(rotation);
    frameHandler = requestAnimationFrame(rotateGIF);
}
function shakeGIF() {
    // console.log("SHAKE GIF");
    if (rotation > 30) {
        positive = false;
    }
    if (rotation < -30) {
        positive = true
    }

    positive ? rotation += 0.5 : rotation -= 0.5;

    endGIF.style.transform = `rotate(${rotation}deg)`;
    console.log(rotation);
    frameHandler = requestAnimationFrame(shakeGIF);
}