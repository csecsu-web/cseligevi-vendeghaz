// Fade in/out minden fade-slide elemre
const faders = document.querySelectorAll('.fade-slide');

const appearOptions = { threshold:0.1 };

const appearOnScroll = new IntersectionObserver(function(entries, observer){
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, appearOptions);

// alkalmazzuk
faders.forEach(fader => {
    appearOnScroll.observe(fader);
});
