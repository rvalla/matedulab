class gamesounds {

  constructor(){
		this.lose = new p5.Oscillator("square");
		this.lose.freq(110);
		this.win = new p5.Oscillator("triangle");
		this.win.freq(440);
		this.winEnv = new p5.Envelope(0.05, 0.9, 0.8, 0.1);
		this.winEnv.connect(this.win);
		this.loseEnv = new p5.Envelope(0.1, 0.9, 0.2, 0.1);
		this.loseEnv.connect(this.lose);
  }

	playWin() {
		this.win.start();
		this.winEnv.play(this.win);
	}

	playLose() {
		this.lose.start();
		this.loseEnv.play(this.lose);
	}

}
