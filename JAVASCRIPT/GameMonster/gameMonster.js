const canvas = document.getElementById("canvas");
const contextCanvas = canvas.getContext("2d");

const action = document.getElementById("action");
const contextAction = action.getContext("2d");

const FPS = 144;
const TICKS = 1000 / FPS;

// Run game
const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame || window.mozRequestAnimationFrame;

// Create background image
const backgroundImage = new Image();
backgroundImage.src = "images/background.jpg";

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

const MATH = Math.floor(Math.random() * 400) + 1;

// Game control
let speed;
let level;
let score;
let numberMonsterShow;
let bestscore;
let listBlood;
let boom;
let stop;
let heart;
let isBoom;
let isStop;
let isPause;
let isRun;
let lastUpdateTime;
let lastStop;

class Monster {
    constructor(startX, startY, stopX, stopY, currentX, currentY, click, show, dieX, dieY, endX, endY, number) {
        this.startX = startX;
        this.startY = startY;
        this.stopX = stopX;
        this.stopY = stopY;
        this.currentX = currentX;
        this.currentY = currentY;
        this.click = click;
        this.show = show;
        this.dieX = dieX;
        this.dieY = dieY;
        this.endX = endX;
        this.endY = endY;
        this.number = number;
    }
}

// Start create all monster
let monsterOne = new Monster(0, 0, 100, 100, 0, 0, false, true, 0, 0, 100, 100, 1);
let monsterTwo = new Monster(200, 0, 200, 100, 200, 0, false, false, 200, 0, 200, 100, 2);
let monsterThree = new Monster(400, 0, 300, 100, 400, 0, false, false, 400, 0, 300, 100, 3);
let monsterFour = new Monster(400, 200, 300, 200, 400, 200, false, false, 400, 200, 300, 200, 4);
let monsterFive = new Monster(400, 400, 300, 300, 400, 400, false, false, 400, 400, 300, 300, 5);
let monsterSix = new Monster(200, 400, 200, 300, 200, 400, false, false, 200, 400, 200, 300, 6);
let monsterSeven = new Monster(0, 400, 100, 300, 0, 400, false, false, 0, 400, 100, 300, 7);
let monsterEight = new Monster(0, 200, 100, 200, 0, 200, false, false, 0, 200, 100, 200, 8);
let monsterNine = new Monster(MATH, MATH, MATH, MATH, MATH, MATH, false, false, 0, 0);

/**
 * Function setting all controll
 */
function setting() {
    speed = 1;
    level = 1;
    score = 50;
    numberMonsterShow = 0;
    bestscore = 50;
    boom = 3;
    stop = 3;
    heart = 5;

    isBoom = false;
    isStop = false;
    isPause = false;
    isRun = true;
    lastStop = false;
    lastUpdateTime = Date.now();
    listBlood = new Array();
}

/**
 * Function refresh Monster 1 -> 8
 * @param {Monster} monster 
 */
function refreshMonster(monster) {
    monster.show = false;
    monster.startX = monster.dieX;
    monster.startY = monster.dieY;
    monster.stopX = monster.endX;
    monster.stopY = monster.endY;
    monster.currentX = monster.startX;
    monster.currentY = monster.startY;
}

/**
 * Function refresh Monster 9
 * @param {Monster} monster 
 */
function refreshMonsterNine(monster) {
    monsterNine.show = false;
    monsterNine.startX = Math.floor(Math.random() * 400) + 1;
    monsterNine.startY = Math.floor(Math.random() * 400) + 1;
    monsterNine.stopX = Math.floor(Math.random() * 400) + 1;
    monsterNine.stopY = Math.floor(Math.random() * 400) + 1;
    monsterNine.currentX = Math.floor(Math.random() * 400) + 1;
    monsterNine.currentY = Math.floor(Math.random() * 400) + 1;
}

/**
 * Function choose random monster to run
 */
function chooseShowMonster() {
    if (!monsterOne.show) {
        refreshMonster(monsterOne);
    }
    if (!monsterTwo.show) {
        refreshMonster(monsterTwo);
    }
    if (!monsterThree.show) {
        refreshMonster(monsterThree);
    }
    if (!monsterFour.show) {
        refreshMonster(monsterFour);
    }
    if (!monsterFive.show) {
        refreshMonster(monsterFive);
    }
    if (!monsterSix.show) {
        refreshMonster(monsterSix);
    }
    if (!monsterSeven.show) {
        refreshMonster(monsterSeven);
    }
    if (!monsterEight.show) {
        refreshMonster(monsterEight);
    }
    if (!monsterNine.show) {
        refreshMonsterNine(monsterNine);
    }

    randomMonster();
}

/**
 * function Random Monster
 */
function randomMonster() {
    let randomNumber = Math.floor(Math.random() * 9) + 1;
    switch (randomNumber) {
        case 1:
            if (!monsterOne.show) {
                monsterOne.show = true;
            }
            break;
        case 2:
            if (!monsterTwo.show) {
                monsterTwo.show = true;
            }
            break;
        case 3:
            if (!monsterThree.show) {
                monsterThree.show = true;
            }
            break;
        case 4:
            if (!monsterFour.show) {
                monsterFour.show = true;
            }
            break;
        case 5:
            if (!monsterFive.show) {
                monsterFive.show = true;
            }
            break;
        case 6:
            if (!monsterSix.show) {
                monsterSix.show = true;
            }
            break;
        case 7:
            if (!monsterSeven.show) {
                monsterSeven.show = true;
            }
            break;
        case 8:
            if (!monsterEight.show) {
                monsterEight.show = true;
            }
            break;
        case 9:
            if (!monsterNine.show) {
                monsterNine.show = true;
            }
            break;
    }
}

/**
 * Function update Monster 1->8
 * @param {Monster} monster 
 */
function updateMonster(monster) {
    if (monster.currentX < monster.stopX) {
        monster.currentX += speed;
    } else if (monster.currentX > monster.stopX) {
        monster.currentX -= speed;
    }
    if (monster.currentY < monster.stopY) {
        monster.currentY += speed;
    } else if (monster.currentY > monster.stopY) {
        monster.currentY -= speed;
    }
    if (monster.currentX == monster.stopX && monster.currentY == monster.stopY) {
        let temp = monster.stopX;
        monster.stopX = monster.startX;
        monster.startX = temp;
        temp = monster.stopY;
        monster.stopY = monster.startY;
        monster.startY = temp;
    }
    if (monster.currentX == monster.dieX && monster.currentY == monster.dieY) {
        score -= 10;
        heart--;
        refreshMonster(monster);
        chooseShowMonster();
    }
}

/**
 * Function update monster 9
 * @param {Monster} monster 
 */
function updateMonsterNine(monster) {
    if (monster.currentX < monster.stopX) {
        monster.currentX += speed;
    } else if (monster.currentX > monster.stopX) {
        monster.currentX -= speed;
    }
    if (monster.currentY < monster.stopY) {
        monster.currentY += speed;
    } else if (monster.currentY > monster.stopY) {
        monster.currentY -= speed;
    }
    if (monster.currentX == monster.stopX && monster.currentY == monster.stopY) {
        score -= 10;
        heart--;
        refreshMonsterNine();
        chooseShowMonster();
    }
}


/**
 * Function add blood to list when monster was clicked
 * @param {number} x 
 * @param {number} y 
 */
function addBlood(x, y) {
    let bloods = {
        x: x,
        y: y
    }
    listBlood[listBlood.length] = bloods;
}

/**
 *  Function draw blood image
 */
function drawBlood() {
    if (listBlood.length > 0) {
        for (let i = 0; i < listBlood.length; i++) {
            contextCanvas.drawImage(bloodImage, listBlood[i].x, listBlood[i].y);
        }
    }
    if (isStop) {
        if (isRun) {
            isRun = false;
            isStop = true;

        }
    }
}

/**
 * Function execute click button Boom 
 * @param {Monster} monster 
 */
function executeBoomClick(monster) {
    if (monster.show) {
        score -= 10;
        executeMonsterClick(monster, monster.currentX, monster.currentY);
    }
}

/**
 * Function execute click monster
 * @param {Monster} monster 
 * @param {number} locationX 
 * @param {number} locationY 
 */
function executeMonsterClick(monster, locationX, locationY) {
    if (locationX >= monster.currentX && locationX <= monster.currentX + 100 && locationY >= monster.currentY && locationY <= monster.currentY + 100) {
        score += 50;
        addBlood(monster.currentX, monster.currentY);
        refreshMonster(monster);
        if (!isBoom) {
            for (let i = 0; i < numberMonsterShow; i++) {
                chooseShowMonster();
            }
        }
    }
}

/**
 * Function execute click buttton Boom
 */
function btnBoomClick() {
    isBoom = true;
    boom--;
    executeBoomClick(monsterOne);
    executeBoomClick(monsterTwo);
    executeBoomClick(monsterThree);
    executeBoomClick(monsterFour);
    executeBoomClick(monsterFive);
    executeBoomClick(monsterSix);
    executeBoomClick(monsterSeven);
    executeBoomClick(monsterEight);
    executeBoomClick(monsterNine);
    isBoom = false;
    for (let i = 0; i < numberMonsterShow; i++) {
        chooseShowMonster();
    }
    if (!isRun) {
        drawAction();
        drawMonster();
    }
}

/**
 * Function execute click buttton Stop
 */
function btnStopClick() {
    if (stop === 0) {
        lastStop = true;
    }
    if (isRun) {
        stop--;
        isRun = false;
        isStop = true;
        contextCanvas.fillStyle = "#FFFFFF";
        contextCanvas.font = "50px Arial";
        contextCanvas.fillText("Stop", 180, 240);
    } else {
        isRun = true;
        isStop = false;
        playGame();
    }
}

/**
 * Function execute click button Pause
 */
function btnPauseClick() {
    if (isRun) {
        isRun = false;
        isPause = true;
        isBoom = false;
        contextCanvas.fillStyle = "#FFFFFF";
        contextCanvas.font = "50px Arial";
        contextCanvas.fillText("Pause", 180, 240);
    } else {
        isRun = true;
        isPause = false;
        playGame();
    }
}

/**
 * Function execute click button Restart 
 */
function btnRestartClick() {
    setting();
    refreshMonster(monsterOne);
    refreshMonster(monsterTwo);
    refreshMonster(monsterThree);
    refreshMonster(monsterFour);
    refreshMonster(monsterFive);
    refreshMonster(monsterSix);
    refreshMonster(monsterSeven);
    refreshMonster(monsterEight);
    refreshMonsterNine();
    monsterOne.show = true;
    playGame();
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

/**
 * Add event Listener click in canvas Content
 */
canvas.addEventListener("click", function (e) {
    if (isRun) {
        locationX = e.pageX - this.offsetLeft;
        locationY = e.pageY - this.offsetTop;
        score -= 10;
        if (monsterOne.show) {
            executeMonsterClick(monsterOne, locationX, locationY);
        }
        if (monsterTwo.show) {
            executeMonsterClick(monsterTwo, locationX, locationY);
        }
        if (monsterThree.show) {
            executeMonsterClick(monsterThree, locationX, locationY);
        }
        if (monsterFour.show) {
            executeMonsterClick(monsterFour, locationX, locationY);
        }
        if (monsterFive.show) {
            executeMonsterClick(monsterFive, locationX, locationY);
        }
        if (monsterSix.show) {
            executeMonsterClick(monsterSix, locationX, locationY);
        }
        if (monsterSeven.show) {
            executeMonsterClick(monsterSeven, locationX, locationY);
        }
        if (monsterEight.show) {
            executeMonsterClick(monsterEight, locationX, locationY);
        }
        if (monsterNine.show) {
            executeMonsterClick(monsterNine, locationX, locationY);
        }
    }
});

/**
 * Function play with current level
 */
function playLevel() {
    level = Math.floor(score / 50);
    switch (level) {
        case 1:
            numberMonsterShow = 1;
            break;
        case 2:
            numberMonsterShow = 2;
            break;
        case 3:
            numberMonsterShow = 3;
            break;
        case 4:
            numberMonsterShow = 4;
            break;
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
            numberMonsterShow = 5;
            break;
    }
}

/**
 * Function draw all buttons in canvas action
 */
function drawAction() {
    contextAction.clearRect(0, 0, action.width, action.height);
    contextAction.fillStyle = "rgba(255,255,255,.87)";
    contextAction.font = "20px Arial";
    contextAction.fillText("Score:" + score, 10, 30);
    contextAction.fillText("Random M: " + numberMonsterShow, 300, 30);
    contextAction.fillText("Heart:", 10, 60);
    contextAction.fillText("Speed:" + speed, 10, 90);

    let temp = 0;
    for (let i = 0; i < heart; i++) {
        contextAction.drawImage(heartImage, (70 + temp), 45, 20, 20);
        temp += 20;
    }

    contextAction.drawImage(boomImage, boomButton.startX, boomButton.startY, boomButton.width, boomButton.height);
    contextAction.drawImage(stopImage, stopButton.startX, stopButton.startY, stopButton.width, stopButton.height);
    contextAction.drawImage(pauseImage, pauseButton.startX, pauseButton.startY, pauseButton.width, pauseButton.height);
    contextAction.drawImage(restartImage, restartButton.startX, restartButton.startY, restartButton.width, restartButton.height);
    contextAction.fillStyle = "#000";
    contextAction.font = "35px Arial";
    contextAction.fillText(boom, 260, 70);
    contextAction.fillText(stop, 320, 70);
}

/**
 * Function draw monster
 */
function drawMonster() {
    contextCanvas.drawImage(backgroundImage, 0, 0);
    drawBlood();
    if (monsterOne.show) {
        contextCanvas.drawImage(monsterImage, monsterOne.currentX, monsterOne.currentY, 100, 100);
    }
    if (monsterTwo.show) {
        contextCanvas.drawImage(monsterImage, monsterTwo.currentX, monsterTwo.currentY, 100, 100);
    }
    if (monsterThree.show) {
        contextCanvas.drawImage(monsterImage, monsterThree.currentX, monsterThree.currentY, 100, 100);
    }
    if (monsterFour.show) {
        contextCanvas.drawImage(monsterImage, monsterFour.currentX, monsterFour.currentY, 100, 100);
    }
    if (monsterFive.show) {
        contextCanvas.drawImage(monsterImage, monsterFive.currentX, monsterFive.currentY, 100, 100);
    }
    if (monsterSix.show) {
        contextCanvas.drawImage(monsterImage, monsterSix.currentX, monsterSix.currentY, 100, 100);
    }
    if (monsterSeven.show) {
        contextCanvas.drawImage(monsterImage, monsterSeven.currentX, monsterSeven.currentY, 100, 100);
    }
    if (monsterEight.show) {
        contextCanvas.drawImage(monsterImage, monsterEight.currentX, monsterEight.currentY, 100, 100);
    }
    if (monsterNine.show) {
        contextCanvas.drawImage(monsterImage, monsterNine.currentX, monsterNine.currentY, 100, 100);
    }
}

/**
 * Function game over
 */
function gameOver() {
    isRun = false;
    isPause = true;
    isStop = true;
    contextCanvas.fillStyle = "#FFFFFF";
    contextCanvas.font = "40px Arial";
    contextCanvas.fillText("Game over", 130, 200);
    contextCanvas.font = "20px Arial";
    contextCanvas.fillStyle = "#FFFFFF";
    contextCanvas.fillText("Score = " + score, 130, 240);
    contextCanvas.fillText("Best score = " + localStorage.getItem("bestscore"), 130, 280);
}

/**
 * Function play game
 */
function playGame() {
    if (heart <= 0 || score <= 0) {
        let tmp = parseInt(localStorage.getItem("bestscore") === null ? 0: localStorage.getItem("bestscore"));
        if (tmp <= score) {
            localStorage.setItem("bestscore", score);
        }
        gameOver();
        return;
    } else if (isRun) {
        let dayNow = Date.now();
        let diffTime = dayNow - lastUpdateTime;
        if (diffTime >= TICKS) {
            playLevel();
            if (monsterOne.show) {
                updateMonster(monsterOne);
            }
            if (monsterTwo.show) {
                updateMonster(monsterTwo);
            }
            if (monsterThree.show) {
                updateMonster(monsterThree);
            }
            if (monsterFour.show) {
                updateMonster(monsterFour);
            }
            if (monsterFive.show) {
                updateMonster(monsterFive);
            }
            if (monsterSix.show) {
                updateMonster(monsterSix);
            }
            if (monsterSeven.show) {
                updateMonster(monsterSeven);
            }
            if (monsterEight.show) {
                updateMonster(monsterEight);
            }
            if (monsterNine.show) {
                updateMonsterNine(monsterNine);
            }
            drawMonster();
            drawAction();
            lastUpdateTime = dayNow;
        }
        requestAnimationFrame(playGame);
    }
}

(function init() {
    setting();
    playGame();
})();