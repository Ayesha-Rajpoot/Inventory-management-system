/* ========================================
   MODERN INVENTORY MANAGEMENT SYSTEM - SCRIPT
   ======================================== */

// -------- Modal Functions --------
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Start Free Trial Button
const startTrialBtn = document.getElementById('startTrialBtn');
if (startTrialBtn) {
    startTrialBtn.addEventListener('click', () => {
        openModal('trialModal');
    });
}

// Watch Demo Button
const watchDemoBtn = document.getElementById('watchDemoBtn');
if (watchDemoBtn) {
    watchDemoBtn.addEventListener('click', () => {
        openModal('demoModal');
    });
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
});

// Trial Form Submission
const trialForm = document.getElementById('trialForm');
if (trialForm) {
    trialForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = trialForm.querySelector('input[type="text"]').value;
        const submitBtn = trialForm.querySelector('button');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = '✓ Trial Started!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        setTimeout(() => {
            closeModal('trialModal');
            trialForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 2000);
    });
}

// -------- Mobile Menu Toggle --------
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// -------- Smooth Scroll and Active Nav Link --------
document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// -------- Scroll Animations --------
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));

// -------- Animated Counter --------
const animateCounter = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(element => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2500;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };

        updateCounter();
    });
};

// Trigger counter animation when section is visible
const statsSection = document.querySelector('.statistics');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            animateCounter();
            entry.target.dataset.animated = 'true';
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// -------- Testimonials Slider --------
let currentSlide = 1;

const showSlide = (n) => {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');

    if (n > slides.length) {
        currentSlide = 1;
    } else if (n < 1) {
        currentSlide = slides.length;
    }

    slides.forEach(slide => {
        slide.style.display = 'none';
        slide.style.opacity = '0';
    });

    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    slides[currentSlide - 1].style.display = 'block';
    slides[currentSlide - 1].style.animation = 'fade-in-up 0.6s ease-out';
    dots[currentSlide - 1].classList.add('active');
};

const nextSlide = () => {
    currentSlide++;
    showSlide(currentSlide);
};

const prevSlide = () => {
    currentSlide--;
    showSlide(currentSlide);
};

const goToSlide = (n) => {
    currentSlide = n;
    showSlide(currentSlide);
};

// Attach event listeners to testimonial buttons
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (prevBtn) prevBtn.addEventListener('click', prevSlide);

// Auto-advance testimonials
let testimonialInterval = setInterval(nextSlide, 8000);

// Clear and reset interval on manual interaction
const resetTestimonialInterval = () => {
    clearInterval(testimonialInterval);
    testimonialInterval = setInterval(nextSlide, 8000);
};

if (nextBtn) nextBtn.addEventListener('click', resetTestimonialInterval);
if (prevBtn) prevBtn.addEventListener('click', resetTestimonialInterval);

// Initialize testimonial slider
showSlide(currentSlide);

// -------- Newsletter Form Submission --------
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Show success message
        const originalText = newsletterForm.querySelector('button').textContent;
        newsletterForm.querySelector('button').textContent = '✓ Subscribed!';
        newsletterForm.querySelector('button').style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        // Reset form
        setTimeout(() => {
            newsletterForm.reset();
            newsletterForm.querySelector('button').textContent = originalText;
            newsletterForm.querySelector('button').style.background = '';
        }, 3000);
    });
}

// -------- Quick Contact Form Submission --------
const quickContactForm = document.getElementById('quickContactForm');

if (quickContactForm) {
    quickContactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = quickContactForm.querySelector('input[type="text"]');
        const name = nameInput.value;
        
        // Show success message
        const submitBtn = quickContactForm.querySelector('button');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '✓ Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        // Reset form
        setTimeout(() => {
            quickContactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 3000);
    });
}

// -------- Navbar Scroll Effect --------
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;

    if (scrollTop > 50) {
        navbar.style.boxShadow = 'var(--shadow-md)';
    } else {
        navbar.style.boxShadow = 'var(--shadow-sm)';
    }

    lastScrollTop = scrollTop;
});

// -------- Parallax Effect --------
const dashboardMockup = document.querySelector('.dashboard-mockup');

if (dashboardMockup) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const element = dashboardMockup;
        const elementTop = element.offsetTop;
        const windowHeight = window.innerHeight;

        if (scrollY > elementTop - windowHeight) {
            const parallaxAmount = (scrollY - (elementTop - windowHeight)) * 0.5;
            element.style.transform = `translateY(${parallaxAmount}px)`;
        }
    });
}

// -------- Intersection Observer for Animations --------
const animationElements = document.querySelectorAll('[class*="fade-in"], [class*="slide-in"], .hover-lift');

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

animationElements.forEach(el => {
    animationObserver.observe(el);
});

// -------- Smooth Scroll for Navigation Links --------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// -------- Button Ripple Effect --------
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
    });
});

// -------- Responsive Image Handling --------
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
    });
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease-out';
});

// -------- Keyboard Navigation --------
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        prevSlide();
    }
});

// -------- Page Load Animation --------
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.6s ease-out';
});

// -------- Form Input Focus Effects --------
const formInputs = document.querySelectorAll('input, textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function () {
        this.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
    });

    input.addEventListener('blur', function () {
        this.style.boxShadow = '';
    });
});

// -------- Accessibility: Skip to Main Content --------
const skipToMainContent = document.createElement('a');
skipToMainContent.href = '#main-content';
skipToMainContent.textContent = 'Skip to main content';
skipToMainContent.style.position = 'absolute';
skipToMainContent.style.top = '-40px';
skipToMainContent.style.left = '0';
skipToMainContent.style.background = '#6366f1';
skipToMainContent.style.color = 'white';
skipToMainContent.style.padding = '8px';
skipToMainContent.style.zIndex = '999';

skipToMainContent.addEventListener('focus', () => {
    skipToMainContent.style.top = '0';
});

skipToMainContent.addEventListener('blur', () => {
    skipToMainContent.style.top = '-40px';
});

document.body.insertBefore(skipToMainContent, document.body.firstChild);

// -------- Performance Optimization: Lazy Load Images --------
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// -------- Console Message --------
console.log('%cInventorHub - Inventory Management System', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cModern, Fast & Secure Inventory Management', 'color: #64748b; font-size: 12px;');

// -------- Add scroll animation class to elements --------
const addScrollAnimations = () => {
    const elementsToAnimate = document.querySelectorAll('.feature-card, .pricing-card, .stat-card');
    elementsToAnimate.forEach(el => {
        el.classList.add('scroll-animate');
    });
};

addScrollAnimations();

// -------- Touch/Swipe support for testimonials (Mobile) --------
let touchStartX = 0;
let touchEndX = 0;

const slider = document.getElementById('testimonialSlider');

if (slider) {
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

const handleSwipe = () => {
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) {
        nextSlide();
    } else if (touchEndX - touchStartX > swipeThreshold) {
        prevSlide();
    }
};

// -------- Dark Mode Toggle (Optional) --------
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

if (prefersDarkScheme.matches) {
    // Optional: Add dark mode support by uncommenting and customizing
    // document.documentElement.classList.add('dark-mode');
}

// -------- CTA Button Interactions --------
const ctaButtons = document.querySelectorAll('.btn-primary');

ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-3px)';
    });

    button.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// -------- Export for module use (if needed) --------
// -------- User dropdown click toggle (positions handled by CSS) --------
(function() {
    const userAvatar = document.getElementById('userAvatar');
    const userDropdown = document.getElementById('userDropdown');

    if (!userAvatar || !userDropdown) return;

    userAvatar.addEventListener('click', (e) => {
        e.stopPropagation();
        const wrapper = userAvatar.closest('.user-profile');
        if (wrapper) wrapper.classList.toggle('show');
        userDropdown.classList.toggle('show');
    });

    // close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        const wrapper = userAvatar.closest('.user-profile');
        if (wrapper && !wrapper.contains(e.target)) {
            wrapper.classList.remove('show');
            userDropdown.classList.remove('show');
        }
    });

    // close dropdown with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const wrapper = userAvatar.closest('.user-profile');
            if (wrapper) wrapper.classList.remove('show');
            userDropdown.classList.remove('show');
        }
    });
})();

window.InventorHub = {
    nextSlide,
    prevSlide,
    currentSlide: () => currentSlide,
    goToSlide
};
