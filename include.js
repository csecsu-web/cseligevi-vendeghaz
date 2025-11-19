document.addEventListener('DOMContentLoaded', async () => {
    const includes = document.querySelectorAll('[data-include]');

    // Promise-ok gyűjtése, hogy tudjuk, mikor fejeződött be az összes include
    const includePromises = Array.from(includes).map(async (el) => {
        const path = el.getAttribute('data-include');
        if (!path) return;

        try {
            const res = await fetch(path, { cache: 'no-store' });
            if (!res.ok) throw new Error('Failed to fetch ' + path);
            const html = await res.text();
            el.innerHTML = html;
        } catch (e) {
            console.error('Include error:', e);
        }
    });

    // Megvárjuk, amíg az összes include befejeződik
    await Promise.all(includePromises);

    // A navbar menü kezelése a betöltés után
    setupMobileMenu();
});

function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;

    if (!hamburger || !navMenu) return;

    // Hamburger kattintás
    hamburger.addEventListener('click', () => {
        const opened = navMenu.classList.toggle('open');
        body.classList.toggle('no-scroll', opened);
        hamburger.setAttribute('aria-expanded', opened ? 'true' : 'false');
    });

    // Menüpontokra kattintás: menü bezárása mobilon
    navMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            navMenu.classList.remove('open');
            body.classList.remove('no-scroll');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Escape gomb: menü bezárása
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
            body.classList.remove('no-scroll');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
}
