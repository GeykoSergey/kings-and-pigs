import { ctx } from '../../index.js';
import { checkCollisions } from '../utils.js';

export default class DynamicGameObject {
  constructor(game, { position }) {
    this.game = game;
    this.position = position;

    this.velocity = {
      x: 0,
      y: 0,
    };

    this.gravity = 1.2;

    this.state = {
      isIdleLeft: true,
      isIdleRight: false,
      isRunRight: false,
      isRunLeft: false,
    };

    this.turnTimer = 0;
    this.turnInterval = 100;

    this.moving = true;
    this.readyToTurn = true;

    this.image = new Image();
    this.image.onload = () => {
      this.loaded = true;
      this.width = this.image.width;
      this.height = this.image.height;
    };

    this.image.src = './../../img/game-objects/box-idle.png';
    this.loaded = false;

    this.frameRate = 11;
    this.currentFrame = 0;
    this.elapsedFrames = 0;
    this.frameBuffer = 4;

    this.animations = {
      idleRight: {
        frameRate: 11,
        frameBuffer: 2,
        loop: true,
        imageSrc: './../../img/pig/pig-idle-right.png',
      },
      idleLeft: {
        frameRate: 11,
        frameBuffer: 2,
        loop: true,
        imageSrc: './../../img/pig/pig-idle-left.png',
      },
      runRight: {
        frameRate: 6,
        frameBuffer: 4,
        loop: true,
        imageSrc: './../../img/pig/pig-run-right.png',
      },
      runLeft: {
        frameRate: 6,
        frameBuffer: 4,
        loop: true,
        imageSrc: './../../img/pig/pig-run-left.png',
      },
      attackLeft: {
        frameRate: 6,
        frameBuffer: 2,
        loop: true,
        imageSrc: './../../img/pig/attack-left.png',
      },
      attackRight: {
        frameRate: 6,
        frameBuffer: 2,
        loop: true,
        imageSrc: './../../img/pig/attack-right.png',
      },
    };

    if (this.animations) {
      for (let key in this.animations) {
        const image = new Image();
        image.src = this.animations[key].imageSrc;
        this.animations[key].image = image;
      }
    }
  }

  // =================================================================================================
  //                                                                                            draw()
  // =================================================================================================
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
    // this.upDateFrame();
  }

  // upDateFrame() {
  //   this.elapsedFrames++;

  //   if (this.elapsedFrames % this.frameBuffer === 0) {
  //     if (this.currentFrame < this.frameRate - 1) {
  //       this.currentFrame++;
  //     } else {
  //       this.currentFrame = 0;
  //     }
  //   }
  // }

  updateHitbox() {
    this.hitBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 55,
      height: 40,
    };
  }

  // =================================================================================================
  //                                                                                          update()
  // =================================================================================================

  move() {
    this.position.x -= 1;
    this.game.player.isMoveBox = true;
  }

  update() {
    this.position.x += this.velocity.x;

    this.updateHitbox();

    const collisionDirection = checkCollisions(this.game.player, this);

    console.log(collisionDirection);

    if (collisionDirection) {
      if (
        collisionDirection === 'right' &&
        this.game.player.keys.a.pressed
        // this.game.player.keys.a.pressed.true
      ) {
        this.move();

        console.log(this.game.player.keys.a.pressed.true);
      }
    }
    this.checkForHorizontalCollision();

    this.apllyGravity();

    this.updateHitbox();

    this.checkForVerticalCollision();

    this.checkPlatformCollision();

    // *****************************************************************
    //                                                             timer
    // *****************************************************************
    if (this.turnTimer < this.turnInterval) {
      this.turnTimer += 1;
    } else {
      this.turnTimer = 0;
      // this.changeState();
      // this.turnInterval = Math.floor(Math.random() * 8) + 1;
    }
  }

  // =================================================================================================
  //                                                                                     changeState()
  // =================================================================================================
  // changeState() {
  //   const randomize = Math.random();
  //   if (this.velocity.y === 0) {
  //     if (randomize < 0.3) {
  //       this.runLeft();
  //     } else if (randomize < 0.6) {
  //       this.runRight();
  //     } else {
  //       this.idle();
  //     }
  //   }
  // }

  runLeft() {
    this.velocity.x = -1;
    this.switchSprite('runLeft');
  }

  runRight() {
    this.velocity.x = 1;
    this.switchSprite('runRight');
  }

  idle() {
    this.velocity.x = 0;
    this.switchSprite('idleLeft');
  }

  // =================================================================================================
  //                                                                                    switchSprite()
  // =================================================================================================
  switchSprite(name) {
    if (this.image === this.animations[name].image) return;
    this.currentFrame = 0;
    this.image = this.animations[name].image;
    this.frameRate = this.animations[name].frameRate;
    this.frameBuffer = this.animations[name].frameBuffer;
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
          this.velocity.x = 0;
          // this.switchSprite('runRight');
          // this.idle();
          break;
        }
        if (this.velocity.x > 0) {
          const offset =
            this.hitBox.position.x - this.position.x + this.hitBox.width;
          this.position.x = collisionBlock.x - offset - 0.01;
          this.velocity.x = 0;
          // this.switchSprite('runLeft');
          // this.idle();
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
        // if (this.velocity.y < 0) {
        //   this.velocity.y = 0;
        //   const offset = this.hitBox.position.y - this.position.y;
        //   this.position.y =
        //     collisionBlock.y + collisionBlock.height - offset + 0.01;
        //   break;
        // }
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
}
