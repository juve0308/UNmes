/**
 * Script Principal para "El Jardín de Sarah Valentina"
 * Jenier Gereda - 2026
 */

document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ Script cargado correctamente.");

    // Referencias a elementos del DOM
    const btn = document.getElementById("enter-btn");
    const overlay = document.getElementById("start-overlay");
    const content = document.getElementById("content");
    const canvas = document.getElementById("canvas");
    const audio = document.getElementById("bg-music");

    // Validación de elementos críticos
    if (!btn) {
        console.error("❌ ERROR CRÍTICO: No se encontró el botón con ID 'enter-btn'.");
        alert("Error: No se pudo cargar el botón de inicio. Por favor, recarga la página.");
        return;
    }

    if (!overlay || !content) {
        console.error("❌ ERROR CRÍTICO: Falta el contenedor de bienvenida o el contenido principal.");
        return;
    }

    console.log("✅ Elementos encontrados. Esperando interacción...");

    // --- EVENTO DEL BOTÓN ---
    btn.addEventListener("click", function(e) {
        e.preventDefault(); // Evita comportamientos por defecto
        console.log("👆 ¡Clic detectado en 'Entrar al Jardín'!");

        // 1. Reproducir Audio
        if (audio) {
            audio.volume = 0.6; // Volumen al 60%
            audio.play().then(() => {
                console.log("🎵 Música reproduciéndose correctamente.");
            }).catch(error => {
                console.warn("⚠️ El navegador bloqueó el audio automático.", error);
                // Intento de fallback: mostrar mensaje si falla
                setTimeout(() => {
                    alert("¡Bienvenida al jardín, Sarah! (Nota: Si no escuchas música, toca la pantalla en cualquier lugar).");
                }, 500);
            });
        } else {
            console.warn("⚠️ No se encontró el elemento de audio.");
        }

        // 2. Transición de Pantalla
        overlay.style.transition = "opacity 1s ease";
        overlay.style.opacity = "0";
        overlay.style.pointerEvents = "none"; // Bloquea clics mientras se desvanece

        // 3. Mostrar Contenido e Iniciar Animación
        setTimeout(() => {
            overlay.style.display = "none";
            content.style.display = "block"; // Asegura que se muestre
            
            // Iniciar el sistema de partículas (flores)
            if (canvas) {
                initFlowerSystem();
                console.log("🌸 Sistema de flores iniciado.");
            }
        }, 800); // Espera 0.8s para que termine la transición de opacidad
    });

    // --- SISTEMA DE FLORES (CANVAS) ---
    function initFlowerSystem() {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let width, height;

        // Ajustar tamaño del canvas
        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        
        window.addEventListener('resize', resize);
        resize();

        // Clase para las partículas (flores)
        class FlowerParticle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 12 + 5; // Tamaño entre 5 y 17
                this.speedX = Math.random() * 2 - 1; // Velocidad horizontal aleatoria
                this.speedY = Math.random() * 2 - 1; // Velocidad vertical aleatoria
                this.color = `hsl(${Math.random() * 60 + 330}, 80%, 70%)`; // Tonos rosados/rojos
                this.life = 100; // Vida de la partícula (100%)
                this.angle = Math.random() * Math.PI * 2;
                this.petalCount = Math.floor(Math.random() * 4) + 3; // 3 a 7 pétalos
                this.rotationSpeed = (Math.random() - 0.5) * 0.05;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY - 0.2; // Flotan lentamente hacia arriba
                this.life -= 0.6; // Pierden vida
                this.angle += this.rotationSpeed;
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.life / 100;

                // Dibujar pétalos
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

        // Manejo del mouse y touch
        let mouse = { x: null, y: null };

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
            // Crear 2 flores por movimiento de mouse
            for (let i = 0; i < 2; i++) {
                particles.push(new FlowerParticle(mouse.x, mouse.y));
            }
        });

        window.addEventListener('touchmove', (e) => {
            mouse.x = e.touches.clientX;
            mouse.y = e.touches.clientY;
            for (let i = 0; i < 2; i++) {
                particles.push(new FlowerParticle(mouse.x, mouse.y));
            }
        });

        // Bucle de animación
        function animate() {
            ctx.clearRect(0, 0, width, height);

            // Generar flores automáticamente desde abajo si no hay movimiento
            if (Math.random() < 0.15) {
                particles.push(new FlowerParticle(Math.random() * width, height + 10));
            }

            // Actualizar y dibujar cada partícula
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                // Eliminar partículas muertas
                if (particles[i].life <= 0) {
                    particles.splice(i, 1);
                    i--;
                }
            }

            requestAnimationFrame(animate);
        }

        animate();
    }
});
