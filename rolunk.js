/* ===== FADE-IN / FADE-OUT ===== */
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.fade-slide');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if(rect.top < window.innerHeight - 100 && rect.bottom > 50){
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
});

/* ===== HAMBURGER MENÜ ===== */
function toggleMenu() {
    const nav = document.getElementById("navLinks");
    nav.classList.toggle("active");
}

/* ===== SZALAGOS KÉPGALÉRIA (OPCIONÁLIS) ===== */
function initImageTicker() {
    const tickers = document.querySelectorAll('.image-ticker-row');
    tickers.forEach((row, index) => {
        let pos = 0;
        const speed = 1 + index; // soronként eltérő sebesség
        function animate() {
            pos -= speed;
            if(Math.abs(pos) >= row.scrollWidth / 2){
                pos = 0;
            }
            row.style.transform = `translateX(${pos}px)`;
            requestAnimationFrame(animate);
        }
        animate();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if(document.querySelector('.image-ticker-row')){
        initImageTicker();
    }
});
