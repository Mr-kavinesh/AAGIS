
gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('main-content');

    gsap.to(loader, {
        opacity: 0,
        duration: 0.8,
        delay: 2.5,
        onComplete: () => {
            loader.style.display = 'none';
            mainContent.style.opacity = 1;
            initAnimations();
        }
    });
});

function initAnimations() {
    gsap.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });

    gsap.from('.cta-button', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out'
    });

    const workflowSteps = document.querySelectorAll('.workflow-step');
    workflowSteps.forEach((step, index) => {
        gsap.from(step, {
            scrollTrigger: {
                trigger: step,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });

    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 80,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });

    gsap.from('.dashboard-container', {
        scrollTrigger: {
            trigger: '.dashboard-container',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
}

const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = 'rgba(0, 212, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.strokeStyle = `rgba(0, 212, 255, ${1 - distance / 100})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


document.addEventListener("DOMContentLoaded", function () {

    const container = document.querySelector(".team-cards-container");
    const cards = document.querySelectorAll(".team-card");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    let index = 0;
    const visibleCards = 5;
    const autoDelay = 2500; // auto slide speed (ms)

    function getMoveAmount() {
        const cardWidth = cards[0].offsetWidth;
        const gap = 30;
        return cardWidth + gap;
    }

    function moveCarousel() {
        container.style.transform =
            `translateX(-${index * getMoveAmount()}px)`;
    }

    function nextSlide() {
        const maxIndex = cards.length - visibleCards;
        index = (index >= maxIndex) ? 0 : index + 1;
        moveCarousel();
    }

    function prevSlide() {
        const maxIndex = cards.length - visibleCards;
        index = (index <= 0) ? maxIndex : index - 1;
        moveCarousel();
    }

    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    // ✅ AUTO ROTATION
    let autoSlide = setInterval(nextSlide, autoDelay);

    // hover panna pause
    container.addEventListener("mouseenter", () => clearInterval(autoSlide));
    container.addEventListener("mouseleave", () => {
        autoSlide = setInterval(nextSlide, autoDelay);
    });

});






document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

function displayAlerts(data) {

  const table = document.getElementById("alerts-table-body");
  table.innerHTML = "";

  if (!data) {
    table.innerHTML = `<tr><td colspan="5">No alerts</td></tr>`;
    return;
  }

  let total = 0;

  Object.values(data).reverse().forEach(alert => {
    total++;

    const row = `
      <tr>
        <td>AAGIS Device</td>
        <td>${alert.lat}</td>
        <td>${alert.lon}</td>
        <td>EMERGENCY</td>
        <td>${alert.time}</td>
      </tr>
    `;

    table.innerHTML += row;
  });

  document.getElementById("total-alerts").textContent = total;
  document.getElementById("active-alerts").textContent = total;
}


