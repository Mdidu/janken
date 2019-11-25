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

var round = 0;
var intervalTempo;
var roundMax = 100;
var autoGame;
var iaHit;
var iaHit2;
var win = 0;
var loose = 0;
var draw = 0;
var hits = ["Pierre", "Feuille", "Ciseaux"];

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

function party(){
    iaHit = hitRandom(hits);
    if(this === rock){
        imgHit("Pierre", iaHit);
        compar("Pierre", iaHit);
    }else if(this === paper){
        imgHit("Feuille", iaHit);
        compar("Feuille", iaHit);
    }else if(this === scissors){
        imgHit("Ciseaux", iaHit);
        compar("Ciseaux", iaHit);
    }else {
        iaHit2 = hitRandom(hits);
        imgHit(iaHit2, iaHit);
        compar(iaHit2, iaHit);
    }
}

function imgHit(playerHit, iaHit) {
    if(playerHit === "Pierre"){
        player.src = "img/Rock-paper-scissors_(rock).png";
    }else if(playerHit === "Feuille"){
        player.src = "img/Rock-paper-scissors_(paper).png";
    }else if(playerHit === "Ciseaux"){
        player.src = "img/Rock-paper-scissors_(scissors).png";
    }

    if(iaHit === "Pierre"){
        ia.src = "img/Rock-paper-scissors_(rock).png";
    }else if(iaHit === "Feuille"){
        ia.src = "img/Rock-paper-scissors_(paper).png";
    }else if(iaHit === "Ciseaux"){
        ia.src = "img/Rock-paper-scissors_(scissors).png";
    }
}

function compar(playerHit, iaHit) {
    if((playerHit === "Pierre" && iaHit === "Ciseaux") || (playerHit === "Feuille" && iaHit === "Pierre") ||
        (playerHit === "Ciseaux" && iaHit === "Feuille")){
        ++win;
        res.innerHTML = "Vous avez gagné !";
        score.innerHTML = "Score : " + win + " win, " + loose + " loose, " + draw + " draw !";
    }else if((playerHit === "Pierre" && iaHit === "Feuille") || (playerHit === "Feuille" && iaHit === "Ciseaux") ||
        (playerHit === "Ciseaux" && iaHit === "Pierre")){
        ++loose;
        res.innerHTML = "Vous avez perdu !";
        score.innerHTML = "Score : " + win + " win, " + loose + " loose, " + draw + " draw !";
    }else{
        ++draw;
        res.innerHTML = "Match nul !";
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