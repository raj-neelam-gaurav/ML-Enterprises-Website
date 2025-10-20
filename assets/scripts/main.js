// ML Enterprises LLP - Main JavaScript

// Hero Slider
let currentSlideIndex = 0;
let slideInterval;

function showSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    
    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }
    
    // Hide all slides and remove active class
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current slide and activate dot
    const activeSlide = slides[currentSlideIndex];
    activeSlide.classList.add('active');
    dots[currentSlideIndex].classList.add('active');
    
    // Update hero text content
    const title = activeSlide.dataset.title;
    const subtitle = activeSlide.dataset.subtitle;
    
    if (title && heroTitle) {
        // Check if title contains "Infrastructure" to add highlight
        if (title.includes('Infrastructure')) {
            heroTitle.innerHTML = title.replace('Infrastructure', '<span class=\"hero-highlight\">Infrastructure</span>');
        } else if (title.includes('Solutions')) {
            heroTitle.innerHTML = title.replace('Solutions', '<span class=\"hero-highlight\">Solutions</span>');
        } else if (title.includes('Excellence')) {
            heroTitle.innerHTML = title.replace('Excellence', '<span class=\"hero-highlight\">Excellence</span>');
        } else if (title.includes('Mastery')) {
            heroTitle.innerHTML = title.replace('Mastery', '<span class=\"hero-highlight\">Mastery</span>');
        } else {
            heroTitle.textContent = title;
        }
    }
    
    if (subtitle && heroSubtitle) {
        heroSubtitle.textContent = subtitle;
    }
}

function changeSlide(direction) {
    showSlide(currentSlideIndex + direction);
    resetSlideInterval();
}

function currentSlide(index) {
    showSlide(index);
    resetSlideInterval();
}

function autoSlide() {
    showSlide(currentSlideIndex + 1);
}

function resetSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(autoSlide, 5000);
}

// Make functions global for onclick handlers
window.changeSlide = changeSlide;
window.currentSlide = currentSlide;

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize hero slider
    showSlide(0);
    slideInterval = setInterval(autoSlide, 5000);

    // Observe sections for fade-in animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Animate stats counter
    animateStats();

    // Add active state to nav links
    highlightActiveSection();
});

// Stats counter animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const originalText = target.textContent;
                target.dataset.originalText = originalText;
                
                // Extract number from text
                const match = originalText.match(/[\d]+/);
                if (match) {
                    const endValue = parseInt(match[0]);
                    animateValue(target, 0, endValue, 2000, '');
                }
                
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));
}

function animateValue(element, start, end, duration, suffix = '') {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuad = progress * (2 - progress);
        const current = start + (end - start) * easeOutQuad;
        
        // Format number without decimals
        const formatted = Math.floor(current);
        element.textContent = suffix + formatted + (end >= 100 && formatted < end ? '+' : '');
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            // Ensure final value is exact with original suffix
            element.textContent = element.dataset.originalText || (suffix + end);
        }
    }
    
    requestAnimationFrame(update);
}

// Highlight active navigation section
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Project cards hover effect enhancement
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Location cards interaction
document.addEventListener('DOMContentLoaded', () => {
    const locationCards = document.querySelectorAll('.location-card');
    
    locationCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a pulse animation on click
            this.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });
});

// Add pulse animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .nav-links a.active {
        color: var(--primary-red);
    }
    
    .nav-links a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Mobile menu toggle (for future implementation)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Lazy load images if any are added dynamically
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Console message
console.log('%c🏗️ ML Enterprises LLP', 'color: #e10600; font-size: 20px; font-weight: bold;');
console.log('%cBuilding India\'s Infrastructure since 1972', 'color: #007bff; font-size: 14px;');
