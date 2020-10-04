let speedV = 6;
let speedM = 2;
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
  minXspeed = map(xl, 0, windowWidth, -speedV, -speedM);
  minYspeed = map(yl, 0, windowHeight, -speedV, -speedM);
  maxXspeed = minXspeed + speedV;
  maxYspeed = minYspeed + speedV;
  print(minXspeed);
  print(minYspeed);
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
