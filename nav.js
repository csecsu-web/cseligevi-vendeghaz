// NAVBAR HTML BETÖLTÉSE
document.addEventListener("DOMContentLoaded", async () => {
    // HA NEM HASZNÁLSZ KÜLÖN HTML BETÖLTÉST, TÖRÖLD EZT A BLOKKOT!
    // Feltételezve, hogy a <div id="navbar-container"> tartja a navbart
    const navPlaceholder = document.getElementById("navbar-container");

    if (navPlaceholder) {
        try {
            const response = await fetch("navbar.html");
            if (!response.ok) throw new Error("A navbar.html betöltése sikertelen.");
            
            const html = await response.text();
            navPlaceholder.innerHTML = html;
        } catch (error) {
            console.error(error);
            return; // Megállítja a futást, ha a betöltés sikertelen
        }
    }
    
    // Mindig fut le, ha a HTML betöltődött, vagy ha a navbar eleve benne volt a kódban
    initNavbar(); 
});

// HAMBURGER MENÜ MŰKÖDÉS
function initNavbar() {
    // A querySelector-nak a betöltött HTML elemeket kell megtalálnia.
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');

    // FIX JAVÍTÁS: Ellenőrizzük, hogy az elemek léteznek-e
    if (!hamburger) {
        console.error("Hiba: A '.hamburger' gomb nem található.");
        return;
    }
    if (!menu) {
        console.error("Hiba: A '.menu' navigációs elem nem található.");
        return;
    }

    hamburger.addEventListener('click', () => {
        // Állapot váltása:
        hamburger.classList.toggle('active');
        menu.classList.toggle('open');
        
        // Görgő tiltása a háttéren
        document.body.classList.toggle('no-scroll');
        
        // Hozzáférhetőség javítása:
        const isMenuOpen = menu.classList.contains('open');
        hamburger.setAttribute('aria-expanded', isMenuOpen);
        hamburger.setAttribute('aria-label', isMenuOpen ? 'Menü bezárása' : 'Menü megnyitása');
    });
}
