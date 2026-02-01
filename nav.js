// nav.js - FIXED FOR MOBILE
document.addEventListener("DOMContentLoaded", () => {
    console.log('Nav.js loaded');
    // Wait for includes to load
    setTimeout(initNavbar, 500);
});

function initNavbar() {
    console.log('Initializing navbar...');
    
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu a');

    if (!navbar || !hamburger || !menu) {
        console.error("Navbar elements not found, retrying...");
        setTimeout(initNavbar, 500);
        return;
    }

    console.log('Navbar elements found!');

    // CRITICAL FIX: Multiple event listeners for mobile
    function toggleMenu(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        const isOpen = menu.classList.toggle('open');
        hamburger.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        
        hamburger.setAttribute('aria-expanded', isOpen);
        hamburger.setAttribute('aria-label', isOpen ? 'Menü bezárása' : 'Menü megnyitása');
        
        console.log('Menu toggled:', isOpen ? 'OPEN' : 'CLOSED');
    }

    // HAMBURGER - Click event
    hamburger.addEventListener('click', toggleMenu, { passive: false });

    // HAMBURGER - Touch event (CRITICAL FOR MOBILE)
    hamburger.addEventListener('touchend', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    }, { passive: false });

    // Close menu when clicking links
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (menu.classList.contains('open')) {
                console.log('Menu link clicked, closing menu');
                toggleMenu();
            }
        });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('open')) {
            toggleMenu();
        }
    });

    // SCROLL BEHAVIOR
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

        // Only on desktop
        if (window.innerWidth > 768) {
            // Add scrolled class for background
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar
            if (currentScroll > lastScrollTop && currentScroll > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            // Mobile: always visible with background
            navbar.classList.add('scrolled');
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }
    
    console.log('Navbar initialized successfully!');
}
