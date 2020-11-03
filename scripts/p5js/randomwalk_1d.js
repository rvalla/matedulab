let b;
let lastclick;
let speedV = 6;
let maxXspeed = 3;
let minXspeed = -3;
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
	b.display(mouseX, mouseY)
  for (let d = 0; d < dotscount; d++){
    dots[d].update(getMX(), 0);
    dots[d].display();
  }
}

function getMX(){
  return random(minXspeed, maxXspeed);
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
			mapLimit(mouseX);
		}
		lastclick = millis();
  }
}

function mapLimit(xl){
  minXspeed = map(xl, 0, windowWidth, -speedV, 0);
  maxXspeed = minXspeed + speedV;
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
