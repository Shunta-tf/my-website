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
    initContactForm();
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
        btn.classList.toggle('open');
        menu.classList.toggle('open');
    });

    menu.querySelectorAll('a').forEach(a =>
        a.addEventListener('click', () => {
            btn.classList.remove('open');
            menu.classList.remove('open');
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

    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        slides.forEach(s => {
            s.style.transform = `translateY(${y * 0.2}px)`;
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

/* ---- Contact Form ---- */
function initContactForm() {
    const form    = document.querySelector('#contact-form');
    const success = document.querySelector('#form-success');
    if (!form || !success) return;

    form.addEventListener('submit', e => {
        e.preventDefault();

        const name    = form.querySelector('[name="name"]').value.trim();
        const email   = form.querySelector('[name="email"]').value.trim();
        const message = form.querySelector('[name="message"]').value.trim();

        if (!name || !email || !message) {
            showFormError('すべての項目を入力してください。');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showFormError('有効なメールアドレスを入力してください。');
            return;
        }

        form.style.display = 'none';
        success.classList.add('show');
    });
}

function showFormError(msg) {
    let err = document.querySelector('.form-error');
    if (!err) {
        err = document.createElement('p');
        err.className = 'form-error';
        err.style.cssText = 'color:#ff6b6b;font-size:.85rem;margin-top:.75rem;';
        document.querySelector('#contact-form .form-submit')?.after(err);
    }
    err.textContent = msg;
}
