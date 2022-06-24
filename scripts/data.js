const gameDataLocation = "/json/gameData.json"
let gameData = null;

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
        //console.log(gameData);
    });
}