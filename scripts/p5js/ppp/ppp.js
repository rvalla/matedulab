let matedulab, banner, logosize, titlesize, leveltextsize, leveltextmargin, pointstextsize;
let offsetw, offseth, titleoffset, framew, frameh, regionw, regionh, xcenter, ycenter, dicew, diceh, facew;
let rock, paper, scissors, doubty, doubtf, doubtb;
let title, levellabel, victory, defeat, helpc, helpp;
let lastclick, rolldelay, rollcount;
let level, blocklevels, game, gamestate, gsounds;
let cdice, pdice, cface, pface, cpoints, ppoints;
let fontb, font;
let colors;

function preload() {
	matedulab = loadImage('p5js/ppp/assets/img/matedulab.png');
	banner = loadImage('p5js/ppp/assets/img/banner.png');
	rock = loadImage('p5js/ppp/assets/img/stone.png');
	paper = loadImage('p5js/ppp/assets/img/paper.png');
	scissors = loadImage('p5js/ppp/assets/img/scissors.png');
	doubty = loadImage('p5js/ppp/assets/img/doubt_y.png');
	doubtf = loadImage('p5js/ppp/assets/img/doubt_f.png');
	doubtb = loadImage('p5js/ppp/assets/img/doubt_b.png');
	font = loadFont('p5js/ppp/assets/fonts/Comfortaa_Regular.ttf');
	fontb = loadFont('p5js/ppp/assets/fonts/Comfortaa_Bold.ttf');
}

function setup() {
	getAudioContext().suspend();
  createCanvas(windowWidth, windowHeight);
	game = new thegame();
	cpoints = 0;
	ppoints = 0;
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
	textAlign(CENTER, BOTTOM);
	textFont(fontb);
	print("MatEduLab: Rock, Paper & Probabilities");
	print("version: 0.95");
}

function getScreen() {
	background(200);
	printTexts();
	image(matedulab, width / 2 - logosize / 2, 60 + leveltextmargin + 10, logosize, logosize);
	cface.display();
	pface.display();
	cdice.display();
	pdice.display();
}

function mousePressed(){
	if (300 < millis() - lastclick) {
		switch (gamestate) {
			case 2:
				if (pface.contains(mouseX, mouseY)) {
					updateRollCount()
					play(0);
				}
				getScreen();
				break;
			case 1:
				if (pdice.contains(mouseX, mouseY)) {
					pdice.setFaces(game.getPDice(level));
				} else if (pface.contains(mouseX, mouseY)) {
					updateRollCount()
					play(0);
					gamestate = 1;
				}
				getScreen();
				break;
			case 0:
				cpoints = 0;
				ppoints = 0;
				cdice.setFaces(game.getCDice(level));
				pdice.setFaces(game.getPDice(level));
				cface.active = cdice.faces[game.throwDice()].active;
				pface.active = pdice.faces[game.throwDice()].active;
				gamestate = 1;
				getScreen();
			case -1:
				userStartAudio();
				gsounds = new gamesounds();
				cdice.setFaces(game.getCDice(level));
				pdice.setFaces(game.getPDice(level));
				gamestate = 1;
				getScreen();
				printHelp();
				break;
		}
		lastclick = millis();
  }
}

function play(i) {
	let c = 0;
	let p = 0;
	if (i < rollcount) {
		if (i % 2 === 0) {
			cface.active = (3 + random([0,1,2]));
			pface.active = (3 + random([0,1,2]));
		} else {
			c = game.throwDice();
			p = game.throwDice();
			cface.active = cdice.faces[c].active;
			pface.active = pdice.faces[p].active;
		}
		setTimeout(play, rolldelay, i + 1);
		getScreen();
	} else {
		c = game.throwDice();
		p = game.throwDice();
		cface.active = cdice.faces[c].active;
		pface.active = pdice.faces[p].active;
		let r = game.decide(cdice.faces[c].active, pdice.faces[p].active);
		if (r === 1) {
			ppoints += 1;
			gsounds.playWin();
			print
		} else if (r === -1) {
			cpoints += 1;
			gsounds.playLose();
		}
		getScreen();
		checkLevel();
	}
}

function checkLevel() {
	if (cpoints + ppoints === 7) {
		if (ppoints > cpoints) {
			level += 1;
			if (blocklevels && level > 3) {
				level = 1;
			}
			gamestate = 0;
		} else {
			gamestate = 0;
		}
		printResult();
	}
}

function updateRollCount() {
	rollcount = 3 + round(random(6));
}

function printTexts() {
	textSize(titlesize);
	fill(colors[0]);
	text(title, width / 2, 60);
	textSize(leveltextsize);
	fill(colors[2]);
	text(levellabel + str(level), width / 2, 60 + leveltextmargin);
	textSize(pointstextsize);
	fill(colors[2]);
	if (framew > frameh) {
		text(cpoints, offsetw + regionw + regionw / 2, titleoffset + regionh);
		text(ppoints, offsetw + 2 * regionw + regionw / 2, titleoffset + regionh);
	} else {
		text(cpoints, offsetw + regionw / 2, titleoffset + 2 * regionh);
		text(ppoints, offsetw + regionw + regionw / 2, titleoffset + 2 * regionh);
	}
}

function printResult() {
	if (cpoints > ppoints) {
		fill(colors[4]);
		stroke(colors[2]);
		strokeWeight(width / 125);
		rect(offsetw + framew / 4, offseth + frameh / 4, framew / 2, frameh / 2);
		fill(colors[0]);
		noStroke();
		textSize(pointstextsize / 3);
		text(defeat, offsetw + framew / 2, offseth + frameh / 2 - 20);
		fill(colors[2]);
		text(str(cpoints) + " - " + str(ppoints), offsetw + framew / 2, offseth + 5 * frameh / 8 + 20);
		gsounds.playLose();
	} else {
		fill(colors[4]);
		stroke(colors[2]);
		strokeWeight(width / 125);
		rect(offsetw + framew / 4, offseth + frameh / 4, framew / 2, frameh / 2);
		fill(colors[0]);
		noStroke();
		textSize(pointstextsize / 3);
		text(victory, offsetw + framew / 2, offseth + frameh / 2 - 20);
		fill(colors[2]);
		text(str(cpoints) + " - " + str(ppoints), offsetw + framew / 2, offseth + 5 * frameh / 8 + 20);
		gsounds.playWin();
	}
}

function printHelp() {
	let diameter = regionw * 0.9;
	let c1 = [0,0];
	let c2 = [0,0];
	let mh = (regionh / 2 - pface.s) / 4;
	if (framew > frameh) {
		c1[0] = offsetw + 3.5 * regionw;
		c1[1] =	offseth + titleoffset + regionh / 2;
		c2[0] = offsetw + 2.5 * regionw;
		c2[1] = offseth + titleoffset + regionh / 4 + mh;
	} else {
		c1[0] = offsetw + 1.5 * regionw;
		c1[1] =	offseth + titleoffset + regionh / 2;
		c2[0] = offsetw + 1.5 * regionw;
		c2[1] = offseth + titleoffset + 1.25 * regionh + 2 * mh;
	}
	fill(220, 190);
	stroke(colors[5]);
	strokeWeight(width / 150);
	ellipse(c1[0], c1[1], diameter, diameter);
	ellipse(c2[0], c2[1], diameter * 0.8, diameter * 0.8);
	noStroke();
	textSize(leveltextsize * 1.5);
	fill(colors[0]);
	text(helpc, c1[0], c1[1] + leveltextsize / 2);
	text(helpp, c2[0], c2[1] + leveltextsize / 2);
}

function startConfig(config) {
	gamestate = -1;
	lastclick = 0;
	rollcount = 6;
	titlesize = map(width, 300, 1200, 20, 40);
	leveltextsize = map(width, 300, 1200, 15, 30);
	leveltextmargin = map(width, 300, 1200, 25, 40);
	if (width > height) {
		if (height >= width * 0.5625) {
			framew = width;
			frameh = framew * 0.5625;
			offsetw = 0;
			offseth = (height - frameh) / 2;
		} else {
			frameh = height;
			framew = frameh * 1.7777;
			offsetw = (width - framew) / 2;
			offseth = 0;
		}
		logosize = framew / 12;
		regionw = framew / 4;
		regionh = frameh * 0.8;
	} else {
		if (height >= width * 1.7777) {
			framew = width;
			frameh = framew * 1.7777;
			offsetw = 0;
			offseth = (height - frameh) / 2;
		} else {
			frameh = height;
			framew = frameh * 0.5625;
			offsetw = (width - framew) / 2;
			offseth = 0;
		}
		logosize = frameh / 12;
		regionw = framew / 2;
		regionh = frameh * 0.4;
	}
	titleoffset = frameh * 0.2;
	pointstextsize = regionh * 0.40;
  let number = Number(config.level);
  if (typeof(number) === "number" && Number.isInteger(number)) {
    level = number;
  } else {
   	level = 1;
  }
	number = Number(config.delay);
  if (typeof(number) === "number" && Number.isInteger(number)) {
    rolldelay = number;
  } else {
   	rolldelay = 150;
  }
	let string = config.lan;
  if (typeof string === "string" && string === "eng") {
    title = "Rock, Scissors & Probabilities";
		levellabel = "Level: ";
		victory = "You won!";
		defeat = "You lost...";
		helpc = "choose";
		helpp = "play";
  } else {
		title = "Piedra, Papel y Probabilidades";
		levellabel = "Nivel: ";
		victory = "¡Ganaste!";
		defeat = "Perdiste...";
		helpc = "elegí";
		helpp = "jugá";
  }
	string = config.blocked;
  if (typeof string === "string" && string === "false") {
    blocklevels = false;
  } else {
		blocklevels = true;
  }
}

function buildInterface() {
	buildDices();
	buildFaces();
}

function buildDices() {
	diceh = regionh * 0.9;
	dicew = diceh * 0.75;
	let mw = (regionw - dicew) / 2;
	let mh = (regionh - diceh) / 2;
	if (dicew > regionw * 0.9) {
		dicew = regionw * 0.9;
		diceh = dicew * 1.3333;
		mw = (regionw - dicew) / 2;
		mh = (regionh - diceh) / 2;
	}
	if (framew > frameh) {
		cdice = new dice([rock, paper, scissors], [doubty, doubtf, doubtb], dicew, diceh, offsetw + mw, mh + offseth + titleoffset, 1);
		pdice = new dice([rock, paper, scissors], [doubty, doubtf, doubtb], dicew, diceh, offsetw + mw + 3 * regionw, mh + offseth + titleoffset, 1);
	} else {
		cdice = new dice([rock, paper, scissors], [doubty, doubtf, doubtb], dicew, diceh, mw + offsetw, mh + offseth + titleoffset, 1);
		pdice = new dice([rock, paper, scissors], [doubty, doubtf, doubtb], dicew, diceh, mw + offsetw + regionw, mh + offseth + titleoffset, 1);
	}
}

function buildFaces() {
	facew = regionh * 0.45;
	let mw = (regionw - facew) / 2;
	let mh = (regionh - facew) / 4;
	if (facew > regionw * 0.45) {
		facew = regionw * 0.45;
		mw = (regionw - facew) / 2;
		mh = (regionh - facew) / 4;
	}
	if (framew > frameh) {
		cface = new diceface([rock, paper, scissors], [doubty, doubtf, doubtb], facew, mw + regionw + offsetw, mh + offseth + titleoffset);
		pface = new diceface([rock, paper, scissors], [doubty, doubtf, doubtb], facew, mw + 2 * regionw + offsetw, mh + offseth + titleoffset);
	} else {
		cface = new diceface([rock, paper, scissors], [doubty, doubtf, doubtb], facew, mw + offsetw, mh + offseth + regionh +  titleoffset);
		pface = new diceface([rock, paper, scissors], [doubty, doubtf, doubtb], facew, mw + regionw + offsetw, mh + offseth + regionh + titleoffset);
	}
}

function displayBanner() {
	iw = framew * 0.75;
	ih = iw * 0.5625;
	image(banner, (width - iw) / 2, (height - ih) / 2, iw, ih);
}

function displayRegions() {
	if (framew > frameh) {
		fill(0);
		rect(offsetw, offseth + titleoffset, regionw, regionh);
		rect(offsetw + 2 * regionw, offseth + titleoffset, regionw, regionh);
		fill(100);
		rect(offsetw + regionw, offseth + titleoffset, regionw, regionh);
		rect(offsetw + 3 * regionw, offseth + titleoffset, regionw, regionh);
	} else {
		fill(0);
		rect(offsetw, offseth + titleoffset, regionw, regionh);
		rect(offsetw + regionw, offseth + titleoffset + regionh, regionw, regionh);
		fill(100);
		rect(offsetw + regionw, offseth + titleoffset, regionw, regionh);
		rect(offsetw, offseth + titleoffset + regionh, regionw, regionh);
	}
}
