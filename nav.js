// nav.js - Mobile-Friendly Version
document.addEventListener("DOMContentLoaded", () => {
    console.log('Nav.js loaded');
    setTimeout(initNavbar, 300);
});

function initNavbar() {
    console.log('Initializing navbar...');
    
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu a');

    if (!navbar || !hamburger || !menu) {
        console.error("Navbar elements not found, retrying...");
        setTimeout(initNavbar, 300);
        return;
    }

    console.log('Navbar elements found!');

    // HAMBURGER MENU TOGGLE
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Hamburger clicked!');
        toggleMenu();
    });

    // Also make it work on touch
    hamburger.addEventListener('touchend', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Hamburger touched!');
        toggleMenu();
    });

    // Close menu when clicking links
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menu.classList.contains('open')) {
                console.log('Menu link clicked, closing menu');
                toggleMenu();
            }
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('open')) {
            toggleMenu();
        }
    });

    function toggleMenu() {
        const isOpen = menu.classList.toggle('open');
        hamburger.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        
        hamburger.setAttribute('aria-expanded', isOpen);
        hamburger.setAttribute('aria-label', isOpen ? 'Menü bezárása' : 'Menü megnyitása');
        
        console.log('Menu is now:', isOpen ? 'OPEN' : 'CLOSED');
    }

    // DESKTOP SCROLL BEHAVIOR
    let lastScrollTop = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    function handleScroll() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Only on desktop (wider than 768px)
        if (window.innerWidth > 768) {
            // Background color change
            if (currentScroll > 100) {
                navbar.style.backgroundColor = 'var(--color-bg-base)';
            } else {
                navbar.style.backgroundColor = 'transparent';
            }

            // Hide/show navbar
            if (currentScroll > lastScrollTop && currentScroll > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            // Mobile: always visible with background
            navbar.style.backgroundColor = 'var(--color-bg-base)';
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }
    
    console.log('Navbar initialized successfully!');
}
