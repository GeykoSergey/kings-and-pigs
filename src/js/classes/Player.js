class Player extends Sprite {
  constructor({ collisionBlocks = [], imageSrc, frameRate, animations }) {
    super({ imageSrc, frameRate, animations });
    this.position = {
      x: 600,
      y: 600,
    };

    this.velocity = {
      x: 0,
      y: 0,
    };

    // this.width = 25
    // Высота игрока
    // const height = 100;
    // this.height = 25

    this.sides = {
      bottom: this.position.y + this.height,
    };

    this.gravity = 1;

    this.collisionBlocks = collisionBlocks;
    // console.log(this.collisionBlocks);
    // console.log(collisionBlocks);
  }

  update() {
    // This is blue box
    // c.fillStyle = 'rgba(0, 0, 255, 0.5'
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)

    // console.log(this.collisionBlocks)
    // При обновлении добавляем к верхней координате игрока
    // velocity, которое с каждым циклом анимации увеличивается на
    // значение gravity, таким образом имитируя ускорение
    this.position.x += this.velocity.x;
    // Check horisintal collision
    // console.log('Update')
    // console.log(collisionBlocks)

    this.updateHitbox();
    this.checkForHorizontalCollision();

    // console.log('Update')

    // Apply gravity
    this.apllyGravity();

    this.updateHitbox();

    c.fillRect(
      this.hitBox.position.x,
      this.hitBox.position.y,
      this.hitBox.width,
      this.hitBox.height
    );
    this.checkForVerticalCollision();
    // this.sides.bottom = this.position.y + this.height;
  }

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
        x: this.position.x + 58,
        y: this.position.y + 34,
      },
      width: 50,
      height: 53,
    };
  }

  checkForHorizontalCollision() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      // console.log(collisionBlock);
      // console.log('Hello block')

      // if a collission exist
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
        // Столкновение по оси x двигаясь влево
        if (this.velocity.x < 0) {
          const offset = this.hitBox.position.x - this.position.x;
          this.position.x =
            collisionBlock.position.x + collisionBlock.width - offset + 0.01;
          // console.log('collision left');
          break;
        }
        if (this.velocity.x > 0) {
          const offset =
            this.hitBox.position.x - this.position.x + this.hitBox.width;
          this.position.x = collisionBlock.position.x - offset - 0.01;
          // console.log('collision right');
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

    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      // console.log(collisionBlock);
      // console.log('Hello block')

      // if a collission exist
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
          // console.log('collision left');
          break;
        }
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          const offset =
            this.hitBox.position.y - this.position.y + this.hitBox.height;
          this.position.y = collisionBlock.position.y - offset - 0.01;

          // console.log('collision right');
          break;
        }
      }
    }

    // Пока координата низа игрока меньше высоты канваса
    // y++; и обновляем координату низа игрока bottom = y + height;
    // Координата низа игрока
    // let bottom = y + height;
    // if ((this.sides.bottom + this.velocity.y) < canvas.height) {
    // Увеличиваем ускорение
    // this.velocity.y += this.gravity;

    // } else {
    // Обнуляем ускорение
    //     this.velocity.y = 0
    // }
  }
}
