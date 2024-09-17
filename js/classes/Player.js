class Player extends Sprite {
    constructor({collisionBlocks = [], imageSrc, frameRate}) {
        super({imageSrc, frameRate})
        this.position = {
            x: 200,
            // Начальная координата верха игрока
            // let y = 100;
            y: 200,
        }

        this.velocity = {
            x: 0,
            y: 0,
        }

        // this.width = 25
        // Высота игрока
        // const height = 100;  
        // this.height = 25

        this.sides = {
            bottom: this.position.y + this.height,
        }

        this.gravity = 1

        this.collisionBlocks = collisionBlocks
        console.log(this.collisionBlocks)
        console.log(collisionBlocks)
    }

    update() {
        c.fillStyle = 'rgba(0, 0, 255, 0.5'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        // console.log(this.collisionBlocks)
        // При обновлении добавляем к верхней координате игрока
        // velocity, которое с каждым циклом анимации увеличивается на
        // значение gravity, таким образом имитируя ускорение
        this.position.x += this.velocity.x
        // Check horisintal collision
        // console.log('Update')
        // console.log(collisionBlocks)

        this.checkForHorizontalCollision()

        // console.log('Update')

        // Apply gravity
        this.apllyGravity()
        this.checkForVerticalCollision()
        // this.sides.bottom = this.position.y + this.height;
    }

    checkForHorizontalCollision() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];

            console.log(collisionBlock)
            // console.log('Hello block')

            // if a collission exist
            if (this.position.x <= (collisionBlock.position.x + collisionBlock.width) &&
                this.position.x + this.width >= collisionBlock.position.x &&
                this.position.y + this.height >= collisionBlock.position.y &&
                this.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                // Столкновение по оси x двигаясь влево
                if (this.velocity.x < 0) {
                    this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01;
                    console.log('collision left')
                    break;
                }
                if (this.velocity.x > 0) {
                    this.position.x = collisionBlock.position.x - this.width - 0.01;
                    console.log('collision right')
                    break;
                }
            }
        }
    }

    apllyGravity() {
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y
    }

    checkForVerticalCollision() {
                // Check vertical collision

                for (let i = 0; i < this.collisionBlocks.length; i++) {
                    const collisionBlock = this.collisionBlocks[i];
        
                    console.log(collisionBlock)
                    // console.log('Hello block')
        
                    // if a collission exist
                    if (this.position.x <= (collisionBlock.position.x + collisionBlock.width) &&
                        this.position.x + this.width >= collisionBlock.position.x &&
                        this.position.y + this.height >= collisionBlock.position.y &&
                        this.position.y <= collisionBlock.position.y + collisionBlock.height
                    ) {
        
                        if (this.velocity.y < 0) {
                            this.velocity.y = 0
                            this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01;
                            console.log('collision left')
                            break;
                        }
                        if (this.velocity.y > 0) {
                            this.velocity.y = 0
                            this.position.y = collisionBlock.position.y - this.height - 0.01;
                            console.log('collision right')
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