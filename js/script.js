var mode = document.getElementById("mode");
var onePlayer = document.getElementById("onePlayer");
var bot = document.getElementById("bot");
var yamcha = document.getElementById("yamcha");
var game = document.getElementById('game');
var avatarP1 = document.getElementById('avatarP1');
var avatarP2 = document.getElementById('avatarP2');
var player = document.getElementById('player');
var yamchaDeath = document.getElementById('yamchaDeath');
var ia = document.getElementById('ia');
var score = document.getElementById('score');
var histo = document.getElementById('histo');
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
var roundMax = 100;
var win = 0;
var loose = 0;
var draw = 0;
var autoGame;
var iaHit;
var iaHit2;

var bool = false;

var hits = ["Rock", "Paper", "Scissors"];

function modeChoice() {
    mode.style.display = "none";
    game.style.display = "block";
    avatarP1.src = "img/goku-namek.png";
    avatarP2.src = "img/freezer.png";

    if(this === bot){
        avatarP1.src = "img/vegeta-blue.png";
        avatarP2.src = "img/golden-freezer.png";

        rock.style.display = "none";
        paper.style.display = "none";
        scissors.style.display = "none";
        res.style.display ="none";

        autoGame = setInterval(party,300);

    }else if(this === yamcha){
        avatarP1.src = "img/yamcha.png";
        avatarP2.src = "img/saibaman.png";
        bool = true;
    }
}

function hitRandom(id) {
    return id[Math.floor(Math.random() * id.length)];
}

//function that triggers the game
function party(){
    iaHit = hitRandom(hits);
    ++round;
    if(round >= roundMax){
        clearInterval(autoGame);
    }

    if(this === rock && bool === true){
        rock.style.display = "none";
        paper.style.display = "none";
        scissors.style.display = "none";

        imgHit("Rock", "Paper");
        compar("Rock", "Paper");
    }else if(this === paper && bool === true){
        rock.style.display = "none";
        paper.style.display = "none";
        scissors.style.display = "none";

        imgHit("Paper", "Scissors");
        compar("Paper", "Scissors");
    }else if(this === scissors && bool === true){
        rock.style.display = "none";
        paper.style.display = "none";
        scissors.style.display = "none";

        imgHit("Scissors", "Rock");
        compar("Scissors", "Rock");
    }else {
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
            imgHit(iaHit, iaHit2);
            compar(iaHit, iaHit2);
        }
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
        res.className = "green";
        spawnResult("Win !");
        historyHits(playerHit, iaHit, "green");
    }else if((playerHit === "Rock" && iaHit === "Paper") || (playerHit === "Paper" && iaHit === "Scissors") ||
        (playerHit === "Scissors" && iaHit === "Rock")){
        ++loose;
        res.className = "red";
        spawnResult("Loose !");
        historyHits(playerHit, iaHit, "red");
    }else{
        ++draw;
        res.className = "";
        spawnResult("Draw !");
        historyHits(playerHit, iaHit);
    }
}

//function displaying the result
function spawnResult(value) {
    if(bool === true){
        yamchaDeath.style.display = "block";
        score.innerHTML = "Score : " + win + " win, " + loose + " loose, " + draw + " draw !";
        bool = false;
    }else{
        res.innerHTML = value;
        score.innerHTML = "Score : " + win + " win, " + loose + " loose, " + draw + " draw !";
    }
}

function historyHits(playerHit, iaHit, color) {
    var history = document.createElement("div");

    var p1 = document.createElement('span');
    p1.innerHTML = "Player 1: " + playerHit;
    history.appendChild(p1);

    var p2 = document.createElement('span');
    p2.innerHTML += " Player 2: " + iaHit;
    history.appendChild(p2);

    histo.appendChild(history);

    if(color === "green"){
        p1.className = "green";
        p2.className = "red";
    }else if(color === "red"){
        p1.className = "red";
        p2.className = "green";
    }
}

function reload(){
    score.innerHTML = "";
    player.src = "";
    ia.src = "";
    res.innerHTML = "";
    yamchaDeath.style.display = "none";

    win = 0;
    loose = 0;
    draw = 0;
    round = 0;

    mode.style.display = "block";
    game.style.display = "none";
    rock.style.display = "block";
    paper.style.display = "block";
    scissors.style.display = "block";

    //If you click on reset before the end
    clearInterval(autoGame);

    while (histo.firstChild){
        histo.removeChild(histo.firstChild);
    }
}

onePlayer.addEventListener('click', modeChoice);
bot.addEventListener('click', modeChoice);
yamcha.addEventListener('click', modeChoice);
rock.addEventListener('click', party);
paper.addEventListener('click', party);
scissors.addEventListener('click', party);
reset.addEventListener('click', reload);