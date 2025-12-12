// nav.js - Optimized version
document.addEventListener("DOMContentLoaded", () => {
    // Wait a bit for include.js to finish
    setTimeout(initNavbar, 100);
});

function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu a');

    if (!navbar || !hamburger || !menu) {
        console.warn("Navbar elements not found");
        return;
    }

    // 1. HAMBURGER MENU
    hamburger.addEventListener('click', toggleMenu);

    // Close menu when clicking on a link
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menu.classList.contains('open')) {
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
        
        // Accessibility
        hamburger.setAttribute('aria-expanded', isOpen);
        hamburger.setAttribute('aria-label', isOpen ? 'Menü bezárása' : 'Menü megnyitása');
    }

    // 2. SCROLL BEHAVIOR
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

        // Desktop only
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
}
