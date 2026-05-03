/**
 * Script Principal - "El Jardín de Sarah Valentina"
 * Jenier Gereda - 2026
 */

document.addEventListener("DOMContentLoaded", function() {
    console.log("✅ Script cargado correctamente.");

    // Referencias a elementos
    const btn = document.getElementById("enter-btn");
    const overlay = document.getElementById("start-overlay");
    const content = document.getElementById("content");
    const canvas = document.getElementById("canvas");
    const audio = document.getElementById("bg-music");

    // Validación de seguridad
    if (!btn) {
        console.error("❌ ERROR: No se encontró el botón 'enter-btn'. Revisa tu HTML.");
        return;
    }

    console.log("✅ Elementos listos. Esperando clic...");

    // --- EVENTO DEL BOTÓN ---
    btn.addEventListener("click", function(e) {
        e.preventDefault();
        console.log("👆 Clic detectado. Iniciando experiencia...");

        // 1. Reproducir Audio
        if (audio) {
            audio.volume = 0.6; // Volumen al 60%
            audio.play().then(() => {
                console.log("🎵 Música reproduciéndose correctamente.");
            }).catch(error => {
                console.error("⚠️ Error al reproducir audio:", error);
                alert("Nota: El navegador bloqueó la música. Toca cualquier parte de la pantalla para activarla.");
                // Intentar activar audio con el primer clic en el cuerpo
                document.body.addEventListener('click', function activateAudio() {
                    audio.play().catch(err => console.log("Audio aún bloqueado"));
                    document.body.removeEventListener('click', activateAudio);
                }, { once: true });
            });
        } else {
            console.warn("⚠️ No se encontró el elemento de audio en el HTML.");
        }

        // 2. Ocultar pantalla de bienvenida
        overlay.style.transition = "opacity 0.8s ease";
        overlay.style.opacity = "0";
