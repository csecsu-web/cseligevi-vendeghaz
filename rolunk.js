// Fade-in animáció scrollra
const faders = document.querySelectorAll('.fade-slide');
const footer = document.querySelector('footer');

const appearOptions = { threshold: 0.2, rootMargin:"0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver(function(entries){
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('active');
        }
    });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// Footer fade-in
const footerObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            footer.style.opacity = 1;
        }
    });
}, {threshold:0.1});
footerObserver.observe(footer);
