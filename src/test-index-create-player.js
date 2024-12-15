const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 768;

// Player
// Начальная координата верха игрока
let y = 100;

// Высота игрока
const height = 100;
// Координата низа игрока
let bottom = y + height;

// Цикл анимации
// В цикле каждый раз перерисовываем игровую зону и
// игрока со смещением по у
function animate() {
    window.requestAnimationFrame(animate);

    // Игровая зона (равна канвас)
    c.fillStyle = '#f5f5f5';
    c.fillRect(0, 0, canvas.width, canvas.height);

    // Игрок
    c.fillStyle = '#aed581';
    c.fillRect(100, y, 100, height);

    // Пока координата низа игрока меньше высоты канваса
    // y++; и обновляем координату низа игрока bottom = y + height;
    if (bottom < canvas.height) {
        y++;
        bottom = y + height;
    }
}

animate();