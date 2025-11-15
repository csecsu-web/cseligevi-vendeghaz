// FADE-IN
document.addEventListener("DOMContentLoaded", () => {
    const fadeElements = document.querySelectorAll(".fade-slide");
    fadeElements.forEach(el => el.classList.add("active"));
});

// SCROLL FOOTER
window.addEventListener("scroll", () => {
    const footer = document.querySelector("footer");
    const rect = footer.getBoundingClientRect();
    if(rect.top < window.innerHeight){
        footer.classList.add("active");
    }
});
