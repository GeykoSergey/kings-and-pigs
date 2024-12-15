class Enemy extends Sprite {
  constructor({ collisionBlocks = [], imageSrc, frameRate }) {
    super({ imageSrc, frameRate });
    this.frameBuffer = 6;
    this.position = {
      x: 400,
      // Начальная координата верха игрока
      // let y = 100;
      y: 200,
    };

    this.velocity = {
      x: 0,
      y: 0,
    };

    this.sides = {
      bottom: this.position.y + this.height,
    };

    this.gravity = 1;
    this.collisionBlocks = collisionBlocks;
  }

  update() {
    this.position.x += this.velocity.x;
    this.updateHitbox();
    this.checkForHorizontalCollision();
    this.apllyGravity();
    this.updateHitbox();
    c.fillRect(
      this.hitBox.position.x,
      this.hitBox.position.y,
      this.hitBox.width,
      this.hitBox.height
    );
    this.checkForVerticalCollision();
  }

  updateHitbox() {
    this.hitBox = {
      position: {
        x: this.position.x + 28,
        y: this.position.y + 21,
      },
      width: 50,
      height: 53,
    };
  }

  checkForHorizontalCollision() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        this.hitBox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitBox.position.x + this.hitBox.width >=
          collisionBlock.position.x &&
        this.hitBox.position.y + this.hitBox.height >=
          collisionBlock.position.y &&
        this.hitBox.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.x < 0) {
          const offset = this.hitBox.position.x - this.position.x;
          this.position.x =
            collisionBlock.position.x + collisionBlock.width - offset + 0.01;
          console.log('collision left');
          break;
        }
        if (this.velocity.x > 0) {
          const offset =
            this.hitBox.position.x - this.position.x + this.hitBox.width;
          this.position.x = collisionBlock.position.x - offset - 0.01;
          console.log('collision right');
          break;
        }
      }
    }
  }

  apllyGravity() {
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
  }

  checkForVerticalCollision() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        this.hitBox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitBox.position.x + this.hitBox.width >=
          collisionBlock.position.x &&
        this.hitBox.position.y + this.hitBox.height >=
          collisionBlock.position.y &&
        this.hitBox.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          const offset = this.hitBox.position.y - this.position.y;
          this.position.y =
            collisionBlock.position.y + collisionBlock.height - offset + 0.01;
          break;
        }
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          const offset =
            this.hitBox.position.y - this.position.y + this.hitBox.height;
          this.position.y = collisionBlock.position.y - offset - 0.01;
          break;
        }
      }
    }
  }
}
