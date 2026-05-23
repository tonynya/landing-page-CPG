document.addEventListener('DOMContentLoaded', () => {
    // ================================================
    // NAVBAR SCROLL EFFECT
    // ================================================
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // ================================================
    // HAMBURGER MENU
    // ================================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('open'));
        });
    }

    // ================================================
    // INTERSECTION OBSERVER — SCROLL ANIMATIONS
    // ================================================
    const observerOptions = { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0.15 };
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const parent = entry.target.parentElement;
                const siblings = Array.from(parent.children).filter(
                    el => el.classList.contains('catalogue-card') || el.classList.contains('feature-card') || el.classList.contains('stat-item') || el.classList.contains('process-step') || el.classList.contains('why-item') || el.classList.contains('service-card')
                );
                // Si l'élément n'a pas de frères du même type (ou qu'on ne gère pas bien le parent), on le met à 0.
                const index = Math.max(0, siblings.indexOf(entry.target));
                setTimeout(() => entry.target.classList.add('visible'), index * 120);
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.catalogue-card, .feature-card, .stat-item, .process-step, .why-item, .service-card').forEach(el => {
        animateOnScroll.observe(el);
    });

    // ================================================
    // STATS COUNTER ANIMATION
    // ================================================
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const numEl = item.querySelector('.stat-number');
                const target = parseInt(item.dataset.target);
                const suffix = item.dataset.suffix || '';
                const duration = 2000;
                const startTime = performance.now();

                const animate = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    numEl.textContent = Math.floor(eased * target) + suffix;
                    if (progress < 1) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
                counterObserver.unobserve(item);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-item').forEach(item => counterObserver.observe(item));

    // ================================================
    // AMBIENT PARTICLES
    // ================================================
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const p = document.createElement('div');
            p.classList.add('particle');
            p.style.left = Math.random() * 100 + '%';
            p.style.top = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 8 + 's';
            p.style.animationDuration = (6 + Math.random() * 6) + 's';
            p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
            particlesContainer.appendChild(p);
        }
    }

    // ================================================
    // SMOOTH SCROLL
    // ================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // ================================================
    // HERO FADE-IN
    // ================================================
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            });
        });
    }

    // ================================================
    // MODAL DEVIS
    // ================================================
    const contactModal = document.getElementById('contact-modal');
    const ctaDevisBtn = document.getElementById('cta-devis');
    const closeModal = document.getElementById('close-modal');

    if (ctaDevisBtn && contactModal) {
        ctaDevisBtn.addEventListener('click', (e) => {
            e.preventDefault();
            contactModal.classList.add('show');
        });
        
        closeModal.addEventListener('click', () => {
            contactModal.classList.remove('show');
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                contactModal.classList.remove('show');
            }
        });
    }
});
