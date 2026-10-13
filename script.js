// Typing Effect
const typingText = document.getElementById('typing-text');
const words = ['modern web apps', 'full-stack solutions', 'beautiful interfaces', 'scalable systems'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 120;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
}

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Staggered Reveal on Scroll
const revealElements = document.querySelectorAll(
    '.reveal, .stat-card, .skill-category, .timeline-item, .project-card, .contact-item, .info-item'
);

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.88;

    revealElements.forEach((el, index) => {
        const elTop = el.getBoundingClientRect().top;
        if (elTop < triggerBottom) {
            // Stagger delay based on siblings
            const parent = el.parentElement;
            const siblings = parent ? Array.from(parent.children).filter(
                child => child.classList.contains(el.classList[0])
            ) : [];
            const siblingIndex = siblings.indexOf(el);
            const delay = siblingIndex >= 0 ? siblingIndex * 0.1 : 0;

            el.style.transitionDelay = `${delay}s`;
            el.classList.add('active');
        }
    });
};

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
});

const style = document.createElement('style');
style.innerHTML = `
    .reveal.active, .stat-card.active, .skill-category.active, 
    .timeline-item.active, .project-card.active, .contact-item.active,
    .info-item.active {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

window.addEventListener('scroll', revealOnScroll);

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-times');
        document.body.style.overflow = 'hidden';
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
        document.body.style.overflow = '';
    }
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
        document.body.style.overflow = '';
    });
});

// Particle Effect — Purple/Pink palette
const canvas = document.getElementById('hero-particles');
const ctx = canvas.getContext('2d');
let particles = [];

const particleColors = [
    'rgba(168, 85, 247,',   // purple
    'rgba(236, 72, 153,',   // pink
    'rgba(192, 132, 252,',  // light purple
    'rgba(244, 114, 182,',  // light pink
    'rgba(251, 146, 60,',   // orange accent
];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = Math.random() * 0.6 - 0.3;
        this.speedY = Math.random() * 0.6 - 0.3;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) {
            this.reset();
        }
    }

    draw() {
        ctx.fillStyle = `${this.color} ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    const count = window.innerWidth < 768 ? 35 : 60;
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                const opacity = (1 - distance / 120) * 0.08;
                ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

// Counter Animation
const stats = document.querySelectorAll('.stat-card h3');
let statsAnimated = false;

const animateStats = () => {
    if (statsAnimated) return;
    statsAnimated = true;

    stats.forEach(stat => {
        const text = stat.textContent;
        const target = parseFloat(text);
        const suffix = text.includes('+') ? '+' : '';
        const isDecimal = text.includes('.');
        let count = 0;
        const duration = 1500;
        const startTime = performance.now();

        const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            count = easeOut * target;

            if (isDecimal) {
                stat.innerText = count.toFixed(2) + suffix;
            } else {
                stat.innerText = Math.floor(count) + suffix;
            }

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                stat.innerText = (isDecimal ? target.toFixed(2) : target) + suffix;
            }
        };
        requestAnimationFrame(updateCount);
    });
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const aboutSection = document.querySelector('#about');
if (aboutSection) statsObserver.observe(aboutSection);

// Scroll Top Button
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'light') {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
}

themeToggle.addEventListener('click', () => {
    let theme = 'dark';
    if (body.getAttribute('data-theme') !== 'light') {
        body.setAttribute('data-theme', 'light');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        theme = 'light';
    } else {
        body.removeAttribute('data-theme');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
    localStorage.setItem('theme', theme);
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalHTML = btn.innerHTML;

        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
            contactForm.reset();

            setTimeout(() => {
                btn.disabled = false;
                btn.innerHTML = originalHTML;
                btn.style.background = '';
            }, 3000);
        }, 1500);
    });
}

// Smooth anchor scrolling with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    type();
    revealOnScroll();
    initParticles();
    animateParticles();
});
