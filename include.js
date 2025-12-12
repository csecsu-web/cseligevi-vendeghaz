// include.js

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Megkeressük az összes betöltendő elemet: #navbar-container, #footer-container, és [data-include] attribútummal rendelkező elemek
    const includes = document.querySelectorAll('#navbar-container, #footer-container, [data-include]');

    const fetchPromises = Array.from(includes).map(async (element) => {
        let file = '';

        // Meghatározzuk a betöltendő fájlt
        if (element.id === 'navbar-container') {
            file = 'navbar.html';
        } else if (element.id === 'footer-container') {
            file = 'footer.html';
        } else if (element.hasAttribute('data-include')) {
            file = element.getAttribute('data-include');
        }

        if (!file) return;

        try {
            // Cache kikapcsolása a fejlesztés alatt
            const response = await fetch(file, { cache: 'no-store' }); 
            if (!response.ok) throw new Error(`A(z) ${file} betöltése sikertelen. Státusz: ${response.status}`);
            
            const html = await response.text();
            
            // Az elem lecserélése a tartalommal
            element.innerHTML = html;
            
        } catch (error) {
            console.error(`Hiba a(z) ${file} feldolgozásakor:`, error);
            // Ha hiba van, hagyjunk egy jelzést
            element.innerHTML = `<p style="color: red;">Hiba: Nem sikerült betölteni a(z) ${file} fájlt.</p>`;
        }
    });

    // 2. Megvárjuk, amíg az összes include betöltődik
    await Promise.all(fetchPromises);
    
    // MEGJEGYZÉS: Az Ön korábbi setupMobileMenu() és setupMapButton() függvényei
    // Eltávolításra kerültek az include.js-ből, és a működésüket a nav.js (görgetés és menü)
    // és a map.js (térkép) fájlokba helyeztük át.
    
    // Ha az Ön korábbi kódja tartalmazta a setupMapButton() függvényt, 
    // valószínűleg szüksége lesz egy `map.js` fájlra. 
    // Ezt a függvényt (ha szükséges) átrakhatjuk a map.js-be!
});
