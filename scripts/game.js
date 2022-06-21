const gameWord = document.getElementById("gameWord");
const gameClue = document.getElementById("clue");
const gameDataLocation = "/json/gameData.json"
const buttons = document.getElementById("keyboard");
let gameData = null;
let storedWord;
let wordArray = [];

function getRandomInt(max){
    return Math.floor(Math.random() * max);
}

function loadData(){
    fetch(gameDataLocation)
    .then(function(response){
        if(response.ok){
            return response.json();
        }else{
            console.log("Network error: fetch failed");
        }
    })
    .then(function(data){
        gameData = data;
        console.log(data);
    });
}

function setUpGame(){
    keyboard.resetKeys();
    if(gameData === null){
        console.log("No game data loaded");
        return;
    }
    const index = getRandomInt(gameData.length);
    storedWord = gameData[index].word;
    
    wordArray = Array(storedWord.length).fill("_")
    wordCheck(index);
    // for(let i = 0; i < gameData[index].word.length; i++){
    //     if(i == gameData[index].word.length){
    //         word.innerHTML += `${wordArray[i]}</p>`;
    //     }else{
    //         word.innerHTML += `${wordArray[i]} `;
    //     }
    // }
    gameClue.innerHTML = `<p>${gameData[index].clue}</p>`;
}

function wordCheck(index){
    word.innerHTML = "<p>" 
    for(let i = 0; i < gameData[index].word.length; i++){
        if(i == gameData[index].word.length){
            word.innerHTML += `${wordArray[i]}</p>`;
        }else if(gameData[index].word[i] === " "){
            console.log("A SPACE IN THE CLUE WAS DETECTED");
            word.innerHTML += "&nbsp;&nbsp;";
        }else{
            word.innerHTML += `${wordArray[i]} `;
        }
    }
}

gameWord.addEventListener("click", function(){
    setUpGame();
    keyboard.resetKeys();
});

buttons.addEventListener("click", function(){
    for(let i = 0; i < storedWord.length; i++){
        if(clickedKeys[clickedKeys.length - 1].toLowerCase() === storedWord[i]){
            wordArray[i] = clickedKeys[clickedKeys.length - 1].toLowerCase();
        }
    }
    //wordCheck(gameData.);
    console.log(wordArray);
});


window.addEventListener("DOMContentLoaded", function () {
    loadData();
    this.setTimeout(function(){
        setUpGame();
    }, 200)
});

