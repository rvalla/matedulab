let state;
let lastclick;
let signal_1;
let signal_2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  getAudioContext().suspend();
  state = -1;
  lastclick = 0;
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

function mousePressed() {
  if (500 < millis() - lastclick) {
    switch (state): {
      case -1:
        userStartAudio();
        signal_1 = new p5.Oscillator('sine');
        signal_2 = new p5.Oscillator('sine');
        signal_1.amp(0.4);
        signal_2.amp(0.4);
        signal_1.start();
        signal_2.start();
        state = 1;
        break;
      case 0:
        signal_1.start();
        signal_2.start();
        state = 1;
        break;
      case 1:
        signal_1.stop();
        signal_2.stop();
        state = 0;
        break;
    }
    lastclick = millis();
  }
}
