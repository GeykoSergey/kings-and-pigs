class CollisionBlock {
    constructor ({position}) {
      this.position = position,
      this.width = 64,
      this.height = 64
    }
  
    draw() {
      c.fillStyle = '#ef5350';
      c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }