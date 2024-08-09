// Ejemplo de una animación simple para el saludo
document.addEventListener('DOMContentLoaded', function () {
    const greeting = document.querySelector('.gestor-greeting');

    // Parpadeo del saludo cada 2 segundos
    setInterval(() => {
        greeting.style.visibility = greeting.style.visibility === 'hidden' ? 'visible' : 'hidden';
    }, 2000);
});
