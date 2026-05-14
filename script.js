document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('load', () => {
        setTimeout(() => document.getElementById('preloader')?.classList.add('hidden'), 1200);
    });

    const cursor = document.getElementById('cursor');
    if (cursor && window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        document.querySelectorAll('a, button, .model-card, .advantage-card, .pricing-card').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    } else if (cursor) {
        cursor.style.display = 'none';
    }

    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => nav?.classList.toggle('scrolled', window.scrollY > 50));

    window.toggleMobileMenu = () => document.getElementById('mobileMenu')?.classList.toggle('active');
    window.closeMobileMenu = () => document.getElementById('mobileMenu')?.classList.remove('active');

    
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const p = document.createElement('div'); p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 8 + 's';
            p.style.animationDuration = (5 + Math.random() * 5) + 's';
            p.style.width = p.style.height = (1 + Math.random() * 2) + 'px';
            particlesContainer.appendChild(p);
        }
    }

    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));

   
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.allin');
        if (hero && window.scrollY < window.innerHeight) {
            hero.style.transform = `translateY(${window.scrollY * 0.25}px)`;
            hero.style.opacity = 1 - (window.scrollY / window.innerHeight) * 1.1;
        }
    });

    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                window.closeMobileMenu();
            }
        });
    });

    
    window.handleSubmit = (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('.form-submit');
        if (!btn) return;
        const originalText = btn.textContent;
        btn.textContent = 'Отправлено ✓';
        btn.style.background = '#2ecc71';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            e.target.reset();
        }, 3000);
    };

    
    const modal = document.getElementById('pricingModal');
    const modalClose = document.getElementById('modalClose');
    const pricingButtons = document.querySelectorAll('.pricing-btn[data-plan]');
    const modalTitle = document.getElementById('modalTitle');
    const modalForm = document.getElementById('modalForm');
    const selectedPlanInput = document.getElementById('selectedPlan');

    function openModal(plan) {
        if (!modal) return;
        modalTitle.textContent = `Пакет «${plan}»`;
        selectedPlanInput.value = plan;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    pricingButtons.forEach(btn => btn.addEventListener('click', () => openModal(btn.dataset.plan)));
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    if (modalForm) {
        modalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = modalForm.querySelector('.modal-submit');
            const originalText = btn.textContent;
            btn.textContent = 'Заявка отправлена ✓';
            btn.style.background = '#2ecc71';
            setTimeout(() => {
                closeModal();
                btn.textContent = originalText;
                btn.style.background = '';
                modalForm.reset();
            }, 2000);
        });
    }

    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            window.closeMobileMenu();
        }
    });
});