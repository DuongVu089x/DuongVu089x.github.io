var canvas = document.getElementById("canvas");
var context_canvas = canvas.getContext("2d");

var action = document.getElementById("action");
var context_action = action.getContext("2d");
//game control
var speed = 1;
var level = 1;
var score = 50;
var numberMonsterShow;
var bestscore = 50;
var listBlood = new Array();
var boom = 3;
var stop = 3;
var heart = 5;
var isBoom = false;
var isStop = false;
var isPause = false;
var isRun = true;
var fps = 144;
var ticks = 1000/fps;
var timeOut;
// Check highscore

//create background image
var background_image = new Image();
background_image.onload = function() {};
background_image.src = "image/background.jpg";

//create monster image
var monster_image = new Image();
monster_image.onload = function() {};
monster_image.src = "image/monster.jpg";

//create blood monster
var blood_image = new Image();
blood_image.onload = function() {};
blood_image.src = "image/blood.png";

//create heart image
var heart_image = new Image();
heart_image.onload = function() {};
heart_image.src = "image/heart.png";

//Create all buttons as boom, stop, pause, refresh
//create boom button
var boom_image = new Image();
boom_image.onload = function() {};
boom_image.src = "image/boom.jpg";
var boom_button = {
	startX: 290,
	startY: 60,
	stopX: 340,
	stopY: 100,
	height: 50,
	width: 40
}

//create stop button
var stop_image = new Image();
stop_image.onload = function() {};
stop_image.src = "image/stop.png";
var stop_button = {
	startX: 350,
	startY: 60,
	stopX: 400,
	stopY: 100,
	height: 50,
	width: 40
}

//create pause button
var pause_image = new Image();
pause_image.onload = function() {};
pause_image.src = "image/pause.png";
var pause_button = {
	startX: 410,
	startY: 60,
	stopX: 460,
	stopY: 100,
	height: 50,
	width: 40
}

//create restart button
var restart_image = new Image();
restart_image.onload = function() {};
restart_image.src = "image/restart.png";
var restart_button = {
	startX: 470,
	startY: 60,
	stopX: 520,
	stopY: 100,
	height: 50,
	width: 40
}

//Define 
var classCommon = function(method) {
	var classTmpCommon = function() {
		this.initialize.apply(this, arguments);
	};
	for( var property in method) {
		classTmpCommon.prototype[property] = method[property];
	}
	if(!classTmpCommon.prototype.initialize) {
		classTmpCommon.prototype.initialize = function() {};
	}
	return classTmpCommon;
}

//create class Monster
var Monster = classCommon({
	initialize: function(startX, startY, stopX, stopY, currentX, currentY, click, show, dieX, dieY, endX, endY, number) {
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
});

//create all monster
var monsterOne = new Monster(0,0,100,100,0,0,false,true,0,0,100,100,1);
var monsterTwo = new Monster(200,0,200,100,200,0,false,false,200,0,200,100,2);
var monsterThree = new Monster(400,0,300,100,400,0,false,false,400,0,300,100,3);
var monsterFour = new Monster(400,200,300,200,400,200,false,false,4000,200,300,200,4);
var monsterFive = new Monster(400,400,300,300,400,400,false,false,400,400,300,300,5);
var monsterSix = new Monster(200,400,200,300,200,400,false,false,200,400,200,300,6);
var monsterSeven = new Monster(0,400,100,300,0,400,false,false,0,400,100,300,7);
var monsterEight = new Monster(0,200,100,200,0,200,false,false,0,200,100,200,8);
var math = Math.floor(Math.random()*400 + 1);
var monsterNine = new Monster(math,math,math,math,math,math,false,false,0,0);

function refreshMonster(monster) {
	monster.show = false;
		monster.startX = monster.dieX;
		monster.startY = monster.dieY;
		monster.stopX = monster.endX;
		monster.stopY = monster.endY;
		monster.currentX = monster.startX;
		monster.currentY = monster.startY;
}


//
function refreshMonsterNine(monster) {
	monsterNine.show = false;
	monsterNine.startX = Math.floor(Math.random()*400 +1);
	monsterNine.startY = Math.floor(Math.random()*400 +1);
	monsterNine.stopX = Math.floor(Math.random()*400 +1);
	monsterNine.stopY = Math.floor(Math.random()*400 +1);
	monsterNine.currentX = Math.floor(Math.random()*400 +1);
	monsterNine.currentY = Math.floor(Math.random()*400 +1)
}

//Choose monster to run
function chooseShowMonster() {
	if(!monsterOne.show) {
		refreshMonster(monsterOne);
	}
	if(!monsterTwo.show) {
		refreshMonster(monsterTwo);
	}
	if(!monsterThree.show) {
		refreshMonster(monsterThree);
	}
	if(!monsterFour.show) {
		refreshMonster(monsterFour);
	}
	if(!monsterFive.show) {
		refreshMonster(monsterFive);
	}
	if(!monsterSix.show) {
		refreshMonster(monsterSix);
	}
	if(!monsterSeven.show) {
		refreshMonster(monsterSeven);
	}
	if(!monsterEight.show) {
		refreshMonster(monsterEight);
	}
	if(!monsterNine.show) {
		refreshMonsterNine(monsterNine);
	}
	var randomNumber = Math.floor(Math.random() * 9 + 1);
	switch(randomNumber) {
		case 1: {
			if(!monsterOne.show) {
				monsterOne.show = true;
			}
			break;
		}
		case 2: {
			if(!monsterTwo.show) {
				monsterTwo.show = true;
			}
			break;
		}
		case 3: {
			if(!monsterThree.show) {
				monsterThree.show = true;
			}
			break;
		}
		case 4: {
			if(!monsterFour.show) {
				monsterFour.show = true;
			}
			break;
		}
		case 5: {
			if(!monsterFive.show) {
				monsterFive.show = true;
			}
			break;
		}
		case 6: {
			if(!monsterSix.show) {
				monsterSix.show = true;
			}
			break;
		}
		case 7: {
			if(!monsterSeven.show) {
				monsterSeven.show = true;
			}
			break;
		}
		case 8: {
			if(!monsterEight.show) {
				monsterEight.show = true;
			}
			break;
		}
		case 9: {
			if(!monsterNine.show) {
				monsterNine.show = true;
			}
			break;
		}
	}
}

//updateMonster 1->8
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
		var temp = monster.stopX;
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
//update monster 9
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
		score -=10;
		heart--;
		refreshMonsterNine();
		chooseShowMonster();
	}
}



//add blood when monster was clicked
function addBlood(x,y) {
	var bloods = {
		x: x,
		y: y
	}
	listBlood[listBlood.length] = bloods;
}
//draw blood image
function drawBlood() {
	if(listBlood.length > 0) {
		for(var i = 0; i < listBlood.length; i++) {
			context_canvas.drawImage(blood_image,listBlood[i].x,listBlood[i].y);
		}
	}
	if(isStop) {
		if (isRun) {
				isRun = false;
				isStop = true;
				
		}
		timeOut = setTimeout(function() {
			isRun = true;
			isStop = false;
			main();
		},8000);
	}
}
//execute Boom button click
function executeBoomClick(monster) {
	if(monster.show) {
		score-=10;
		executeMonsterClick(monster,monster.currentX,monster.currentY);
	}
}
//execute monster click
function executeMonsterClick(monster, locationX, locationY) {
	if(isStop) {
			clearTimeout(timeOut);
	}
	if (locationX >= monster.currentX && locationX <= monster.currentX + 100) {
		if (locationY >= monster.currentY && locationY <= monster.currentY +100) 		{
			score+=50;
			addBlood(monster.currentX,monster.currentY);
			refreshMonster(monster);
			if(!isBoom) {
				for(var i = 0; i < numberMonsterShow; i++) {
					chooseShowMonster();
				}
			}
		}
	}
	if(isStop) {
	
		isRun = true;
		main();
	}
}
//action
action.addEventListener("click", function(e) {
	locationX = e.pageX - this.offsetLeft;
	locationY = e.pageY - this.offsetTop;
	//when click button boom
	if(locationX >= boom_button.startX && locationX<= boom_button.stopX && !isPause) {
		if(locationY >= boom_button.startY && boom_button.stopY) {
			if(boom > 0) {
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
			}
			isBoom = false;
			for( var i = 0; i < numberMonsterShow; i++ ) {
				chooseShowMonster();
			}
		}
	}
	//when click button stop
	if(locationX >= stop_button.startX && locationX<= stop_button.stopX && !isPause) {
		if(locationY >= stop_button.startY && stop_button.stopY && stop > 0) {
			if (isRun) {
				isRun = false;
				isStop = true;
				stop--;
			}
			timeOut = setTimeout(function() {
				isRun = true;
				isStop = false;
				main();
			},5000);
		}
	}
	//when click button pause
	if(locationX >= pause_button.startX && locationX<= pause_button.stopX && !isStop) {
		if(locationY >= pause_button.startY && pause_button.stopY) {
			if(isRun == true) {
				isRun = false;
				isPause = true;
				isBoom = false;
			} else {
				isRun = true;
				isPause = false;
				main();
			}
		}
	}
	//when click button restart
	if(locationX >= restart_button.startX && locationX<= restart_button.stopX) {
		if(locationY >= restart_button.startY && restart_button.stopY) {
			setTimeout(function() {
			speed = 1;
			level = 1;
			numberMonsterShow = 2;
			score = 50;
			listBlood = new Array();
			boom = 3;
			stop = 3;
			heart = 5;
			isStop = false;
			isPause = false;
			isRun = true;
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
			main();

			},1000);
		}
	}
});
//canvas
canvas.addEventListener("click",function(e) {
	if (!isPause || isStop) {
		locationX = e.pageX - this.offsetLeft;
		locationY = e.pageY - this.offsetTop;
		score -=10;
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
//execute level
function executeLevel() {
	level = Math.floor(score/50);
	switch(level) {
		case 1: {
			numberMonsterShow = 1;
			break;
		}
		case 2: {
			numberMonsterShow = 2;
			break;
		}
		case 3: {
			numberMonsterShow = 3;
			break;
		}
		case 4: {
			numberMonsterShow = 4;
			break;
		}
		case 5: {
			numberMonsterShow = 5;
			break;
		}
		case 6: {
			numberMonsterShow = 5;
			break;
		}
		case 7: {
			numberMonsterShow = 5;
			break;
		}
		case 8: {
			numberMonsterShow = 5;
			break;
		}
		case 9: {
			numberMonsterShow = 5;
			break;
		}

	}
}
//Draw all buttons in div action
function drawAction() {
	context_action.clearRect(0,0,action.width,action.height);
	context_action.fillStyle = "black";
	context_action.font = "20px Arial";
	context_action.fillText("Score:" + score,10,30);
	context_action.fillText("Random M: "+ numberMonsterShow,300,30);
	context_action.fillText("Heart:", 10,60);
	context_action.fillText("Speed:" + speed,10,90);
	var tmp = 0;
	for(var i = 0; i < heart; i++) {
		context_action.drawImage(heart_image,(70 + tmp), 45,20,20);
		tmp+=20;
	}
	context_action.drawImage(boom_image, boom_button.startX, boom_button.startY, boom_button.width, boom_button.height);
	context_action.drawImage(stop_image, stop_button.startX, stop_button.startY, stop_button.width, stop_button.height);
	context_action.drawImage(pause_image, pause_button.startX, pause_button.startY, pause_button.width, pause_button.height);
	context_action.drawImage(restart_image, restart_button.startX, restart_button.startY, restart_button.width, restart_button.height);
	context_action.fillStyle = "#FFFFFF";
	context_action.font = "35px Arial";
	context_action.fillText(boom,300,75);
	context_action.fillText(stop,360,75);
	context_action.fillStyle="#1385C0";
	context_action.font = "20px Arial";
	if(isPause) {
		context_canvas.fillStyle="#FFFFFF";
		context_canvas.font = "50px Arial";
		context_canvas.fillText("Pause",180,240);
	}
	if(isStop) {
		context_canvas.fillStyle="#FFFFFF";
		context_canvas.font = "50px Arial";
		context_canvas.fillText("Stop",180,240);
	}

}

if(typeof(Storage) !== "underfined") {
	localStorage.setItem("bestscore", bestscore);
}
function gameOver(){
	context_canvas.fillStyle = "#FFFFFF";
	context_canvas.font="40px Arial";
	context_canvas.fillText("Game over",130,200);
	context_canvas.font = "20px Arial";
	context_canvas.fillStyle = "green";
	context_canvas.fillText("Score = " +score,130,240);
	context_canvas.fillText("Best score = " + localStorage.getItem("bestscore"),130,280);
}
//draw monster
function drawMonster() {
	context_canvas.drawImage(background_image,0,0);
	drawBlood();
	if(monsterOne.show) {
		context_canvas.drawImage(monster_image,monsterOne.currentX,monsterOne.currentY,100,100);
	}
	if(monsterTwo.show) {
		context_canvas.drawImage(monster_image,monsterTwo.currentX,monsterTwo.currentY,100,100);
	}
	if(monsterThree.show) {
		context_canvas.drawImage(monster_image,monsterThree.currentX,monsterThree.currentY,100,100);
	}
	if(monsterFour.show) {
		context_canvas.drawImage(monster_image,monsterFour.currentX,monsterFour.currentY,100,100);
	}
	if(monsterFive.show) {
		context_canvas.drawImage(monster_image,monsterFive.currentX,monsterFive.currentY,100,100);
	}
	if(monsterSix.show) {
		context_canvas.drawImage(monster_image,monsterSix.currentX,monsterSix.currentY,100,100);
	}
	if(monsterSeven.show) {
		context_canvas.drawImage(monster_image,monsterSeven.currentX,monsterSeven.currentY,100,100);
	}
	if(monsterEight.show) {
		context_canvas.drawImage(monster_image,monsterEight.currentX,monsterEight.currentY,100,100);
	}
	if(monsterNine.show) {
		context_canvas.drawImage(monster_image,monsterNine.currentX,monsterNine.currentY,100,100);
	}
	drawAction();
}
function main() {
	var dayNow = Date.now();
	var diffTime = dayNow - lastUpdateTime;
	if(diffTime>= ticks) {
		executeLevel();
		if(monsterOne.show) {
			updateMonster(monsterOne);
		}
		if(monsterTwo.show) {
			updateMonster(monsterTwo);
		}
		if(monsterThree.show) {
			updateMonster(monsterThree);
		}
		if(monsterFour.show) {
			updateMonster(monsterFour);
		}
		if(monsterFive.show) {
			updateMonster(monsterFive);
		}
		if(monsterSix.show) {
			updateMonster(monsterSix);
		}
		if(monsterSeven.show) {
			updateMonster(monsterSeven);
		}
		if(monsterEight.show) {
			updateMonster(monsterEight);
		}
		if(monsterNine.show) {
			updateMonsterNine(monsterNine);
		}
		drawMonster();
		lastUpdateTime = dayNow;
	}
	var sleepTime = ticks - diffTime;
	if(sleepTime < 0) {
		sleepTime = 0;
	}
	if(score <= 0) {
		gameOver();
		isRun = false;

	}
	 if(heart == 0) {
		var tmp = parseInt(localStorage.getItem("bestscore"));
		if(tmp < score) {
			localStorage.setItem("bestscore",score);
		}
		gameOver();
		isRun = false;
		isPause = false;
	} else {
		if(isRun) {
			requestAnimationFrame(main);
		}
	}
}

//Run game
var lastUpdateTime = Date.now();
var windows = window;
requestAnimationFrame = windows.requestAnimationFrame || windows.webkitRequestAnimationFrame 
						|| windows.msRequestAnimationFrame || windows.mozRequestAnimationFrame;
main();