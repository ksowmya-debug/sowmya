// 1. Create Floating Petals
const petalContainer = document.getElementById('petal-container');

function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    
    // Randomize petal properties
    const size = Math.random() * 15 + 10 + 'px';
    petal.style.width = size;
    petal.style.height = size;
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.animationDuration = Math.random() * 5 + 5 + 's';
    
    petalContainer.appendChild(petal);
    
    // Clean up petals after they fall
    setTimeout(() => {
        petal.remove();
    }, 10000);
}

// Generate a petal every 300ms
setInterval(createPetal, 300);

// 2. Age Counter Animation with Intersection Observer
const counter = document.getElementById('age-counter');
let counterTriggered = false;

const ageObserver = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting && !counterTriggered) {
        startCounter();
        counterTriggered = true;
    }
}, { threshold: 0.5 });

ageObserver.observe(document.getElementById('age-section'));

function startCounter() {
    let current = 0;
    const target = 18;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 100);

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.innerText = target;
            clearInterval(timer);
            triggerConfetti();
        } else {
            counter.innerText = Math.floor(current);
        }
    }, 100);
}

// 3. Confetti Burst
function triggerConfetti() {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#F7CAC9', '#D4AF37']
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#F7CAC9', '#D4AF37']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// 4. Music Player Toggle
const audio = document.getElementById('bday-music');
const musicBtn = document.getElementById('musicBtn');

musicBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        musicBtn.innerText = "Pause Music";
    } else {
        audio.pause();
        musicBtn.innerText = "Play Music";
    }
});