// include.js - Módosítás nélkül, mivel a [data-include] kezeli az új háttért is!
// ... setupMobileMenu() és setupMapButton() funkciók ...

document.addEventListener('DOMContentLoaded', async () => {
    // includes keresése: [data-include] (pl. footer, hero-background) és a fix #navbar-container
    const includes = document.querySelectorAll('[data-include], #navbar-container');

    const includePromises = Array.from(includes).map(async (el) => {
        // Meghatározza a betöltendő fájl útvonalát a data-include attribútumból
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

    // Inicializálás:
    setupMobileMenu();
    setupMapButton();
});
// ...
