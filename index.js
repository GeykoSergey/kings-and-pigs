const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;

const parsedCollisions = collisionsLevel1.parse2D();
// console.log(parsedCollisions);
const collisionBlocks = parsedCollisions.createObjectsFrom2D();
console.log(collisionBlocks);


const backgroundlevel1 = new Sprite({
    position: {x: 0, y:0,},
    imageSrc: './img/backgroundLevel1.png',
});

const keys = {
    w: {pressed: false},
    a: {pressed: false},
    d: {pressed: false},
}

// Player
const player = new Player({collisionBlocks, imageSrc: './img/king/idle.png', frameRate: 11});

// Цикл анимации
// В цикле каждый раз перерисовываем игровую зону и
// игрока со смещением по у
function animate() {
    window.requestAnimationFrame(animate);

    // Игровая зона (равна канвас)
    c.fillStyle = '#f5f5f5';
    c.fillRect(0, 0, canvas.width, canvas.height);

    backgroundlevel1.draw();

    console.log(collisionBlocks)
    collisionBlocks.forEach((collisionBlock) => {
        collisionBlock.draw()
    });

    player.velocity.x = 0;

    if (keys.d.pressed) {
        player.velocity.x = 5
    } else if (keys.a.pressed) {
        player.velocity.x = -5
    }

    player.draw();
    player.update();
}

animate();

const arr = [1, 2, 3];
console.log(arr)