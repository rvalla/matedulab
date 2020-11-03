let b;
let lastclick;
let speedV = 6;
let maxXspeed = 3;
let minXspeed = -3;
let maxYspeed = 3;
let minYspeed = -3;
let dotscount = 20;
let dots = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
	lastclick = 0;
	b = new button(width / 2, 7 * height / 8, getButtonR(), color(250, 230, 0), color(250, 5, 180), "", color(200));
  for (let d = 0; d < dotscount; d++){
    dots.push(new dot(getColor()));
  }
}

function draw() {
  background(22, 125, 180, 30);
	b.display(mouseX, mouseY);
  for (let d = 0; d < dotscount; d++){
    dots[d].update(getMX(), getMY());
    dots[d].display();
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
    if (b.contains(mouseX, mouseY)) {
			for (let d = 0; d < dotscount; d++){
		    dots[d].reset();
		  }
		} else {
			mapLimits(mouseX, mouseY);
		}
		lastclick = millis();
  }
}

function mapLimits(xl, yl){
  minXspeed = map(xl, 0, windowWidth, -speedV, 0);
  minYspeed = map(yl, 0, windowHeight, -speedV, 0);
  maxXspeed = minXspeed + speedV;
  maxYspeed = minYspeed + speedV;
}

function getColor(){
  let c = random();
  if (c < 0.5){
    return color(250, 230, 0);
  } else {
    return color(250, 5, 180);
  }
}

function getButtonR() {
  if (width > height) {
    return round(height / 25);
  } else {
    return round(width / 20);
  }
}
