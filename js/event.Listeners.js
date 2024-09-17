window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            // Проверка Если ускорение равно нулю, то только
            // тогда сможем сделать прыжок
            // -10px на кадр
            if (player.velocity.y === 0 && !keys.w.pressed) {player.velocity.y = -15}
            keys.w.pressed = true;
            if (player.velocity.y === 0) {keys.w.pressed = false}

        break
        case 'a':
            keys.a.pressed = true;
        break
        case 'd':
            keys.d.pressed = true;
        break
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'w':
        keys.w.pressed = false;
        break
        case 'a':
        keys.a.pressed = false;
        break
        case 'd':
        keys.d.pressed = false;
        break
    }
});