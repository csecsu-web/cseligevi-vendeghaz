// nav.js

document.addEventListener("DOMContentLoaded", () => {
    // Csak meghívjuk az inicializációt, miután az include.js elvégezte a munkáját
    initNavbar();
});

// HAMBURGER MENÜ ÉS GÖRGŐ VISSELKEDÉS LOGIKÁJA
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');

    // Alapvető ellenőrzés
    if (!navbar || !hamburger || !menu) {
        // Console.error("Hiba: Navbar elemek nem találhatók.");
        return;
    }

    // 1. HAMBURGER MENÜ MŰKÖDÉS
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        menu.classList.toggle('open');
        document.body.classList.toggle('no-scroll');
        
        // Hozzáférhetőség
        const isMenuOpen = menu.classList.contains('open');
        hamburger.setAttribute('aria-expanded', isMenuOpen);
        hamburger.setAttribute('aria-label', isMenuOpen ? 'Menü bezárása' : 'Menü megnyitása');
    });

    // 2. DESKTOP GÖRGŐ VISSELKEDÉS (Sticky/Eltűnő Navbar)
    let lastScrollTop = 0;
    
    // Figyeljük a görgetést
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Csak desktop nézetben alkalmazzuk az eltűnést (768px felett)
        if (window.innerWidth > 768) {
            
            // Háttérszín váltása: legyen átlátszó felül, fekete lent
            if (currentScroll > 100) {
                navbar.style.backgroundColor = 'var(--color-bg-base)';
            } else {
                navbar.style.backgroundColor = 'transparent';
            }

            // Eltüntetés görgetéskor (Csak ha lefelé görgetünk, és nem a Hero tetején vagyunk)
            if (currentScroll > lastScrollTop && currentScroll > 200) {
                // Lefelé görget: Eltüntetjük a Navbart
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Felfelé görget: Megjelenítjük a Navbart
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            // Mobilon mindig fekete a háttér, ha betöltöttük
            navbar.style.backgroundColor = 'var(--color-bg-base)';
            navbar.style.transform = 'translateY(0)'; // Mobilon ne tűnjön el
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, false);
}
