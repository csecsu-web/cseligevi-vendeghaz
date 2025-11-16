document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.hamburger'); const menu = document.getElementById('nav-menu');
  if (btn && menu) {
    btn.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true':'false');
    });
  }
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
  },{threshold:.2});
  document.querySelectorAll('.fade-in').forEach(el=>io.observe(el));
  const lb = document.createElement('div'); lb.className='lightbox'; lb.innerHTML='<img alt=""><button class="btn btn-outline" style="position:absolute;top:14px;right:14px">Bezár</button>';
  document.body.appendChild(lb);
  const lbImg = lb.querySelector('img'); lb.addEventListener('click',e=>{ if(e.target===lb) lb.classList.remove('open'); });
  lb.querySelector('button').addEventListener('click',()=>lb.classList.remove('open'));
  document.querySelectorAll('[data-lightbox]').forEach(img=>{
    img.addEventListener('click',()=>{ lbImg.src = img.src; lb.classList.add('open'); });
  });
  const map = document.getElementById('lazy-map');
  if(map){
    const btnLoad = map.querySelector('button');
    btnLoad.addEventListener('click',()=>{
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.google.com/maps?q=8MRP%2BC4%20Szeksz%C3%A1rd&output=embed';
      iframe.loading='lazy'; iframe.referrerPolicy='no-referrer-when-downgrade'; iframe.style='border:0;width:100%;height:100%';
      map.innerHTML=''; map.appendChild(iframe);
    });
  }
});
