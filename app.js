"use strict";

const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
let player ={speed:5, score:0};
let key ={ArrowUp:false,ArrowDown:false,ArrowLeft:false,ArrowRight:false};

//Check  All Events
document.addEventListener("keydown",function(e) {
    e.preventDefault();
    key[e.key] = true;
});
document.addEventListener("keyup",function(e) {
    e.preventDefault();
    key[e.key] = false;
});
startScreen.addEventListener("click",start);

//Check Car Collide
function isCollide(a,b){
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !(
        (aRect.bottom < bRect.top)
        || (aRect.top > bRect.bottom)
        || (aRect.right < bRect.left)
        || (aRect.left > bRect.right)
    )
};

//Moveing Road Lines

function moveLines(){
    let lines = document.querySelectorAll(".lines");
    lines.forEach(function(item){
        if(item.y >=700){
            item.y -=750;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
};

// Game Start Function

function start(){
    startScreen.classList.add("hide");
    gameArea.innerHTML = "";
    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);

    for(let x=0; x<5; x++){
        let roadLine = document.createElement('div');
        roadLine.setAttribute("class","lines");
        roadLine.y = (x*150) ;
        roadLine.style.top =(x*150) + "px";
        gameArea.appendChild(roadLine);
    }

    for(let x=0; x<3; x++){
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute("class","enemy");
        enemyCar.y = ( (x+1) * 350) * -1 ;
        enemyCar.style.backgroundColor = randomColor();
        enemyCar.style.left = Math.floor(Math.random() * 350 ) + "px";
        enemyCar.style.top =enemyCar.y+ "px";
        gameArea.appendChild(enemyCar);
    }

    let car = document.createElement('div');
    car.setAttribute('class','car');
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y =car.offsetTop;
    car.offsetTop;
    car.offsetLeft

};

// Game End Function

function endGame(){
    player.start = false;
    startScreen.classList.remove("hide");
    startScreen.innerHTML = "Game Over <br/> Your Total Score is " + player.score + "<br />Press Here to Restart The Game."
};

// Generate Automated Color Code

function randomColor(){
    function c(){
        let hex = Math.floor(Math.random() *256).toString(16);
        return ("0" + String(hex)).substr(-2)
    }
    return  "#" + c() +c() + c();
};


// Generate Automated Car

function moveEnemy(car){
    let enemy = document.querySelectorAll(".enemy");
    enemy.forEach(function(item){
        if(isCollide(car,item)){
            endGame();
        }
        if(item.y >=1500){
            item.y = -600;
            item.style.left = Math.floor(Math.random() * 150 ) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
};

// Game Play Function

function gamePlay(){
    let car = document.querySelector(".car");
    let road = gameArea.getBoundingClientRect();
        if(player.start){
            moveLines();
            moveEnemy(car);
            if(key.ArrowUp && player.y >(road.top + 70) ){player.y -= player.speed}
            if(key.ArrowDown && player.y < (road.bottom - 85) ){player.y += player.speed}
            if(key.ArrowLeft && player.x > 0){player.x -= player.speed}
            if(key.ArrowRight && player.x <  (road.width - 50) ){player.x += player.speed}

            car.style.top = player.y + "px";
            car.style.left = player.x + "px";
            window.requestAnimationFrame(gamePlay);
            player.score++;
            let ps = player.score - 1;
            score.innerText = "Total Score : " + ps;
        }
};
