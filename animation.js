// Navbar toggle and page animations
(function(){
  function wire(){
    const btn=document.querySelector('.hamburger');
    const menu=document.getElementById('nav-menu');
    if(!btn||!menu) return false;
    const close=()=>{ menu.classList.remove('open'); btn.setAttribute('aria-expanded','false'); document.body.classList.remove('no-scroll'); };
    const open=()=>{ menu.classList.add('open'); btn.setAttribute('aria-expanded','true'); document.body.classList.add('no-scroll'); };
    btn.addEventListener('click',()=>{ menu.classList.contains('open')?close():open(); });
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
    document.addEventListener('keydown',e=>{ if(e.key==='Escape') close(); });
    return true;
  }
  if(!wire()){
    const mo=new MutationObserver(()=>{ if(wire()) mo.disconnect(); });
    mo.observe(document.body,{childList:true,subtree:true});
    document.addEventListener('DOMContentLoaded', wire);
  }
})();

// GSAP clip-path reveal
if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('.clip').forEach(el=>{
    gsap.fromTo(el,{ clipPath:'inset(100% 0 0 0)', opacity:0 },{ clipPath:'inset(0 0 0 0)', opacity:1, duration:.8, ease:'power2.out', scrollTrigger:{ trigger:el, start:'top 85%' }});
  });
}
