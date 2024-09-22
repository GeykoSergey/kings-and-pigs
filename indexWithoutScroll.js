const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
// const dpr = window.devicePixelRatio || 1;
// canvas.width = 3200 * dpr;
// canvas.height = 640 * dpr;
canvas.width = 3200;
canvas.height = 640;

// const layersData = {
//   l_New_Layer_1: l_New_Layer_1,
//   l_New_Layer_2: l_New_Layer_2,
//   l_New_Layer_3: l_New_Layer_3,
//   l_New_Layer_4: l_New_Layer_4,
// };

// const tileSets = {
//   l_New_Layer_1: { imageUrl: './', tileSize: 32 },
//   l_New_Layer_2: { imageUrl: './', tileSize: 32 },
//   l_New_Layer_3: { imageUrl: './', tileSize: 32 },
//   l_New_Layer_4: { imageUrl: './', tileSize: 32 },
// };

const parsedCollisions = collisionsLevel1.parse2D();
// console.log(parsedCollisions);
const collisionBlocks = parsedCollisions.createObjectsFrom2D();
// console.log(collisionBlocks);

const backgroundlevel1 = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: './img/untitled.png',
});

const keys = {
  w: { pressed: false },
  a: { pressed: false },
  d: { pressed: false },
};

// Player
// const enemy = new Enemy({
//   collisionBlocks,
//   imageSrc: './img/pig/idle.png',
//   frameRate: 11,
// });

const player = new Player({
  collisionBlocks,
  imageSrc: './img/king/idle.png',
  frameRate: 11,
  animations: {
    idleRight: {
      frameRate: 11,
      frameBuffer: 2,
      loop: true,
      imageSrc: './img/king/idle.png',
    },
    idleLeft: {
      frameRate: 11,
      frameBuffer: 2,
      loop: true,
      imageSrc: './img/king/idleLeft.png',
    },
    runRight: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/king/runRight.png',
    },
    runLeft: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/king/runLeft.png',
      image: new Image(),
    },
  },
  // enemy,
});
// Цикл анимации
// В цикле каждый раз перерисовываем игровую зону и
// игрока со смещением по у

const camera = {
  x: 300,
  y: 0,
};

function animate() {
  
  // Игровая зона (равна канвас)
  c.fillStyle = '#f5f5f5';
  c.fillRect(0, 0, canvas.width, canvas.height);
  
  backgroundlevel1.draw();
  
  //   console.log(collisionBlocks);
  collisionBlocks.forEach((collisionBlock) => {
    collisionBlock.draw();
  });
  
  player.velocity.x = 0;
  
  if (keys.d.pressed) {
    player.switchSprite('runRight');
    player.velocity.x = 5;
    player.lastDirrection = 'right';
  } else if (keys.a.pressed) {
    player.switchSprite('runLeft');
    player.velocity.x = -5;
    player.lastDirrection = 'left';
  } else {
    if (player.lastDirrection === 'left') {
      player.switchSprite('idleLeft');
    } else {
      player.switchSprite('idleRight');
    }
  }
  
  // Render scene
  player.draw();

  player.update();

  window.requestAnimationFrame(animate);
}

animate();

const arr = [1, 2, 3];
// console.log(arr);
