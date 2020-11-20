class diceface {

  constructor(rock, paper, scissors, size, cx, cy){
		this.faces = [];
    this.faces[0] = rock;
		this.faces[1] = paper;
		this.faces[2] = scissors;
		this.active = 0;
    this.s = size;
		this.x = cx;
		this.y = cy;
  }

  display(){
    image(this.faces[this.active], this.x, this.y, this.s, this.s);
  }

	setActiveFace(n) {
		this.active = n;
	}

	getActiveFace() {
		return this.active;
	}

}
