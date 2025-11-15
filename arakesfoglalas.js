// Scroll fade-in animáció minden elemre, ami a .fade-slide osztályt tartalmazza
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.fade-slide');
    const triggerBottom = window.innerHeight / 5 * 4;

    elements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;
        if(elTop < triggerBottom){
            el.classList.add('active');
        }
    });
});
