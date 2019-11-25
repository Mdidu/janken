var mode = document.getElementById("mode");
var onePlayer = document.getElementById("onePlayer");
var bot = document.getElementById("bot");

var game = document.getElementById('game');
var player = document.getElementById('player');
var ia = document.getElementById('ia');
var score = document.getElementById('score');
var res = document.getElementById('res');

var rock = document.getElementById('rock');
var paper = document.getElementById('paper');
var scissors = document.getElementById('scissors');

var reset = document.getElementById('reload');

//variable storing the image path
var imgRock = "img/Rock-paper-scissors_(rock).png";
var imgPaper = "img/Rock-paper-scissors_(paper).png";
var imgScissors = "img/Rock-paper-scissors_(scissors).png";

var round = 0;
var intervalTempo;
var roundMax = 100;
var autoGame;
var iaHit;
var iaHit2;
var win = 0;
var loose = 0;
var draw = 0;
var hits = ["Rock", "Paper", "Scissors"];

function modeChoice() {
    mode.style.display = "none";
    game.style.display = "block";
    if(this === bot){
        rock.style.display = "none";
        paper.style.display = "none";
        scissors.style.display = "none";

        if(round < roundMax){
            autoGame = setInterval(party,1000);
            intervalTempo = setInterval(function () {
                ++round;
                if (round >= roundMax){
                    clearInterval(autoGame);
                    clearInterval(intervalTempo);
                }
            }, 1000);
        }
    }
}

function hitRandom(id) {
    return id[Math.floor(Math.random() * id.length)];
}

//function that triggers the game
function party(){
    iaHit = hitRandom(hits);
    if(this === rock){
        imgHit("Rock", iaHit);
        compar("Rock", iaHit);
    }else if(this === paper){
        imgHit("Paper", iaHit);
        compar("Paper", iaHit);
    }else if(this === scissors){
        imgHit("Scissors", iaHit);
        compar("Scissors", iaHit);
    }else {
        iaHit2 = hitRandom(hits);
        imgHit(iaHit2, iaHit);
        compar(iaHit2, iaHit);
    }
}
//function used to display the image of the move played by the player
function imgHit(playerHit, iaHit) {
    if(playerHit === "Rock"){
        player.src = imgRock;
    }else if(playerHit === "Paper"){
        player.src = imgPaper;
    }else if(playerHit === "Scissors"){
        player.src = imgScissors;
    }

    if(iaHit === "Rock"){
        ia.src = imgRock;
    }else if(iaHit === "Paper"){
        ia.src = imgPaper;
    }else if(iaHit === "Scissors"){
        ia.src = imgScissors;
    }
}

//function comparing opponents' moves, decides who wins and displays the result
function compar(playerHit, iaHit) {
    if((playerHit === "Rock" && iaHit === "Scissors") || (playerHit === "Paper" && iaHit === "Rock") ||
        (playerHit === "Scissors" && iaHit === "Paper")){
        ++win;
        res.innerHTML = "Win !";
        score.innerHTML = "Score : " + win + " win, " + loose + " loose, " + draw + " draw !";
    }else if((playerHit === "Rock" && iaHit === "Paper") || (playerHit === "Paper" && iaHit === "Scissors") ||
        (playerHit === "Scissors" && iaHit === "Rock")){
        ++loose;
        res.innerHTML = "Loose !";
        score.innerHTML = "Score : " + win + " win, " + loose + " loose, " + draw + " draw !";
    }else{
        ++draw;
        res.innerHTML = "Draw !";
        score.innerHTML = "Score : " + win + " win, " + loose + " loose, " + draw + " draw !";
    }
}

function reload(){
    score.innerHTML = "";
    player.src = "";
    ia.src = "";
    win = 0;
    loose = 0;
    draw = 0;
    round = 0;
    mode.style.display = "block";
    game.style.display = "none";
    rock.style.display = "block";
    paper.style.display = "block";
    scissors.style.display = "block";
    clearInterval(autoGame);
}

onePlayer.addEventListener('click', modeChoice);
bot.addEventListener('click', modeChoice);
rock.addEventListener('click', party);
paper.addEventListener('click', party);
scissors.addEventListener('click', party);
reset.addEventListener('click', reload);