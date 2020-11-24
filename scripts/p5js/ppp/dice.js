class dice {

  constructor(rock, paper, scissors, dw, dh, cx, cy, layout){
		this.w = dw;
		this.h = dh;
		this.fs = this.w / 3;
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
		this.faces.push(new diceface(rock, paper, scissors, this.fs, this.x, this.y + this.fs * this.ly));
		this.faces.push(new diceface(rock, paper, scissors, this.fs, this.x + this.fs, this.y));
		this.faces.push(new diceface(rock, paper, scissors, this.fs, this.x + this.fs, this.y + this.fs));
		this.faces.push(new diceface(rock, paper, scissors, this.fs, this.x + this.fs, this.y + 2 * this.fs));
		this.faces.push(new diceface(rock, paper, scissors, this.fs, this.x + this.fs, this.y + 3 * this.fs));
		this.faces.push(new diceface(rock, paper, scissors, this.fs, this.x + 2 * this.fs, this.y  + this.fs * (3 - this.ly)));
		for (let i = 0; i < this.faces.length; i++) {
			this.faces[i].setActiveFace(0);
		}
	}

	setFaces(newfaces) {
		for (let i = 0; i < 6; i++) {
			this.faces[i].setActiveFace(newfaces[i]);
		}
	}

}
