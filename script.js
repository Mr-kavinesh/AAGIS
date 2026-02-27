// GSAP optional — இல்லன்னாலும் crash ஆகாது
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

function initAnimations() {
    if (typeof gsap === 'undefined') return;
    gsap.from('.hero-title', { y: 100, opacity: 0, duration: 1, ease: 'power3.out' });
    gsap.from('.hero-subtitle', { y: 50, opacity: 0, duration: 1, delay: 0.3, ease: 'power3.out' });
    gsap.from('.cta-button', { y: 30, opacity: 0, duration: 1, delay: 0.6, ease: 'power3.out' });
    document.querySelectorAll('.workflow-step').forEach((step, index) => {
        gsap.from(step, {
            scrollTrigger: { trigger: step, start: 'top 80%', toggleActions: 'play none none reverse' },
            y: 100, opacity: 0, duration: 0.8, delay: index * 0.1, ease: 'power3.out'
        });
    });
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' },
            y: 80, opacity: 0, duration: 0.8, delay: index * 0.1, ease: 'power3.out'
        });
    });
}

// PARTICLES
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = [];
    for (let i = 0; i < 80; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25
        });
    }
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.speedX; p.y += p.speedY;
            if (p.x > canvas.width) p.x = 0;
            if (p.x < 0) p.x = canvas.width;
            if (p.y > canvas.height) p.y = 0;
            if (p.y < 0) p.y = canvas.height;
            ctx.fillStyle = 'rgba(0, 212, 255, 0.5)';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    ctx.strokeStyle = 'rgba(0, 212, 255, ' + (1 - dist / 100) + ')';
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
}

// CAROUSEL
document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".team-cards-container");
    const wrapper = document.querySelector(".carousel-wrapper");
    const cards = document.querySelectorAll(".team-card");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    if (!container || !cards.length) return;

    const total = cards.length;
    let index = 0;

    const dotsContainer = document.createElement("div");
    dotsContainer.className = "carousel-dots";
    cards.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.className = "carousel-dot" + (i === 0 ? " active" : "");
        dot.addEventListener("click", () => { index = i; update(); });
        dotsContainer.appendChild(dot);
    });
    const carousel = document.querySelector(".team-carousel");
    if (carousel) carousel.after(dotsContainer);

    function update() {
        container.style.transform = "translateX(-" + (index * 100) + "%)";
        document.querySelectorAll(".carousel-dot").forEach((d, i) => {
            d.classList.toggle("active", i === index);
        });
    }
    function nextSlide() { index = (index + 1) % total; update(); }
    function prevSlide() { index = (index - 1 + total) % total; update(); }

    if (prevBtn) prevBtn.addEventListener("click", prevSlide);
    if (nextBtn) nextBtn.addEventListener("click", nextSlide);

    if (wrapper) {
        let touchStartX = 0, touchStartY = 0;
        wrapper.addEventListener("touchstart", function (e) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        wrapper.addEventListener("touchend", function (e) {
            const diffX = touchStartX - e.changedTouches[0].clientX;
            const diffY = touchStartY - e.changedTouches[0].clientY;
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
                diffX > 0 ? nextSlide() : prevSlide();
            }
        }, { passive: true });
    }
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    });
});

// NAVBAR
let lastScroll = 0;
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (navbar) {
        navbar.style.transform = currentScroll > lastScroll && currentScroll > 100
            ? 'translateY(-100%)' : 'translateY(0)';
    }
    lastScroll = currentScroll;
});

// DISPLAY ALERTS
function displayAlerts(data) {
    const table = document.getElementById("alerts-table-body");
    if (!table) return;
    table.innerHTML = "";
    if (!data) {
        table.innerHTML = '<tr><td colspan="5" class="no-data">No alerts yet</td></tr>';
        return;
    }
    let total = 0;
    Object.values(data).reverse().forEach(alert => {
        total++;
        table.innerHTML += '<tr>' +
            '<td>AAGIS Device</td>' +
            '<td>' + (alert.lat || '-') + '</td>' +
            '<td>' + (alert.lon || '-') + '</td>' +
            '<td><span class="status-badge status-active">EMERGENCY</span></td>' +
            '<td>' + (alert.time || '-') + '</td>' +
            '</tr>';
    });
    const t = document.getElementById("total-alerts");
    const a = document.getElementById("active-alerts");
    if (t) t.textContent = total;
    if (a) a.textContent = total;
                        }
