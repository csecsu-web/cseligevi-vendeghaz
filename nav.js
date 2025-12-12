// NAVBAR HTML BETÖLTÉSE
document.addEventListener("DOMContentLoaded", async () => {
  const navPlaceholder = document.getElementById("navbar-container");

  if (navPlaceholder) {
    const response = await fetch("navbar.html");
    const html = await response.text();
    navPlaceholder.innerHTML = html;

    // Miután bejött a navbar, aktiválni kell a JS-t is:
    initNavbar();
  }
});

// HAMBURGER MENÜ MŰKÖDÉS
function initNavbar() {
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu');

  if (!hamburger || !menu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
  });
}
