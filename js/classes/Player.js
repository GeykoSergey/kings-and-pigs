import { ctx } from '../../index.js';

export default class Player {
  constructor(game) {
    this.game = game;

    this.keys = {
      w: { pressed: false },
      a: { pressed: false },
      d: { pressed: false },
      space: { pressed: false },
    };

    this.isMoveBox = true;

    this.position = {
      x: 100,
      y: 100,
    };

    this.velocity = {
      x: 0,
      y: 0,
    };

    this.gravity = 1.2;

    this.image = new Image();
    this.image.onload = () => {
      this.loaded = true;
      this.width = this.image.width / this.frameRate;
      this.height = this.image.height;
    };

    this.image.src = './../../img/king/idle.png';
    this.loaded = false;

    this.frameRate = 11;

    this.animations = {
      idleRight: {
        frameRate: 11,
        frameBuffer: 10,
        loop: true,
        imageSrc: './../../img/king/idle-right.png',
      },
      idleLeft: {
        frameRate: 11,
        frameBuffer: 10,
        loop: true,
        imageSrc: './../../img/king/idle-left.png',
      },
      runRight: {
        frameRate: 8,
        frameBuffer: 10,
        loop: true,
        imageSrc: './../../img/king/run-right.png',
      },
      runLeft: {
        frameRate: 8,
        frameBuffer: 10,
        loop: true,
        imageSrc: './../../img/king/run-left.png',
      },
      attackLeft: {
        frameRate: 6,
        frameBuffer: 5,
        loop: true,
        imageSrc: './../../img/king/attack-left.png',
      },
      attackRight: {
        frameRate: 6,
        frameBuffer: 5,
        loop: true,
        imageSrc: './../../img/king/attack-right.png',
      },
    };

    this.currentFrame = 0;
    // elapsedFrames - прошедшие кадры
    this.elapsedFrames = 0;
    this.frameBuffer = 10;

    // =========================================================================================================
    //                                                                   Создаем изображения для каждой анимации
    // =========================================================================================================
    if (this.animations) {
      for (let key in this.animations) {
        const image = new Image();
        image.src = this.animations[key].imageSrc;
        this.animations[key].image = image;
      }
    }
  }

  draw() {
    if (!this.loaded) return;
    const cropBox = {
      position: { x: this.width * this.currentFrame, y: 0 },
      width: this.width,
      height: this.height,
    };

    ctx.drawImage(
      this.image,
      cropBox.position.x,
      cropBox.position.y,
      cropBox.width,
      cropBox.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    this.upDateFrame();

    // ctx.fillStyle = 'rgba(140, 209, 145, 0.5)';
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    // ctx.fillStyle = 'rgba(140, 209, 145, 0.5)';
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    // ctx.fillStyle = 'rgba(29, 133, 231, 0.5)';
    // ctx.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height);
  }

  upDateFrame() {
    this.elapsedFrames++;

    if (this.elapsedFrames % this.frameBuffer === 0) {
      if (this.currentFrame < this.frameRate - 1) {
        this.currentFrame++;
      } else {
        this.currentFrame = 0;
      }
    }
  }

  // =================================================================================================
  //                                                                                            update
  // =================================================================================================
  update() {
    this.position.x += this.velocity.x;

    this.updateHitbox();

    this.checkForHorizontalCollision();

    this.apllyGravity();

    this.updateHitbox();

    // c.fillRect(
    //   this.hitBox.position.x,
    //   this.hitBox.position.y,
    //   this.hitBox.width,
    //   this.hitBox.height
    // );
    this.checkForVerticalCollision();
    this.checkPlatformCollision();
  }

  // =================================================================================================
  //                                                                                     Switch Sprite
  // =================================================================================================
  switchSprite(name) {
    if (this.image === this.animations[name].image) return;
    this.currentFrame = 0;
    this.image = this.animations[name].image;
    this.frameRate = this.animations[name].frameRate;
    this.frameBuffer = this.animations[name].frameBuffer;
  }

  updateHitbox() {
    this.hitBox = {
      position: {
        x: this.position.x + 50,
        y: this.position.y + 42,
      },
      width: 50,
      height: 53,
    };
  }

  checkForHorizontalCollision() {
    for (let i = 0; i < this.game.collisionBlocks.length; i++) {
      const collisionBlock = this.game.collisionBlocks[i];

      // if a collission exist
      if (
        this.hitBox.position.x <= collisionBlock.x + collisionBlock.width &&
        this.hitBox.position.x + this.hitBox.width >= collisionBlock.x &&
        this.hitBox.position.y + this.hitBox.height >= collisionBlock.y &&
        this.hitBox.position.y <= collisionBlock.y + collisionBlock.height
      ) {
        // Столкновение по оси x двигаясь влево
        if (this.velocity.x < 0) {
          const offset = this.hitBox.position.x - this.position.x;
          this.position.x =
            collisionBlock.x + collisionBlock.width - offset + 0.01;
          break;
        }
        if (this.velocity.x > 0) {
          const offset =
            this.hitBox.position.x - this.position.x + this.hitBox.width;
          this.position.x = collisionBlock.x - offset - 0.01;
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
    // Check vertical collision

    for (let i = 0; i < this.game.collisionBlocks.length; i++) {
      const collisionBlock = this.game.collisionBlocks[i];

      // if a collission exist
      if (
        this.hitBox.position.x <= collisionBlock.x + collisionBlock.width &&
        this.hitBox.position.x + this.hitBox.width >= collisionBlock.x &&
        this.hitBox.position.y + this.hitBox.height >= collisionBlock.y &&
        this.hitBox.position.y <= collisionBlock.y + collisionBlock.height
      ) {
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          const offset = this.hitBox.position.y - this.position.y;
          this.position.y =
            collisionBlock.y + collisionBlock.height - offset + 0.01;
          break;
        }
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          const offset =
            this.hitBox.position.y - this.position.y + this.hitBox.height;
          this.position.y = collisionBlock.y - offset - 0.01;
          break;
        }
      }
    }
  }

  checkPlatformCollision() {
    for (let i = 0; i < this.game.collisionPlatforms.length; i++) {
      const collisionPlatform = this.game.collisionPlatforms[i];

      // if a collission exist
      if (
        this.hitBox.position.x <=
          collisionPlatform.x + collisionPlatform.width &&
        this.hitBox.position.x + this.hitBox.width >= collisionPlatform.x &&
        this.hitBox.position.y + this.hitBox.height >= collisionPlatform.y &&
        this.hitBox.position.y <= collisionPlatform.y + collisionPlatform.height
      ) {
        // if (this.velocity.y < 0) {
        //   this.velocity.y = 0;
        //   const offset = this.hitBox.position.y - this.position.y;
        //   this.position.y =
        //     collisionPlatform.y + collisionPlatform.height - offset + 0.01;
        //   break;
        // }
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          const offset =
            this.hitBox.position.y - this.position.y + this.hitBox.height;
          this.position.y = collisionPlatform.y - offset - 0.01;
          break;
        }
      }
    }
  }

  handleInput() {
    if (this.keys.d.pressed) {
      this.switchSprite('runRight');
      this.velocity.x = 5;
      this.lastDirrection = 'right';
    } else if (this.keys.a.pressed) {
      this.switchSprite('runLeft');
      if (this.isMoveBox) {
        this.velocity.x = -1;
      } else {
        this.velocity.x = -5;
      }

      this.lastDirrection = 'left';
    } else if (this.keys.space.pressed) {
      if (this.lastDirrection === 'left') {
        this.switchSprite('attackLeft');
      } else {
        this.switchSprite('attackRight');
      }
    } else {
      if (this.lastDirrection === 'left') {
        this.switchSprite('idleLeft');
      } else {
        this.switchSprite('idleRight');
      }
    }
  }
}
