class dot {

  constructor(c){
    this.c = c;
    this.d = this.getDiameter();
    this.x = windowWidth / 2;
    this.y = windowHeight / 2;
  }

  display(){
    fill(this.c);
    noStroke();
    ellipse(this.x, this.y, this.d, this.d);
  }

  update(mx, my){
    this.x += mx;
    this.y += my;
  }

  getDiameter(){
    let d = 0;
    if (windowWidth > windowHeight){
      d = windowHeight / 20;
    } else {
      d = windowWidth / 20;
    }
    return d;
  }

  reset(){
    this.x = windowWidth / 2;
    this.y = windowHeight / 2;
  }

}
