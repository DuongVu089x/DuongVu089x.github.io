const content = $("#content");
$("#content").css({
    'width': '500px',
    'height': '500px',
    'position': 'relative',
    'overflow': 'hidden'
});

const action = document.getElementById("action");
const contextAction = action.getContext("2d");

// Create monster image
const monsterImage = new Image();
monsterImage.src = "images/monster.gif";

// Create blood monster
const bloodImage = new Image();
bloodImage.src = "images/blood.png";

// Create heart image
const heartImage = new Image();
heartImage.src = "images/heart.png";

// Create all buttons as boom, stop, pause, refresh
// Create boom button
const boomImage = new Image();
boomImage.src = "images/boom.jpg";
const boomButton = {
    startX: 250,
    startY: 60,
    stopX: 300,
    stopY: 100,
    height: 50,
    width: 50
}

// Create stop button
const stopImage = new Image();
stopImage.src = "images/stop.png";
const stopButton = {
    startX: 310,
    startY: 60,
    stopX: 360,
    stopY: 100,
    height: 50,
    width: 50
}

// Create pause button
const pauseImage = new Image();
pauseImage.src = "images/pause.png";
const pauseButton = {
    startX: 370,
    startY: 60,
    stopX: 420,
    stopY: 100,
    height: 50,
    width: 50
}

// Create restart button
const restartImage = new Image();
restartImage.src = "images/restart.png";
const restartButton = {
    startX: 430,
    startY: 60,
    stopX: 480,
    stopY: 100,
    height: 50,
    width: 50
}

// Game control
let speed;
let level;
let score;
let numberMonsterShow;
let BEST;
let listBlood;
let boom;
let heart;
let isStop;
let isPause;
let isRun;
let lastUpdateTime;
let lastStop;

class Monster {
    constructor(startX, startY, endX, endY, number, isDead) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.number = number;
        this.isDead = isDead;
    }
}
// Start create all monster
let monsterOne = new Monster(0, 0, '40%', '40%', 1, true);
let monsterTwo = new Monster('40%', 0, '40%', '40%', 2, true);
let monsterThree = new Monster('80%', 0, '40%', '40%', 3, true);
let monsterFour = new Monster('80%', '40%', '40%', '40%', 4, true);
let monsterFive = new Monster('80%', '80%', '40%', '40%', 5, true);
let monsterSix = new Monster('40%', '80%', '40%', '40%', 6, true);
let monsterSeven = new Monster(0, '80%', '40%', '40%', 7, true);
let monsterEight = new Monster(0, '40%', '40%', '40%', 8, true);
let monsterNine = new Monster(randomLocation(), randomLocation(), randomLocation(), randomLocation(), 9);

function randomLocation() {
    return Math.floor(Math.random() * 400) + 1;
}

function animateMonster(monster) {
    $(`#monster${monster.number}`).css('display', 'block');
    $(`#monster${monster.number}`).animate({
        top: monster.endY,
        left: monster.endX
    }, 3000);
    $(`#monster${monster.number}`).animate({
        top: monster.startY,
        left: monster.startX,
    }, 3000, () => {
        $(`#monster${monster.number}`).css('display', 'none');
        if (!monster.isDead) {
            heart--;
            if (heart >= 0) {
                drawAction();
                playGame();
            } else {
                gameOver();
            }
        }
    });
}
/**
 * Function setting all controll
 */
function setting() {
    BEST = 50;

    speed = 1;
    level = 1;
    score = 50;
    numberMonsterShow = 1;
    boom = 3;
    stop = 3;
    heart = 5;
    isRun = true;
    isStop = false;
    isPause = false;
    lastStop = false;
    lastUpdateTime = Date.now();
    listBlood = new Array();

    $("#content").append(`
        <img id="monster1" class="monster" src="images/monster.gif" width="100px" height="100px" onclick="clickMonster(1,event)"
        />
        <img id="monster2" class="monster" src="images/monster.gif" width="100px" height="100px" onclick="clickMonster(2,event)"
        />
        <img id="monster3" class="monster" src="images/monster.gif" width="100px" height="100px" onclick="clickMonster(3,event)"
        />
        <img id="monster4" class="monster" src="images/monster.gif" width="100px" height="100px" onclick="clickMonster(4,event)"
        />
        <img id="monster5" class="monster" src="images/monster.gif" width="100px" height="100px" onclick="clickMonster(5,event)"
        />
        <img id="monster6" class="monster" src="images/monster.gif" width="100px" height="100px" onclick="clickMonster(6,event)"
        />
        <img id="monster7" class="monster" src="images/monster.gif" width="100px" height="100px" onclick="clickMonster(7,event)"
        />
        <img id="monster8" class="monster" src="images/monster.gif" width="100px" height="100px" onclick="clickMonster(8,event)"
        />
        <img id="monster9" class="monster" src="images/monster.gif" width="100px" height="100px" onclick="clickMonster(9,event)"
        />
        <div class="gameOver" id="gameOver">
            <h1>Game Over</h1>
        </div>
    `);
}

/**
 * Function game over
 */
function gameOver() {
    for (let i = 0; i < numberMonsterShow; i++) {
        $(`#monster${(i+1)}`).finish();
    }
    $("#gameOver").css("display", "block");
}

function clickMonster(monster, event) {
    if (isRun) {
        score += 50;
        switch (monster) {
            case 1:
                monsterOne.isDead = true;
                break;
            case 2:
                monsterTwo.isDead = true;
                break;
            case 3:
                monsterThree.isDead = true;
                break;
            case 4:
                monsterFour.isDead = true;
                break;
            case 5:
                monsterFive.isDead = true;
                break;
            case 6:
                monsterSix.isDead = true;
                break;
            case 7:
                monsterSeven.isDead = true;
                break;
            case 8:
                monsterEight.isDead = true;
                break;
            case 9:
                monsterNine.isDead = true;
                break;
        }
        $(`#monster${monster}`).css('display', 'none').finish();
        var parentOffset = $("#content").offset();
        var relX = event.pageX - parentOffset.left;
        var relY = event.pageY - parentOffset.top;

        drawAction();
        drawBlood(relX, relY);
        randomMonster();
    }
}

function drawBlood(pageX, pageY) {
    $("#content").append(`<img class="blood" src="images/blood.png" width="100px" height="100px" style="left:${pageX}px; top:${pageY}px"/>`)
}

/**
 * Add event Listener click in canvas Action
 */
action.addEventListener("click", function (e) {
    locationX = e.pageX - this.offsetLeft;
    locationY = e.pageY - this.offsetTop;

    // When click button boom
    if (locationX >= boomButton.startX && locationX <= boomButton.stopX && locationY >= boomButton.startY && boomButton.stopY && !isPause && boom > 0) {
        btnBoomClick();
    }
    // When click button stop
    if (locationX >= stopButton.startX && locationX <= stopButton.stopX && locationY >= stopButton.startY && stopButton.stopY && stop >= 0 && !lastStop) {
        btnStopClick();
    }
    // When click button pause
    if (locationX >= pauseButton.startX && locationX <= pauseButton.stopX && !isStop && locationY >= pauseButton.startY && pauseButton.stopY) {
        btnPauseClick();
    }
    // When click button restart
    if (locationX >= restartButton.startX && locationX <= restartButton.stopX && locationY >= restartButton.startY && restartButton.stopY) {
        btnRestartClick();
    }
});

function btnPauseClick() {
    clearInterval(intervalGamePlay);
    for (let i = 0; i < numberMonsterShow; i++) {
        $(`#monster${i+1}`).stop();
    }
}

function btnRestartClick() {
    $("#content").html('');
    setting();
    drawAction();
    playGame();
}

function drawButton() {
    contextAction.drawImage(boomImage, boomButton.startX, boomButton.startY, boomButton.width, boomButton.height);
    contextAction.drawImage(stopImage, stopButton.startX, stopButton.startY, stopButton.width, stopButton.height);
    contextAction.drawImage(pauseImage, pauseButton.startX, pauseButton.startY, pauseButton.width, pauseButton.height);
    contextAction.drawImage(restartImage, restartButton.startX, restartButton.startY, restartButton.width, restartButton.height);
    let temp = 0;
    for (let i = 0; i < heart; i++) {
        contextAction.drawImage(heartImage, (70 + temp), 45, 20, 20);
        temp += 20;
    }
    contextAction.fillStyle = "#000";
    contextAction.font = "35px Arial";
    contextAction.fillText(boom, 260, 70);
    contextAction.fillText(stop, 320, 70);
}

/**
 * Function draw all buttons in canvas action
 */
function drawAction() {
    contextAction.clearRect(0, 0, action.width, action.height);
    boomImage.onload = () => {
        drawButton();
    }
    drawButton();
    contextAction.fillStyle = "rgba(255,255,255,.87)";
    contextAction.font = "20px Arial";
    contextAction.fillText("Score:" + score, 10, 30);
    contextAction.fillText("Random M: " + numberMonsterShow, 300, 30);
    contextAction.fillText("Heart:", 10, 60);
    contextAction.fillText("Speed:" + speed, 10, 90);
}

function randomMonster() {
    numberMonsterShow = level = Math.ceil(score / 200);
    for (let i = 0; i < level; i++) {
        let randomNumber = Math.ceil(Math.random() * 9) + 1;
        switch (randomNumber) {
            case 1:
                monsterOne.isDead = false;
                animateMonster(monsterOne);
                break;
            case 2:
                monsterTwo.isDead = false;
                animateMonster(monsterTwo);
                break;
            case 3:
                monsterThree.isDead = false;
                animateMonster(monsterThree);
                break;
            case 4:
                monsterFour.isDead = false;
                animateMonster(monsterFour);
                break;
            case 5:
                monsterNine.isDead = false;
                animateMonster(monsterNine);
                break;
            case 6:
                monsterSix.isDead = false;
                animateMonster(monsterSix);
                break;
            case 7:
                monsterSeven.isDead = false;
                animateMonster(monsterSeven);
                break;
            case 8:
                monsterEight.isDead = false;
                animateMonster(monsterEight);
                break;
            case 9:
                monsterNine.isDead = false;
                animateMonster(monsterNine);
                break;
            default:
                monsterOne.isDead = false;
                animateMonster(monsterOne);
                break;
        }
    }
}

function playGame() {
    randomMonster();
    // if (intervalGamePlay) {
    //     clearInterval(intervalGamePlay);
    // }
    // intervalGamePlay = setInterval(() => {
    //     randomMonster();
    // }, 6000);
}

(function init() {
    setting();
    drawAction();
    playGame();
})();