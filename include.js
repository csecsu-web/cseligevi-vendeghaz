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

    // -----------------------------------------------------------------
    // ⭐️ IDE JÖN A NAV KEZELÉS, AMIKOR A HTML MÁR BIZTOSAN BE TÖLTŐDÖTT ⭐️
    // -----------------------------------------------------------------
    setupMobileMenu();
});

// A menüvezérlő funkció (nincs változás benne)
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;

    // A funkció csak akkor fut le, ha a szükséges elemeket megtalálja
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('open'); 
            body.classList.toggle('no-scroll');
            
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
        });
    }
}
