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
window.addEventListener('scroll', () => {
    const fadeEls = document.querySelectorAll('.fade-slide');
    fadeEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add('active');
        }
    });
});

// Az oldal betöltésekor az első sor fade-in
window.addEventListener('load', () => {
    const firstFade = document.querySelector('.fade-slide');
    if (firstFade) firstFade.classList.add('active');
});

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});

// Fade-in scroll animáció
const faders = document.querySelectorAll('.fade-slide');
const footer = document.querySelector('footer');

const appearOptions = {
    threshold: 0.2
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        appearOnScroll.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// Footer külön: csak amikor látható
const footerObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            footer.classList.add('show');
        }
    });
}, { threshold: 0.1 });

footerObserver.observe(footer);
