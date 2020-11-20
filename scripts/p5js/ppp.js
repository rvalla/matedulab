let matedulab, banner, logosize;
let margin, xcenter, ycenter, dicew, diceh, facew;
let rock, paper, scissors;
let b;
let title;
let levellabel;
let lastclick;
let level;
let cdice, pdice, cface, pface, cpoint, ppoints;
let fontb, font;
let colors;

function preload() {
	matedulab = loadImage('p5js/assets/img/matedulab.png');
	banner = loadImage('p5js/assets/img/banner.png');
	rock = loadImage('p5js/assets/img/stone.png');
	paper = loadImage('p5js/assets/img/paper.png');
	scissors = loadImage('p5js/assets/img/scissors.png');
	font = loadFont('p5js/assets/fonts/Comfortaa_Regular.ttf');
	fontb = loadFont('p5js/assets/fonts/Comfortaa_Bold.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
	background(200);
	margin, dicew, diceh, facew = 0;
	xcenter = width / 2;
	ycenter = height / 2;
	config = getURLParams();
  startConfig(config);
	colors = [];
	colors[0] = color(180, 5, 125);
	colors[1] = color(250, 5, 180);
	colors[2] = color(22, 125, 180);
	colors[3] = color(36, 180, 255);
	colors[4] = color(250, 200, 5);
	colors[5] = color(255, 240, 5);
	buildInterface();
	displayBanner();
	textAlign(CENTER, CENTER);
	textFont(fontb);
}

function getScreen() {
	background(200);
	printTexts();
	b.display(0, 0);
	image(matedulab, width - logosize - 10, height - logosize - 10, logosize, logosize);
	cface.display();
	pface.display();
	cdice.display();
	pdice.display();
}

function mousePressed(){
	if (300 < millis() - lastclick) {
		switch (level) {
			case 0:
				level += 1;
				getScreen();
				break;
			case 1:
				if (b.contains(mouseX, mouseY)) {
					cface.setActiveFace((cface.active + 1)%3);
					pface.setActiveFace((pface.active + 2)%3);
					getScreen();
				} else if (pdice.contains(mouseX, mouseY)) {
					pdice.setRandomFaces();
				}
				getScreen();
				break;
		}
			lastclick = millis();
  }
}

function startConfig(config) {
	lastclick = 0;
	if (width > height) {
		logosize = width / 15;
	} else {
		logosize = height / 15;
	}
  let number = Number(config.level);
  if (typeof(number) === "number" && Number.isInteger(number)) {
    level = number;
  } else {
   	level = 0;
  }
	let string = config.lan;
  if (typeof string === "string" && string === "eng") {
    title = "Rock, scissors and probabilities";
		levellabel = "Level: ";
  } else {
		title = "Piedra, papel y probabilidades";
		levellabel = "Nivel: ";
  }
}

function printTexts() {
	textSize(map(width, 300, 1200, 20, 40));
	fill(colors[0]);
	text(title, width / 2, 30);
	textSize(map(width, 300, 1200, 15, 30));
	fill(colors[2]);
	text(levellabel + str(level), width / 2, 30 + map(width, 300, 1200, 25, 40));
}

function buildInterface() {
	if (width > height) {
		margin = width / 8;
		dicew = xcenter - 2 * margin;
		diceh = dicew * 0.75;
		facew = dicew / 2;
		cface = new diceface(rock, paper, scissors, facew, xcenter + margin, margin);
		pface = new diceface(rock, paper, scissors, facew, xcenter + margin, margin + dicew/2 + 20);
		cdice = new dice(rock, paper, scissors, dicew, diceh, margin, margin, 1);
		pdice = new dice(rock, paper, scissors, dicew, diceh, margin, margin + diceh + 10, 1);
	} else {
		margin = width / 25;
		dicew = xcenter - 2 * margin;
		diceh = dicew * 0.75;
		facew = dicew / 2;
		let vp = height/2.25;
		cface = new diceface(rock, paper, scissors, facew, margin + dicew / 4, margin + vp);
		pface = new diceface(rock, paper, scissors, facew, xcenter + dicew / 4, margin + vp);
		cdice = new dice(rock, paper, scissors, dicew, diceh, margin, 130, 1);
		pdice = new dice(rock, paper, scissors, dicew, diceh, 2 * margin + dicew, 130, 1);
	}
	b = new button(width / 2, 7 * height / 8, height / 20, colors[2], colors[4], "", colors[0]);
}

function displayBanner() {
	iw = width * 0.7;
	ih = iw * 0.56;
	image(banner, (width - iw) / 2, (height - ih) / 2, iw, ih);
}
