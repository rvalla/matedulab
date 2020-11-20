class dice {

  constructor(rock, paper, scissors, dw, dh, cx, cy, layout){
		this.w = dw;
		this.h = dh;
		this.fs = this.w / 4;
		this.faces = [];
    this.x = cx;
    this.y = cy;
		this.ly = layout;
		this.createFaces(rock, paper, scissors);
  }

  display(){
		for (let d = 0; d < this.faces.length; d++) {
			this.faces[d].display();
		}
  }

	contains(x, y) {
		let answer = false;
		if (x > this.x && y > this.y) {
			if (x < this.x + this.w && y < this.y + this.h) {
				answer =  true;
			}
		}
		return answer;
  }

	createFaces(rock, paper, scissors) {
		this.faces.push(new diceface(rock, paper, scissors, this.fs, this.x + this.fs * this.ly, this.y));
		this.faces.push(new diceface(rock, paper, scissors, this.fs, this.x, this.y + this.fs));
		this.faces.push(new diceface(rock, paper, scissors, this.fs, this.x + this.fs, this.y + this.fs));
		this.faces.push(new diceface(rock, paper, scissors, this.fs, this.x + 2 * this.fs, this.y + this.fs));
		this.faces.push(new diceface(rock, paper, scissors, this.fs, this.x + 3 * this.fs, this.y + this.fs));
		this.faces.push(new diceface(rock, paper, scissors, this.fs, this.x + this.fs * (3 - this.ly), this.y + 2 * this.fs));
		for (let i = 0; i < this.faces.length; i++) {
			this.faces[i].setActiveFace(this.getRandomFace());
		}
	}

	setFaces(newfaces) {
		for (let i = 0; i < 6; i++) {
			this.faces[i].setActiveFace(newfaces[i]);
		}
	}

	setRandomFaces() {
		for (let i = 0; i < 6; i++) {
			this.faces[i].setActiveFace(this.getRandomFace());
		}
	}

	getRandomFace() {
		return random([0,1,2]);
	}

}
