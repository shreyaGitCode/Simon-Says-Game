let gameSeq = [];
let userSeq = [];
let score = 0;

let btns = ["red" , "green" , "yellow", "blue"];

let h2 = document.querySelector("h2");

let started = false;        // tells whetherr the game is started or not
let level = 0;

// Step-1: KeyPress -> Game Start
document.addEventListener("keypress" , function(){
    if(started === false){
        console.log("game started");
        started = true;

        levelUp();
    }   
});


// Step-2:Press buttons + update level value
function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];

    let randBtn = document.querySelector(`.${randColor}`);
    
    gameSeq.push(randColor);

    // random btn choose
    gameFlash(randBtn);
}

// Step-3: button Flash
function gameFlash(btn){
    btn.classList.add("flash");

    setTimeout(function(){
        btn.classList.remove("flash");
    } , 250);
}

function userFlash(btn){
    btn.classList.add("userflash");

    setTimeout(function(){
        btn.classList.remove("userflash");
    } , 250);
}

function checkAns(idx){

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }
    else{
        if(score <= level-1){
            score = level-1;
        }

        h2.innerHTML = `<p>Game Over! Your Score is <b>${level-1}</b></p> <p>High Score : <b>${score}</b></p> <p>Restart the game</p>`;

        document.querySelector("body").style.backgroundColor= "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 300);

        reset();
    }
}

function userPress() {
    if(!started) return;
    let btn = this;
    userFlash(btn);

    userSeq.push(btn.id);

    // to check only for last button
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click" , userPress);
}

function reset(){
    level = 0;
    gameSeq = [];

    started = false;
}

