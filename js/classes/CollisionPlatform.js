export default class CollisionPlatform {
  constructor({ x, y, width = 64, height = 4 }) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  draw() {
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}