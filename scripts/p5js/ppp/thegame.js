class thegame {

  constructor(rock, paper, scissors, dw, dh, cx, cy, layout){
		this.activedice = 0;
		this.cdice = [[0,0,0,2,0,0],[2,0,2,2,0,2],[1,0,1,2,0,1],[2,0,1,1,0,2],[0,1,2,1,1,2]];
		this.level1 = [[1,1,2,1,1,1],[1,0,1,1,1,1]];
		this.level2 = [[0,0,2,0,0,0],[1,0,1,0,0,0]];
		this.level3 = [[1,1,1,1,1,1],[2,2,2,2,2,2],[0,2,2,1,1,2]];
  }

	decide(c, p) {
		let r = 0;
		switch (c) {
			case 0:
				if (p === 1) {
					r = 1;
				} else if (p === 2) {
					r = -1;
				}
				break;
			case 1:
				if (p === 2) {
					r = 1;
				} else if (p === 0) {
					r = -1;
				}
				break;
			case 2:
				if (p === 0) {
					r = 1;
				} else if (p === 1) {
					r = -1;
				}
				break;
		}
		return r;
	}

	throwDice() {
		return random([0,1,2,3,4,5]);
	}

	getCDice(l) {
		if (l < 6) {
			return this.cdice[l - 1];
		} else {
			return this.getRandomDice();
		}
	}

	getPDice(l) {
		switch (l) {
			case 1:
				this.activedice = (this.activedice + 1) % this.level1.length;
				return this.level1[this.activedice];
				break;
			case 2:
				this.activedice = (this.activedice + 1) % this.level2.length;
				return this.level2[this.activedice];
				break;
			case 3:
				this.activedice = (this.activedice + 1) % this.level3.length;
				return this.level3[this.activedice];
				break;
			default:
				return this.getRandomDice();
				break;
		}
	}

	getRandomDice() {
		let faces = [];
		for (let i = 0; i < 6; i++) {
			faces[i] = this.getRandomFace();
		}
		return faces;
	}

	getRandomFace() {
		return random([0,1,2]);
	}

}
