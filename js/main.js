/* ============================================
   ELITE EDGE — MOVING & PAINTING
   Shared JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Page Loader ---
    const loader = document.querySelector('.page-loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => loader.remove(), 500);
            }, 300);
        });
    }

    // --- Mobile Menu ---
    const hamburger = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    function openMenu() {
        mobileMenu?.classList.add('open');
        mobileOverlay?.classList.add('open');
        hamburger?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileMenu?.classList.remove('open');
        mobileOverlay?.classList.remove('open');
        hamburger?.classList.remove('active');
        document.body.style.overflow = '';
    }

    function toggleMenu() {
        if (mobileMenu?.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    hamburger?.addEventListener('click', toggleMenu);
    
    const mobileCloseBtn = document.querySelector('.mobile-menu-close');
    mobileCloseBtn?.addEventListener('click', toggleMenu);

    mobileOverlay?.addEventListener('click', closeMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // --- Scroll-triggered Animations ---
    const animatedElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');

    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));
    }

    // --- Back to Top Button ---
    const backToTop = document.getElementById('back-to-top');

    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, { passive: true });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Nav Scroll Effect ---
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('shadow-lg');
            } else {
                nav.classList.remove('shadow-lg');
            }
        }, { passive: true });
    }

    // --- Contact Form Validation ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = contactForm.querySelector('#form-name');
            const phone = contactForm.querySelector('#form-phone');
            const email = contactForm.querySelector('#form-email');
            const message = contactForm.querySelector('#form-message');
            let valid = true;

            // Clear previous errors
            contactForm.querySelectorAll('.error-msg').forEach(el => el.remove());

            function showError(field, msg) {
                valid = false;
                const div = document.createElement('div');
                div.className = 'error-msg text-red-500 text-xs mt-1 font-bold';
                div.textContent = msg;
                field.parentElement.appendChild(div);
                field.style.borderBottomColor = '#ba1a1a';
            }

            if (name && !name.value.trim()) showError(name, 'Please enter your name');
            if (phone && !phone.value.trim()) showError(phone, 'Please enter your phone number');
            if (email && !email.value.trim()) showError(email, 'Please enter your email');
            else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) showError(email, 'Please enter a valid email');
            if (message && !message.value.trim()) showError(message, 'Please enter a message');

            if (valid) {
                // Show success state
                const btn = contactForm.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<span class="material-symbols-outlined mr-2">check_circle</span> Message Sent!';
                btn.style.backgroundColor = '#4db051';
                btn.style.color = '#002505';
                btn.disabled = true;

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                    btn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }
        });
    }

    // --- Phone Button Click Handler ---
    document.querySelectorAll('[data-phone]').forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = 'tel:4377771219';
        });
    });

    // --- Lazy Image Loading Enhancement ---
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
        }
    });

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            question?.addEventListener('click', () => {
                const isOpen = question.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    otherItem.querySelector('.faq-question')?.classList.remove('active');
                    otherItem.querySelector('.faq-answer')?.classList.remove('open');
                });
                
                // Toggle current item
                if (!isOpen) {
                    question.classList.add('active');
                    answer?.classList.add('open');
                }
            });
        });
    }

});
