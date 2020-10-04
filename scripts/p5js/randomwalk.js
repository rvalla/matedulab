let speedV = 6;
let maxXspeed = 3;
let minXspeed = -3;
let maxYspeed = 3;
let minYspeed = -3;
let dotscount = 20;
let dots = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let d = 0; d < dotscount; d++){
    dots.push(new dot(getColor()));
  }
}

function draw() {
  background(22, 125, 180, 30);
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

function mouseClicked() {
  mapLimits(mouseX, mouseY);
}

function mapLimits(xl, yl){
  minXspeed = map(xl, 0, windowWidth, -speedV, 0);
  minYspeed = map(yl, 0, windowHeight, -speedV, 0);
  maxXspeed = minXspeed + speedV;
  maxYspeed = minYspeed + speedV;
}

function mouseDragged(){
  for (let d = 0; d < dotscount; d++){
    dots[d].reset();
  }
}

function getColor(){
  let c = random();
  if (c < 0.5){
    return color(250, 230, 0);
  } else {
    return color(250, 5, 180);
  }
}
