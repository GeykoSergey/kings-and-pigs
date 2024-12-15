import { canvas } from '../../index.js';
import { ctx } from '../../index.js';
import { dpr } from '../../index.js';
import { levels } from '../data/levelsConfig.js';
import CollisionBlock from './CollisionBlock.js';
import CollisionPlatform from './CollisionPlatform.js';
import Enemy from './Enemy.js';
import Player from './Player.js';
import Background from './Background.js';
import DynamicGameObject from './DynamicGameObject.js';

// ===================================================================================================================
//                                                             class Game - управляет состоянием всех игровых объектов
// ===================================================================================================================

export default class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.ctx = context;
    this.width;
    this.height;

    // this.eventTimer = 0;
    // this.eventInterval = 200;
    // this.eventUpdate = false;

    // this.gameOver = true;
    // this.winningScore = 3;

    // this.gameUi = new Ui(this);

    this.background;
    // let doors;

    this.enemiesArray = [];
    this.boxesArray = [];
    this.SCROLL_POST_RIGHT = 800;
    this.SCROLL_POST_TOP = 400;
    // const SCROLL_POST_BOTTOM = -100;

    this.camera = {
      x: 0,
      y: 0,
    };

    this.level = 1;

    this.collisionBlocks = [];
    this.collisionPlatforms = [];
    this.blockSize = 64;

    this.initLevel();

    // ===================================================================================================================
    //                                                                                                     Event Listeners
    // ===================================================================================================================
    window.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowUp':
          // Проверка Если ускорение равно нулю, то только
          // тогда сможем сделать прыжок
          // -10px на кадр
          if (this.player.velocity.y === 0 && !this.player.keys.w.pressed) {
            this.player.velocity.y = -25;
          }
          this.player.keys.w.pressed = true;
          if (this.player.velocity.y === 0) {
            this.player.keys.w.pressed = false;
          }
          break;

        case 'ArrowLeft':
          this.player.keys.a.pressed = true;
          break;
        case 'ArrowRight':
          this.player.keys.d.pressed = true;
          break;
        case ' ':
          this.player.keys.space.pressed = true;
          break;
      }
    });

    window.addEventListener('keyup', (event) => {
      switch (event.key) {
        case 'ArrowUp':
          this.player.keys.w.pressed = false;
          break;
        case 'ArrowLeft':
          this.player.keys.a.pressed = false;
          this.player.velocity.x = 0;
          break;
        case 'ArrowRight':
          this.player.keys.d.pressed = false;
          this.player.velocity.x = 0;
          break;
        case ' ':
          this.player.keys.space.pressed = false;
          break;
      }
    });
  }

  // initPlayer1() {
  //   const name = this.gameUi.player1name.value;
  //   if (this.gameUi.player1controls.value === 'arrows') {
  //     this.player1 = new Keyboard1(this, 0, this.topMargin, 1, 0, 'gold', name);
  //   } else {
  //     this.player1 = new ComputerAi(
  //       this,
  //       0,
  //       this.topMargin,
  //       1,
  //       0,
  //       'gold',
  //       name
  //     );
  //   }
  // }

  // start() {
  //   if (!this.gameOver) {
  //     this.gameUi.triggerGameOver();
  //   } else {
  //     this.gameOver = false;
  //     this.gameUi.gamePlayUi();
  //     this.initPlayer1();

  //     this.food = new Food(this);
  //     this.gameObjects = [
  //       this.player1,
  //       this.player2,
  //       this.player3,
  //       this.player4,
  //       this.food,
  //     ];
  //     this.ctx.clearRect(0, 0, this.width, this.height);
  //   }
  // }

  // checkCollision(a, b) {
  //   return a.x === b.x && a.y === b.y;
  // }

  // handlePeriodicEvents(deltaTime) {
  //   if (this.eventTimer < this.eventInterval) {
  //     this.eventTimer += deltaTime;
  //     this.eventUpdate = false;
  //   } else {
  //     this.eventTimer = 0;
  //     this.eventUpdate = true;
  //   }
  // }

  // ===================================================================================================================
  //                                                                                                         initLevel()
  // ===================================================================================================================
  initLevel() {
    this.background = new Background(this, {
      position: { x: 0, y: 0 },
      imageSrc: `./../../img/${levels[this.level].background.image}.png`,
    });

    levels[this.level].collisions.forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (symbol === 296) {
          this.collisionBlocks.push(
            new CollisionBlock({
              x: x * this.blockSize,
              y: y * this.blockSize,
              size: this.blockSize,
            })
          );
        } else if (symbol === 297) {
          this.collisionPlatforms.push(
            new CollisionPlatform({
              x: x * this.blockSize,
              y: y * this.blockSize,
              width: 64,
              height: 4,
            })
          );
        }
      });
    });

    levels[this.level].enemies.forEach((enemy) => {
      this.enemiesArray.push(new Enemy(this, enemy));
    });

    levels[this.level].boxes.forEach((box) => {
      this.boxesArray.push(new DynamicGameObject(this, box));
    });

    this.player = new Player(this);
  }

  // ===================================================================================================================
  //                                                                                                            render()
  // ===================================================================================================================
  render(deltaTime) {
    this.player.handleInput();
    this.player.update();
    this.enemiesArray.forEach((enemy) => {
      enemy.update();
    });
    this.boxesArray.forEach((box) => {
      box.update();
    });



    // Track scroll post distance
    if (this.player.position.x > this.SCROLL_POST_RIGHT) {
      const scrollPostDistance =
        this.player.position.x - this.SCROLL_POST_RIGHT;
      this.camera.x = scrollPostDistance;
    }

    if (this.player.position.y < this.SCROLL_POST_TOP && this.camera.y > 0) {
      const scrollPostDistance = this.SCROLL_POST_TOP - this.player.position.y;
      this.camera.y = scrollPostDistance;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(-this.camera.x, this.camera.y);
    this.background.draw();
    // this.enemy1.draw();
    // this.enemy2.draw();
    // this.enemy3.draw();

    this.enemiesArray.forEach((enemy) => {
      enemy.draw();
    });

    this.boxesArray.forEach((enemy) => {
      enemy.draw();
    });
    this.player.draw();
    ctx.restore();
    //   this.handlePeriodicEvents(deltaTime);
    //   if (this.eventUpdate && !this.gameOver) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    // this.background.draw();
    //     // this.drawGrid();
    //     this.gameObjects.forEach((object) => {
    //       object.update();
    //       object.draw();
    //       // this.drawStatusText();
    //     });
    //     this.gameUi.update();
    //   }
  }
}
