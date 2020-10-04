let speed = 3;
let dotscount = 10;
let dots = [];
let state = 0;

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
  return m = random(-speed,speed);
}

function getMY(){
  let m = 0;
  if (state === 0){
    m = random(-speed, speed) / 2;
  } else {
    m = random(-speed, speed / 2) / 2;
  }
  return m;
}

function resetDots(){
  for (let d = 0; d < dotscount; d++){
    dots[d].reset();
  }
}

function changeState(){
  if (state === 0){
    state = 1;
  } else {
    state = 0;
  }
}

function mouseClicked() {
  changeState();
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
