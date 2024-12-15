export default class CollisionBlock {
    constructor ({x, y, size}) {
      this.x = x,
      this.y = y,
      this.width = size,
      this.height = size
    }
  
    draw() {
      ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
      ctx.fillRect(this.x, this.y, this.width, this.height)
    }
  }