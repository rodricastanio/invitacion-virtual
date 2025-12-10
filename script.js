// Configuración de la fecha del evento
const eventDate = new Date('2025-11-15T21:30:00');

// Función para actualizar el contador
function updateCountdown() {
    const now = new Date();
    const timeDiff = eventDate - now;

    if (timeDiff <= 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Inicializar contador
updateCountdown();
setInterval(updateCountdown, 1000);

// Funcionalidad de los modales
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close-modal');

// Función para abrir modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Función para cerrar modal
function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event listeners para cerrar modales
closeButtons.forEach(button => {
    button.addEventListener('click', function () {
        const modal = this.closest('.modal');
        closeModal(modal);
    });
});

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener('click', function (event) {
    modals.forEach(modal => {
        if (event.target === modal) {
            closeModal(modal);
        }
    });
});

// Botones para abrir modales
document.querySelector('.btn-llegar').addEventListener('click', () => openModal('mapModal'));
document.querySelector('.btn-confirmar').addEventListener('click', () => openModal('confirmModal'));
document.querySelector('.btn-cbu').addEventListener('click', () => openModal('giftModal'));
document.querySelector('.btn-ver-mas').addEventListener('click', () => openModal('dresscodeModal'));

// Funcionalidad de confirmación de asistencia
document.querySelectorAll('.btn-confirm-yes, .btn-confirm-no').forEach(button => {
    button.addEventListener('click', function () {
        const response = this.getAttribute('data-response');

        let message = `Hola Luciana! `;

        if (response === 'si') {
            message += `¡Sí, voy a asistir a tus 15 años!`;
        } else {
            message += `Lamentablemente no podré asistir a tus 15 años. ¡Te deseo una feliz celebración!`;
        }

        // Codificar el mensaje para URL
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/5491136659845?text=${encodedMessage}`;

        // Abrir WhatsApp
        window.open(whatsappUrl, '_blank');

        // Cerrar modal después de un breve retraso
        setTimeout(() => {
            closeModal(document.getElementById('confirmModal'));
        }, 500);
    });
});

// Funcionalidad de copiar alias
document.getElementById('btnCopy').addEventListener('click', function () {
    const aliasText = document.getElementById('aliasText').textContent;

    // Usar la API del portapapeles moderna
    navigator.clipboard.writeText(aliasText).then(() => {
        // Mostrar feedback visual
        const originalText = this.innerHTML;
        this.innerHTML = '<span class="copy-icon">✅</span> ¡Copiado!';
        this.classList.add('copied');

        // Restaurar después de 2 segundos
        setTimeout(() => {
            this.innerHTML = originalText;
            this.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        // Fallback para navegadores más antiguos
        const textArea = document.createElement('textarea');
        textArea.value = aliasText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        // Mostrar feedback visual
        const originalText = this.innerHTML;
        this.innerHTML = '<span class="copy-icon">✅</span> ¡Copiado!';
        this.classList.add('copied');

        // Restaurar después de 2 segundos
        setTimeout(() => {
            this.innerHTML = originalText;
            this.classList.remove('copied');
        }, 2000);
    });
});

// Funcionalidad del botón de música (placeholder)
document.querySelector('.music-button').addEventListener('click', function () {
});

// Botón agendar (placeholder)
document.querySelector('.btn-agendar').addEventListener('click', function () {
});

// Agrega esto en tu script.js

// Variables para control de música
let isMusicPlaying = false;
const backgroundMusic = document.getElementById('backgroundMusic');

// Función para reproducir música
function playBackgroundMusic() {
    // Para evitar restricciones de autoplay, lo iniciamos con interacción del usuario
    backgroundMusic.volume = 0.5; // Volumen al 50%
    backgroundMusic.play().then(() => {
        isMusicPlaying = true;
        document.querySelector('.music-button').classList.add('playing');
    }).catch(error => {
        console.log('Autoplay bloqueado, necesitará interacción del usuario');
    });
}

// Función para pausar música
function pauseBackgroundMusic() {
    backgroundMusic.pause();
    isMusicPlaying = false;
    document.querySelector('.music-button').classList.remove('playing');
}

// Función para toggle (alternar) música
function toggleMusic() {
    if (isMusicPlaying) {
        pauseBackgroundMusic();
    } else {
        playBackgroundMusic();
    }
}

// Event listener para el botón de música
document.querySelector('.music-button').addEventListener('click', function() {
    toggleMusic();
});

// Intentar reproducir automáticamente después de la interacción del usuario
document.addEventListener('click', function firstInteraction() {
    if (!isMusicPlaying) {
        playBackgroundMusic();
    }
    document.removeEventListener('click', firstInteraction);
});

// También intentar con scroll
document.addEventListener('scroll', function firstScroll() {
    if (!isMusicPlaying) {
        playBackgroundMusic();
    }
    document.removeEventListener('scroll', firstScroll);
}, { once: true });

// Pausar música cuando la página pierde el foco
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        backgroundMusic.pause();
    } else if (isMusicPlaying) {
        backgroundMusic.play();
    }
});

// En tu script.js
document.querySelector('.btn-agendar').addEventListener('click', function() {
    // Datos del evento
    const eventData = {
        title: '15 Años de Luciana',
        description: 'Celebración de los 15 años de Luciana - Una noche mágica, inolvidable y única',
        location: 'Salón La Paloma 3, Av. Vergara 5518, Berazategui',
        startDate: '20251115T213000',
endDate: '20251116T043000'
    };
    
    // Crear URL para Google Calendar
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventData.title)}&dates=${eventData.startDate}/${eventData.endDate}&details=${encodeURIComponent(eventData.description)}&location=${encodeURIComponent(eventData.location)}`;
    
    // Abrir Google Calendar
    window.open(googleCalendarUrl, '_blank');
});
