let melodies = [];
let colors = [];
let activem = 0;

function preload() {
  melodies.push(new loadSound('/matedulab/assets/audio/MelodyA_0.mp3'));
  melodies.push(new loadSound('/matedulab/assets/audio/MelodyA_1.mp3'));
  melodies.push(new loadSound('/matedulab/assets/audio/MelodyA_2.mp3'));
}

function setup() {
  colors[0] = color(22, 125, 180);
  colors[1] = color(180, 0, 125);
  colors[2] = color(250, 200, 0);
  createCanvas(windowWidth, windowHeight);
  background(colors[0]);
}

function mousePressed() {
  if (melodies[(activem - 1) % 3].isPlaying()){
    melodies[activem].stop();
  } else {
    background(colors[activem]);
    melodies[activem].play();
    activem = (activem + 1) % 3;
  }
}
