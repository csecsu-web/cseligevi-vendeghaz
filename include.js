// include.js - Optimized version
document.addEventListener('DOMContentLoaded', async () => {
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
            const response = await fetch(file, { 
                cache: process.env.NODE_ENV === 'production' ? 'default' : 'no-store'
            });
            
            if (!response.ok) {
                throw new Error(`Failed to load ${file}: ${response.status}`);
            }
            
            const html = await response.text();
            element.innerHTML = html;
            
        } catch (error) {
            console.error(`Error loading ${file}:`, error);
            element.innerHTML = `<p style="color: #ff6b6b;">Error loading ${file}</p>`;
        }
    });
    
    await Promise.all(fetchPromises);
    
    // Dispatch custom event when includes are loaded
    document.dispatchEvent(new CustomEvent('includesLoaded'));
});
