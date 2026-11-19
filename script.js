/* ==========================================
   DURGESH RANDIVE — PORTFOLIO SCRIPTS
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Dark Mode Toggle ----
    const darkModeToggle = document.getElementById('darkModeToggle');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // ---- Navbar Scroll ----
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ---- Mobile Nav Toggle ----
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
        navLinks.querySelectorAll('.nav-link').forEach(link =>
            link.addEventListener('click', () => navLinks.classList.remove('active'))
        );
    }

    // ---- Active Nav Link on Scroll ----
    const sections = document.querySelectorAll('section[id]');
    const navLinksList = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
        navLinksList.forEach(l => {
            l.classList.toggle('active', l.getAttribute('href') === '#' + current);
        });
    });

    // ---- Typing Effect ----
    const typingEl = document.getElementById('typingRole');
    if (typingEl) {
        const roles = ['Aspiring Software Engineer', 'MERN Stack Developer', 'DSA Enthusiast', 'B.Tech CSE Student'];
        let roleIndex = 0, charIndex = 0, isDeleting = false;
        function typeEffect() {
            const current = roles[roleIndex];
            typingEl.textContent = current.substring(0, charIndex);
            if (!isDeleting) {
                charIndex++;
                if (charIndex > current.length) { isDeleting = true; setTimeout(typeEffect, 2000); return; }
            } else {
                charIndex--;
                if (charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; }
            }
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
        setTimeout(typeEffect, 1500);
    }

    // ---- Animated Counters ----
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;
    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;
        statNumbers.forEach(num => {
            const target = parseInt(num.getAttribute('data-count'));
            const duration = 2000, step = target / (duration / 16);
            let current = 0;
            const timer = setInterval(() => {
                current += step;
                if (current >= target) { num.textContent = target; clearInterval(timer); }
                else num.textContent = Math.floor(current);
            }, 16);
        });
    }

    // ---- Scroll Animations ----
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Trigger counters when stats are visible
                if (entry.target.querySelector('.stat-number')) animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('[data-aos]').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ---- Smooth Scroll ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ---- Contact Form ----
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            const btn = this.querySelector('button[type="submit"]');
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;
            setTimeout(() => {
                btn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                btn.disabled = false;
            }, 5000);
        });
    }
});
