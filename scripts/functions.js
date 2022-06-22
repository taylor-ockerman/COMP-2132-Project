

function getRandomInt(max){
    return Math.floor(Math.random() * max);
}

function wordCheck(index){
    word.innerHTML = "<p>" 
    for(let i = 0; i < gameData[index].word.length; i++){
        if(i == gameData[index].word.length){
            word.innerHTML += `${wordArray[i]}</p>`;
        }else if(gameData[index].word[i] === " "){
            //console.log("A SPACE IN THE CLUE WAS DETECTED");
            word.innerHTML += "&nbsp;&nbsp;";
        }else{
            word.innerHTML += `${wordArray[i]} `;
        }
    }
}

function guessCheck() {
    let letterFound = false;
    for(let i = 0; i < storedWord.length; i++){
        if(clickedKeys[clickedKeys.length - 1].toLowerCase() === storedWord[i]){
            wordArray[i] = clickedKeys[clickedKeys.length - 1].toLowerCase();
            letterFound = true;
            correctGuesses++;
        }
        console.log(`Correct: ${correctGuesses}, length: ${storedWord.replace(/\s+/g, '').length}`);
    }
    if(!letterFound){
        wrongGuesses++;
        guessCount.innerHTML = `Wrong Attempts: ${wrongGuesses}/${maxGuesses}`;
    }
    if(correctGuesses == storedWord.replace(/\s+/g, '').length){
        console.log("should have won");
        gameOver(true);
    }
    if(wrongGuesses == maxGuesses){
        //FAIL STATE
        popup.style.display = "block";
        gameOver(false);
        console.log("HANGMAN LOSS");
    }
    wordCheck(wordIndex);
    //console.log(wordArray);
}