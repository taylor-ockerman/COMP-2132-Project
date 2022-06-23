const gameWord = document.getElementById("gameWord");
const gameClue = document.getElementById("clue");
const buttons = document.getElementById("keyboard");
const guessCount = document.getElementById("guessCount");
const popup = document.getElementById("popup");
const playAgainBtn = document.getElementById("playAgain");
const gameEnd = document.getElementById("gameEnd");

let storedWord;
let wordIndex;
let wordArray = [];
let wrongGuesses = 0;
let correctGuesses = 0;

const maxGuesses = 7;

function setUpGame(){
    keyboard.resetKeys();
    if(gameData === null){
        console.log("No game data loaded");
        return;
    }
    wordIndex = getRandomInt(gameData.length);
    storedWord = gameData[wordIndex].word;
    
    wordArray = Array(storedWord.length).fill("_")
    wordCheck(wordIndex);

    gameClue.innerHTML = `<p>${gameData[wordIndex].clue}</p>`;
    guessCount.innerHTML = `Wrong Attempts: ${wrongGuesses}/${maxGuesses}`;
    wrongGuesses = 0;
    correctGuesses = 0;
}

// gameWord.addEventListener("click", function(){
//     setUpGame();
//     keyboard.resetKeys();
// });


// buttons.addEventListener("click", function(){
//     let letterFound = false;
//     for(let i = 0; i < storedWord.length; i++){
//         if(clickedKeys[clickedKeys.length - 1].toLowerCase() === storedWord[i]){
//             wordArray[i] = clickedKeys[clickedKeys.length - 1].toLowerCase();
//             letterFound = true;
//             correctGuesses++;
//         }
//         console.log(`Correct: ${correctGuesses}, length: ${storedWord.replace(/\s+/g, '').length}`);
//     }
//     if(!letterFound){
//         wrongGuesses++;
//         guessCount.innerHTML = `Wrong Attempts: ${wrongGuesses}/${maxGuesses}`;
//     }
//     if(correctGuesses == storedWord.replace(/\s+/g, '').length){
//         console.log("should have won");
//         gameOver(true);
//     }
//     if(wrongGuesses == maxGuesses){
//         //FAIL STATE
//         popup.style.display = "block";
//         gameOver(false);
//         wrongGuesses = 0;
//         correctGuesses = 0;
//         console.log("HANGMAN LOSS");
//     }
//     wordCheck(wordIndex);
//     //console.log(wordArray);
// });

function gameOver(pass){
    if(pass){
        popup.style.display = "block";
        gameEnd.innerHTML="You got it!";
        wordReveal.innerHTML = `The word was "${storedWord}"`;
    }else{
        popup.style.display = "block";
        gameEnd.innerHTML="Not quite...";
        wordReveal.innerHTML = `The word was "${storedWord}"`;
    }
    hangManPic.setAttribute("src", `${imagePath}astronaut0.png`);
}

playAgainBtn.addEventListener("click", function(){
    setUpGame();
    keyboard.resetKeys();
    popup.style.display = "none";
});

window.addEventListener("DOMContentLoaded", function () {
    loadData();
    this.setTimeout(function(){
        setUpGame();
    }, 200)
});

