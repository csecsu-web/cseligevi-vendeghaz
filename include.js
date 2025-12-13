// include.js - FIXED VERSION
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Include.js started loading...');
    
    const includes = document.querySelectorAll('#navbar-container, #footer-container, [data-include]');
    
    const fetchPromises = Array.from(includes).map(async (element) => {
        let file = '';
        
        if (element.id === 'navbar-container') {
            file = 'navbar.html';
        } else if (element.id === 'footer-container') {
            file = 'footer.html';
        } else if (element.hasAttribute('data-include')) {
            file = element.getAttribute('data-include');
        }
        
        if (!file) return;
        
        try {
            console.log(`Loading ${file}...`);
            const response = await fetch(file, { cache: 'no-store' });
            
            if (!response.ok) {
                throw new Error(`Failed to load ${file}: ${response.status}`);
            }
            
            const html = await response.text();
            element.innerHTML = html;
            console.log(`${file} loaded successfully!`);
            
        } catch (error) {
            console.error(`Error loading ${file}:`, error);
            element.innerHTML = `<p style="color: red;">Error: Could not load ${file}</p>`;
        }
    });
    
    await Promise.all(fetchPromises);
    console.log('All includes loaded!');
    
    // Trigger event for nav.js to initialize
    document.dispatchEvent(new CustomEvent('includesLoaded'));
});
