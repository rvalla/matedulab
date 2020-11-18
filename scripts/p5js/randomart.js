let state;
let lastclick;
let startTime;
let artTime;
let speedV;
let isFixed;
let maxXspeed;
let minXspeed;
let maxYspeed;
let minYspeed;
let dotscount;
let dots = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
	background(getCColor());
	config = getURLParams();
  startConfig(config);
	state = 0;
	lastclick = 0;
	startTime = 0;
  for (let d = 0; d < dotscount; d++){
    dots.push(new dot(getColor()));
		dots[d].d = dots[d].d * (random(0.5) + 0.5);
		if (isFixed === false) {
			dots[d].updateP(random(width - 50) + 25, random(height - 50) + 25)
		}
		dots[d].display();
  }
}

function draw() {
	if (state === 1) {
		for (let d = 0; d < dotscount; d++){
	    dots[d].update(getMX(), getMY());
	    dots[d].display();
	  }
		checkTime();
	}
	print(startTime);
}

function checkTime(){
	if (millis() > artTime + startTime) {
		state = 0;
		saveCanvas("artealeatorio.jpg");
	}
}

function getMX(){
  return random(minXspeed, maxXspeed);
}

function getMY(){
  return random(minYspeed, maxYspeed);
}

function resetDots(){
  for (let d = 0; d < dotscount; d++){
    dots[d].reset();
  }
}

function mousePressed(){
	if (500 < millis() - lastclick) {
		if (state === 0) {
			startTime = millis();
			state = 1;
		} else if (state === 1) {
			mapLimits(mouseX, mouseY);
			lastclick = millis();
		}
  }
}

function mapLimits(xl, yl){
  minXspeed = map(xl, 0, windowWidth, -speedV, 0);
  minYspeed = map(yl, 0, windowHeight, -speedV, 0);
  maxXspeed = minXspeed + speedV;
  maxYspeed = minYspeed + speedV;
}

function getColor() {
    let r = second() + 30 + random(160);
    let b = minute() + 30 + random(160);
		let g = hour() + 30 + random(200);
    return color(r, g, b);
}

function getCColor() {
    let r = second();
    let g = hour() * 3;
    let b = minute();
    return color(r, g, b);
}

function startConfig(config) {
  let number = Number(config.dots);
  if (typeof(number) === "number" && Number.isInteger(number)) {
    dotscount = number;
  } else {
   	dotscount = 20;
  }
  number = Number(config.speed);
  if (typeof(number) === "number" && Number.isInteger(number)) {
    speedV = number;
  } else {
    speedV = 6;
  }
	number = Number(config.time);
  if (typeof(number) === "number" && Number.isInteger(number)) {
    artTime = number;
  } else {
    artTime = 5000;
  }
	let string = config.fixed;
  if (typeof string === "string" && string === "false") {
    isFixed = false;
  } else {
    isFixed = true;
  }
	maxXspeed = speedV / 2;
	minXspeed = 0 - maxXspeed;
	maxYspeed = speedV / 2;
	minYspeed = 0 - maxYspeed;
}
