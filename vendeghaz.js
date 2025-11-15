function toggleMenu(){
    const nav=document.getElementById("navLinks");
    nav.classList.toggle("active");
}

// Scroll animáció
const faders=document.querySelectorAll(".fade-slide");
const observer=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("active");
        }
    });
},{threshold:0.2});

// Marquee képek folyamatos
const marquees=document.querySelectorAll(".marquee-row");
marquees.forEach(marquee=>{observer.observe(marquee);});
faders.forEach(fader=>observer.observe(fader));

// Footer fade-in scroll
const footer=document.querySelector("footer");
const footerObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            footer.style.opacity="1";
        }
    });
},{threshold:0.2});
footerObserver.observe(footer);
