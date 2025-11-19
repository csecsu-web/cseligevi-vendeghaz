document.addEventListener('DOMContentLoaded', async () => {
  const includes = document.querySelectorAll('[data-include]');
  await Promise.all(Array.from(includes).map(async el => {
    const path = el.getAttribute('data-include');
    if(!path) return;
    const res = await fetch(path);
    el.innerHTML = await res.text();
  }));
  setupMobileMenu();
});

function setupMobileMenu(){
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.getElementById('nav-menu');
  const body = document.body;
  if(hamburger && navMenu){
    hamburger.addEventListener('click',()=>{
      const opened = navMenu.classList.toggle('open');
      body.classList.toggle('no-scroll', opened);
      hamburger.setAttribute('aria-expanded', opened ? 'true':'false');
    });
    navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navMenu.classList.remove('open');
      body.classList.remove('no-scroll');
      hamburger.setAttribute('aria-expanded','false');
    }));
  }
}
