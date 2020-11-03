let melodies = [];
let colors = [];
let activem;
let state;
let lastclick;

function preload() {
  melodies.push(new loadSound('../assets/audio/MelodyA_0.mp3'));
  melodies.push(new loadSound('../assets/audio/MelodyA_1.mp3'));
  melodies.push(new loadSound('../assets/audio/MelodyA_2.mp3'));
}

function setup() {
  getAudioContext().suspend();
  createCanvas(windowWidth, windowHeight);
  state = -1;
  activem = 0;
  lastclick = 0;
  colors[0] = color(22, 125, 180);
  colors[1] = color(180, 0, 125);
  colors[2] = color(250, 200, 0);
	background(colors[0]);
}

function mousePressed() {
  if (500 < millis() - lastclick) {
    switch (state) {
      case 0:
        if (melodies[activem].isPlaying()){
          melodies[activem].stop();
          activem = (activem + 1) % 3;
        } else {
          background(colors[activem]);
          melodies[activem].play();
        }
        break;
      case -1:
        userStartAudio();
        state = 0;
    }
		lastclick = millis();
  }
}
