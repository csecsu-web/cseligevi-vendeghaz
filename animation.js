document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.hamburger'); const menu = document.getElementById('nav-menu');
  if (btn && menu) btn.addEventListener('click', () => { const open = menu.classList.toggle('open'); btn.setAttribute('aria-expanded', open ? 'true':'false'); });
  const io = new IntersectionObserver(entries=>entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); }),{threshold:.2});
  document.querySelectorAll('.fade-in').forEach(el=>io.observe(el));
  document.querySelectorAll('.track').forEach(track=>{
    track.innerHTML += track.innerHTML;
    const items = Array.from(track.children);
    const totalW = items.reduce((w,el)=>w+el.getBoundingClientRect().width+14,0);
    const speed = Math.max(30, Math.min(80, totalW/60));
    track.style.setProperty('--duration', `${speed}s`);
  });
});
// js: animation.js (hamburger logika blokk módosítása)
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.hamburger');
  const menu = document.getElementById('nav-menu');

  if (btn && menu) {
    const closeMenu = () => {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
      document.body.classList.remove('no-scroll');
    };
    const openMenu = () => {
      menu.classList.add('open');
      btn.setAttribute('aria-expanded','true');
      document.body.classList.add('no-scroll');
    };

    btn.addEventListener('click', () => {
      if (menu.classList.contains('open')) closeMenu();
      else openMenu();
    });

    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* a többi animáció/observer maradhat változatlan */
});
