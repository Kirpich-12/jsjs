const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('color');
const sizePicker = document.getElementById('size');
const clearBtn = document.getElementById('clear');
const circleBtn = document.getElementById('circle');
const lineBtn = document.getElementById('line');

// Размер canvas
canvas.width = 800;
canvas.height = 500;

let drawing = false;
let lastX = 0;
let lastY = 0;
let mode = 'line';


circleBtn.addEventListener('click', () => mode = 'circle');
lineBtn.addEventListener('click', () => mode = 'line');

// Начало рисования
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    const rect = canvas.getBoundingClientRect();
    lastX = e.clientX - rect.left;
    lastY = e.clientY - rect.top;


    if (mode === 'circle') draw(e);
});

canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mouseout', () => drawing = false);

// Рисование
canvas.addEventListener('mousemove', draw);

function draw(e) {
    if (!drawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.strokeStyle = colorPicker.value;
    ctx.fillStyle = colorPicker.value;
    ctx.lineWidth = sizePicker.value;
    ctx.lineCap = 'round';

    if (mode === 'line') {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        lastX = x;
        lastY = y;
    } else if (mode === 'circle') {
        ctx.beginPath();
        ctx.arc(x, y, sizePicker.value, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Очистка
clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
