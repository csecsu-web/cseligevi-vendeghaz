// Fade-in scroll
const faders = document.querySelectorAll('.fade-slide');
const options = { threshold: 0.2 };
const appearOnScroll = new IntersectionObserver(function(entries, observer){
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, options);

faders.forEach(fader => appearOnScroll.observe(fader));

// Footer fade-in
const footer = document.querySelector('footer');
const footerObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){ footer.style.opacity = 1; }
    });
},{threshold:0.1});
footerObserver.observe(footer);
