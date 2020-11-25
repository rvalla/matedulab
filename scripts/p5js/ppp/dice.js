class dice {

  constructor(thefaces, thedoubts, dw, dh, cx, cy, layout){
		this.w = dw;
		this.h = dh;
		this.fs = this.w / 3;
		this.faces = [];
    this.x = cx;
    this.y = cy;
		this.ly = layout;
		this.createFaces(thefaces, thedoubts);
  }

  display(){
		for (let d = 0; d < this.faces.length; d++) {
			this.faces[d].display();
		}
  }

	contains(x, y) {
		let answer = false;
		for (let i = 0; i < this.faces.length; i++) {
			if (this.faces[i].contains(x, y) === true) {
				answer = true;
				break;
			}
		}
		return answer;
  }

	createFaces(thefaces, thedoubts) {
		this.faces.push(new diceface(thefaces, thedoubts, this.fs, this.x, this.y + this.fs * this.ly));
		this.faces.push(new diceface(thefaces, thedoubts, this.fs, this.x + this.fs, this.y));
		this.faces.push(new diceface(thefaces, thedoubts, this.fs, this.x + this.fs, this.y + this.fs));
		this.faces.push(new diceface(thefaces, thedoubts, this.fs, this.x + this.fs, this.y + 2 * this.fs));
		this.faces.push(new diceface(thefaces, thedoubts, this.fs, this.x + this.fs, this.y + 3 * this.fs));
		this.faces.push(new diceface(thefaces, thedoubts, this.fs, this.x + 2 * this.fs, this.y  + this.fs * (3 - this.ly)));
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
