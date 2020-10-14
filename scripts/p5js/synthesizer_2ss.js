let melodies = [];
let colors = [];
let activem = 0;
let signal_1 = new p5.Oscillator('sine');
let signal_2 = new p5.Oscillator('sine');

function setup() {
  createCanvas(windowWidth, windowHeight);
  signal_1.amp(0.4);
  signal_2.amp(0.4);
  signal_1.start();
  signal_2.start();
}

function draw(){
  background(22, 125, 180);
  signal_1.freq(map(mouseX, 0, width, 220, 880));
  signal_2.freq(map(mouseY, 0, height, 220, 880));
  fill(180, 0 , 125, map(mouseX, 0, width, 0, 255));
  rect(0, 0, width, height);
  fill(250, 200 , 0, map(mouseY, 0, height, 0, 255));
  rect(0, 0, width, height);
}
