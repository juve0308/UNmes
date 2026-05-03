const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];

// Ajustar tamaño del canvas
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Clase para las "Flores" (Partículas)
class FlowerParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 15 + 5;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `hsl(${Math.random() * 60 + 330}, 100%, 70%)`; // Rosas y rojos
        this.life = 100;
        this.angle = Math.random() * Math.PI * 2;
        this.petalCount = Math.floor(Math.random() * 4) + 3; // 3 a 7 pétalos
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.5;
        this.angle += 0.05;
        this.speedY -= 0.02; // Flotar hacia arriba
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life / 100;

        // Dibujar una flor simple (pétalos)
        for (let i = 0; i < this.petalCount; i++) {
            ctx.rotate((Math.PI * 2) / this.petalCount);
            ctx.beginPath();
            ctx.ellipse(0, this.size / 2, this.size / 4, this.size / 2, 0, 0, Math.PI * 2);
            ctx.fill();
        }
        // Centro de la flor
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 5, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();

        ctx.restore();
    }
}

// Manejo del mouse
let mouse = { x: null, y: null };
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    for (let i = 0; i < 3; i++) {
        particles.push(new FlowerParticle(mouse.x, mouse.y));
    }
});

window.addEventListener('touchmove', (e) => {
    mouse.x = e.touches.clientX;
    mouse.y = e.touches.clientY;
    for (let i = 0; i < 3; i++) {
        particles.push(new FlowerParticle(mouse.x, mouse.y));
    }
});

// Animación
function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Generar flores automáticamente de vez en cuando
    if (Math.random() < 0.1) {
        particles.push(new FlowerParticle(Math.random() * width, height));
    }

    for (let i = 0; i < particles.length; i
