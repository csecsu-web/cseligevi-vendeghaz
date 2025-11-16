// HAMBURGER MENU
function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}



// SCROLL ANIMÁCIÓ
const elements = document.querySelectorAll(".fade-slide");

function animate() {
    const trigger = window.innerHeight * 0.85;

    elements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < trigger) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", animate);
window.addEventListener("load", animate);
