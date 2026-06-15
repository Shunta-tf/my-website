/* main.js — Shunta Konno Personal Website */

document.addEventListener('DOMContentLoaded', () => {
    // Page fade-in
    requestAnimationFrame(() => document.body.classList.add('page-loaded'));

    initHeader();
    initMobileMenu();
    initScrollFade();
    initHeroSlideshow();
    initParallax();
    initProgress();
    setActiveNav();
});

/* ---- Sticky Header ---- */
function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    const update = () => header.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', update, { passive: true });
    update();
}

/* ---- Mobile Menu ---- */
function initMobileMenu() {
    const btn  = document.querySelector('.nav-hamburger');
    const menu = document.querySelector('.nav-mobile');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        const isOpen = btn.classList.toggle('open');
        menu.classList.toggle('open', isOpen);
        btn.setAttribute('aria-expanded', String(isOpen));
        btn.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
    });

    menu.querySelectorAll('a').forEach(a =>
        a.addEventListener('click', () => {
            btn.classList.remove('open');
            menu.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
            btn.setAttribute('aria-label', 'メニューを開く');
        })
    );
}

/* ---- Scroll Fade-in ---- */
function initScrollFade() {
    const els = document.querySelectorAll('.fade-in');
    if (!els.length) return;

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => obs.observe(el));
}

/* ---- Hero Slideshow ---- */
function initHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-slide');
    if (!slides.length) return;
    let current = 0;
    slides[0].classList.add('active');
    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 6000);
}

/* ---- Parallax Hero ---- */
function initParallax() {
    const slides = document.querySelectorAll('.hero-slide');
    if (!slides.length || window.innerWidth <= 768) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const y = window.scrollY;
            slides.forEach(s => {
                s.style.transform = `translateY(${y * 0.2}px)`;
            });
            ticking = false;
        });
    }, { passive: true });
}

/* ---- Progress Bar Animation ---- */
function initProgress() {
    const fill = document.querySelector('.progress-fill');
    if (!fill) return;

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                fill.style.width = fill.dataset.width || '71%';
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.3 });

    obs.observe(fill);
}

/* ---- Active Nav Link ---- */
function setActiveNav() {
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
        const href = a.getAttribute('href');
        if (href === page || (page === '' && href === 'index.html')) {
            a.classList.add('active');
        }
    });
}
