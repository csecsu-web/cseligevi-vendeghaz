if(typeof gsap!=='undefined'){
  gsap.registerPlugin(ScrollTrigger);

  const path=document.getElementById('brand-path');
  if(path){
    const len=path.getTotalLength();
    path.style.strokeDasharray=len;
    path.style.strokeDashoffset=len;
    gsap.to(path,{strokeDashoffset:0,duration:1.4,ease:'power2.out'});
  }

  gsap.utils.toArray('.clip').forEach(el=>{
    gsap.fromTo(el,{clipPath:'inset(100% 0 0 0)',opacity:0},
      {clipPath:'inset(0 0 0 0)',opacity:1,duration:.8,ease:'power2.out',
       scrollTrigger:{trigger:el,start:'top 85%'}
      });
  });
}
