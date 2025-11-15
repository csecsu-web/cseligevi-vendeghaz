// animation.js

document.addEventListener("DOMContentLoaded", function() {
    // ===== HERO FADE-ANIMÁCIÓ =====
    const hero = document.querySelector('.hero, .rolunk-text'); // főoldal és rólunk hero szöveg
    if (hero) {
        hero.classList.add('fade-slide');
        setTimeout(() => {
            hero.classList.add('active');
        }, 100); // kis késleltetés, hogy a fade látsszon
    }

    // ===== SCROLL-ANIMÁCIÓ MINDEN .fade-slide OSZTÁLYÚ ELEMHEZ =====
    const faders = document.querySelectorAll('.fade-slide');

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // csak egyszer animálódjon
            }
        });
    }, {
        threshold: 0.2 // amikor 20%-a látszik
    });

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});

