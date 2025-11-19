
if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('.clip').forEach(el=>{
    gsap.fromTo(el,{ clipPath:'inset(100% 0 0 0)', opacity:0 },{ clipPath:'inset(0 0 0 0)', opacity:1, duration:.8, ease:'power2.out', scrollTrigger:{ trigger:el, start:'top 85%' }});
  });
}
