class diceface {

  constructor(thefaces, thedoubts, size, cx, cy){
		this.faces = [];
    this.faces[0] = thefaces[0];
		this.faces[1] = thefaces[1];
		this.faces[2] = thefaces[2];
		this.faces[3] = thedoubts[0];
		this.faces[4] = thedoubts[1];
		this.faces[5] = thedoubts[2];
		this.active = 0;
    this.s = size;
		this.x = cx;
		this.y = cy;
  }

  display(){
    image(this.faces[this.active], this.x, this.y, this.s, this.s);
  }

	contains(x, y) {
		let answer = false;
		if (x > this.x && y > this.y) {
			if (x < this.x + this.s && y < this.y + this.s) {
				answer =  true;
			}
		}
		return answer;
	}

	setActiveFace(n) {
		this.active = n;
	}

	getActiveFace() {
		return this.active;
	}

}
