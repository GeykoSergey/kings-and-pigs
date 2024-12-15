

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      // Проверка Если ускорение равно нулю, то только
      // тогда сможем сделать прыжок
      // -10px на кадр
      if (game.player.velocity.y === 0 && !game.player.keys.w.pressed) {
        game.player.velocity.y = -25;
      }
      game.player.keys.w.pressed = true;
      if (game.player.velocity.y === 0) {
        game.player.keys.w.pressed = false;
      }

      break;
    case 'ArrowLeft':
      game.player.keys.a.pressed = true;
      break;
    case 'ArrowRight':
      game.player.keys.d.pressed = true;
      break;
    case ' ':
      game.player.keys.space.pressed = true;
      break;
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      game.player.keys.w.pressed = false;
      break;
    case 'ArrowLeft':
      game.player.keys.a.pressed = false;
      game.player.velocity.x = 0;
      break;
    case 'ArrowRight':
      game.player.keys.d.pressed = false;
      game.player.velocity.x = 0;
      break;
    case ' ':
      game.player.keys.space.pressed = false;
      break;
  }
});
