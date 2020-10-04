let melodies = [];
let colors = [];
let activem = 0;

function setup() {
  melodies[0] = loadSound('assets/audio/MelodíaA_0.mp3');
  melodies[0] = loadSound('assets/audio/MelodíaA_1.mp3');
  melodies[0] = loadSound('assets/audio/MelodíaA_2.mp3');
  colors[0] = color(22, 125, 180);
  colors[1] = color(180, 0, 125);
  colors[2] = color(250, 200, 0);
  createCanvas(windowWidth, windowHeight);
  background(colors[0]);
}

function mousePressed() {
  if (melodies[activem].isPlaying()){
    melodies[activem].stop();
  } else {
    activem = (activem + 1) % 3;
    background(colors[activem]);
    melodies[activem].play();
  }
}
