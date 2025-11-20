document.addEventListener('DOMContentLoaded', async () => {
    const includes = document.querySelectorAll('[data-include], #navbar-container');

    const includePromises = Array.from(includes).map(async (el) => {
        let path = el.dataset.include || 'navbar.html';
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

    await Promise.all(includePromises);

    setupMobileMenu();
});

function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.navbar .menu');
    const body = document.body;

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            body.classList.toggle('no-scroll');

            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
        });
    }
}
