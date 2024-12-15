import { ctx } from "../../index.js";

export default class Background {
  constructor(game, { position, imageSrc }) {
    this.game = game;
    this.position = position;
    this.image = new Image();
    this.image.onload = () => {
      this.loaded = true;
      this.width = this.image.width;
      this.height = this.image.height;
    };
    this.image.src = imageSrc;
    this.loaded = false;
  }

  draw() {
    if (!this.loaded) return;
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
