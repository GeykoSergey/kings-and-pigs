import Game from './js/classes/Game.js';

export const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');
export const dpr = window.devicePixelRatio || 1;
canvas.width = 1920 * dpr;
canvas.height = 640 * dpr;

export const game = new Game(canvas, ctx);

let lastTime = 0;

function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  game.render(deltaTime);
  window.requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// window.addEventListener('load', function () {
// });
