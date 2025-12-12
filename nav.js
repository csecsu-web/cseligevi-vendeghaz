document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu');

  if (!hamburger || !menu) return; // ha valami hiányzik, ne dobjon hibát

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
  });
});
