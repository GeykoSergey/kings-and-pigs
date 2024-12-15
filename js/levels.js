let levels = {
  1: {
    collisionsMap: collisionsLevel1,
    backgroundImg: 'background-1',
    player: { position: { x: 100, y: 100 } },
    enemy: [
      { position: { x: 500, y: 100 } },
      { position: { x: 800, y: 100 } },
      { position: { x: 1200, y: 200 } },
    ],
  },
  // 2: {
  //   init: () => {
  //     parsedCollisions = collisionsLevel2.parse2D();
  //     collisionBlocks = parsedCollisions.createObjectsFrom2D();
  //     player.collisionBlocks = collisionBlocks;
  //     player.position.x = 96;
  //     player.position.y = 140;

  //     if (player.currentAnimation) player.currentAnimation.isActive = false;

  //     background = new Sprite({
  //       position: {
  //         x: 0,
  //         y: 0,
  //       },
  //       imageSrc: './img/backgroundLevel2.png',
  //     });

  //     doors = [
  //       new Sprite({
  //         position: {
  //           x: 772.0,
  //           y: 336,
  //         },
  //         imageSrc: './img/doorOpen.png',
  //         frameRate: 5,
  //         frameBuffer: 5,
  //         loop: false,
  //         autoplay: false,
  //       }),
  //     ];
  //   },
  // },
};
