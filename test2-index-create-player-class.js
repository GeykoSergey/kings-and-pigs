const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 768;

// Player

class Player {
    constructor() {
        this.position = {
            x: 100,
            // Начальная координата верха игрока
            // let y = 100;
            y: 100,
        }

        this.width = 100
        // Высота игрока
        // const height = 100;  
        this.height = 100

        this.sides = {
            bottom: this.position.y + this.height,
        }
    }

    draw() {
        // На данный момент отрисовываем игрока так
        // Зеленый квадрат с начальными координатами 100 100
        // Высотой и шириной 100 100
        c.fillStyle = '#aed581';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        // Пока координата низа игрока меньше высоты канваса
        // y++; и обновляем координату низа игрока bottom = y + height;
        // Координата низа игрока
        // let bottom = y + height;
        if (this.sides.bottom < canvas.height) {
            this.position.y++;
            this.sides.bottom = this.position.y + this.height;
        }
    }
}

const player = new Player();


// Цикл анимации
// В цикле каждый раз перерисовываем игровую зону и
// игрока со смещением по у
function animate() {
    window.requestAnimationFrame(animate);

    // Игровая зона (равна канвас)
    c.fillStyle = '#f5f5f5';
    c.fillRect(0, 0, canvas.width, canvas.height);

    player.draw();
    player.update();
}

animate();