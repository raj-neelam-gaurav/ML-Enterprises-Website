// ML Enterprises LLP - Main JavaScript

// Hero Slider
let currentSlideIndex = 0;
let slideInterval;

// Typewriter effect variables
const typewriterWords = ['Infrastructure', 'Solutions', 'Excellence', 'Future'];
const typewriterSubtitles = [
    'Five decades of excellence in Railway, Industrial & Civil Construction',
    'Comprehensive railway siding and track infrastructure across India',
    'PEB Warehouses, Silos, and Industrial Construction Projects',
    'Bridges, Roads, and Infrastructure Development Since 2008'
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterElement = null;
let typewriterTimeout = null;

function typewriterEffect() {
    typewriterElement = document.getElementById('typewriter-text');

    if (!typewriterElement) {
        setTimeout(typewriterEffect, 100);
        return;
    }

    const currentWord = typewriterWords[wordIndex];

    if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        // Finished typing - wait before deleting
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Finished deleting - change slide and move to next word
        isDeleting = false;
        wordIndex = (wordIndex + 1) % typewriterWords.length;
        
        // Change the slide when text is fully erased
        showSlide(wordIndex);
        
        // Wait a bit before starting to type the next word
        typeSpeed = 500;
    }

    // Continue the typewriter effect
    typewriterTimeout = setTimeout(typewriterEffect, typeSpeed);
}

function showSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const heroSubtitle = document.getElementById('hero-subtitle');

    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }

    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    const activeSlide = slides[currentSlideIndex];
    activeSlide.classList.add('active');
    dots[currentSlideIndex].classList.add('active');

    // Update subtitle based on current index
    if (heroSubtitle) {
        heroSubtitle.textContent = typewriterSubtitles[currentSlideIndex];
    }
}

function changeSlide(direction) {
    // Stop current typewriter effect
    if (typewriterTimeout) {
        clearTimeout(typewriterTimeout);
    }
    
    // Calculate new index
    let newIndex = currentSlideIndex + direction;
    if (newIndex >= typewriterWords.length) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = typewriterWords.length - 1;
    }
    
    // Update word index and reset typewriter
    wordIndex = newIndex;
    charIndex = 0;
    isDeleting = false;
    
    // Show the new slide
    showSlide(wordIndex);
    
    // Restart typewriter effect
    typewriterTimeout = setTimeout(typewriterEffect, 300);
}

function currentSlide(index) {
    // Stop current typewriter effect
    if (typewriterTimeout) {
        clearTimeout(typewriterTimeout);
    }
    
    // Update word index and reset typewriter
    wordIndex = index;
    charIndex = 0;
    isDeleting = false;
    
    // Show the selected slide
    showSlide(index);
    
    // Restart typewriter effect
    typewriterTimeout = setTimeout(typewriterEffect, 300);
}

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
        const href = this.getAttribute('href');
        if (href !== '#' && !this.classList.contains('contact-trigger') && !this.classList.contains('contact-trigger-btn')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Contact Modal functionality
function initContactModal() {
    const contactModal = document.getElementById('contactModal');
    const contactClose = document.querySelector('.contact-close');
    const contactOverlay = document.querySelector('.contact-modal-overlay');

    document.addEventListener('click', function (e) {
        if (e.target.matches('.contact-trigger') ||
            e.target.matches('.contact-trigger-btn') ||
            e.target.closest('.contact-trigger') ||
            e.target.closest('.contact-trigger-btn')) {
            e.preventDefault();
            e.stopPropagation();
            contactModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    });

    if (contactClose) {
        contactClose.addEventListener('click', (e) => {
            e.stopPropagation();
            contactModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    }

    if (contactOverlay) {
        contactOverlay.addEventListener('click', (e) => {
            e.stopPropagation();
            contactModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactModal && contactModal.classList.contains('show')) {
            contactModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
}

// Testimonial Modal functionality
function initTestimonialModal() {
    const testimonialModal = document.getElementById('testimonialModal');
    const testimonialClose = document.querySelector('.testimonial-modal-close');
    const testimonialOverlay = document.querySelector('.testimonial-modal-overlay');
    const testimonialFullText = document.getElementById('testimonialFullText');
    const testimonialModalAuthor = document.getElementById('testimonialModalAuthor');

    document.addEventListener('click', function (e) {
        if (e.target.matches('.read-more-btn') || e.target.closest('.read-more-btn')) {
            e.preventDefault();
            e.stopPropagation();

            const card = e.target.closest('.testimonial-card-marquee');
            const fullText = card.getAttribute('data-full-text');
            const authorInfo = card.querySelector('.testimonial-author').cloneNode(true);

            const readMoreInAuthor = authorInfo.querySelector('.read-more-btn');
            if (readMoreInAuthor) {
                readMoreInAuthor.remove();
            }

            testimonialFullText.textContent = fullText;
            testimonialModalAuthor.innerHTML = authorInfo.innerHTML;

            testimonialModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    });

    if (testimonialClose) {
        testimonialClose.addEventListener('click', (e) => {
            e.stopPropagation();
            testimonialModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    }

    if (testimonialOverlay) {
        testimonialOverlay.addEventListener('click', (e) => {
            e.stopPropagation();
            testimonialModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && testimonialModal && testimonialModal.classList.contains('show')) {
            testimonialModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
}

// Mobile flip card functionality
function initMobileFlipCards() {
    if (window.innerWidth <= 768) {
        const flipCards = document.querySelectorAll('.benefit-flip-card');
        
        flipCards.forEach(card => {
            // Remove existing flip button if any
            const existingBtn = card.querySelector('.mobile-flip-btn');
            if (existingBtn) existingBtn.remove();
            
            // Create flip button
            const flipBtn = document.createElement('button');
            flipBtn.className = 'mobile-flip-btn';
            flipBtn.innerHTML = '↻';
            flipBtn.setAttribute('aria-label', 'Flip card');
            
            card.appendChild(flipBtn);
            
            flipBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                card.classList.toggle('flipped');
                
                // Change button icon based on state
                if (card.classList.contains('flipped')) {
                    flipBtn.innerHTML = '↺';
                } else {
                    flipBtn.innerHTML = '↻';
                }
            });
        });
    }
}

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
    
    // Start typewriter effect after a short delay
    setTimeout(() => {
        typewriterEffect();
    }, 800);

    // Initialize modals
    initContactModal();
    initTestimonialModal();
    
    // Initialize mobile flip cards
    initMobileFlipCards();
    
    // Re-initialize on resize
    window.addEventListener('resize', initMobileFlipCards);

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

        const easeOutQuad = progress * (2 - progress);
        const current = start + (end - start) * easeOutQuad;

        const formatted = Math.floor(current);
        element.textContent = suffix + formatted + (end >= 100 && formatted < end ? 'Cr' : '');

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
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
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Location cards interaction
document.addEventListener('DOMContentLoaded', () => {
    const locationCards = document.querySelectorAll('.location-card');

    locationCards.forEach(card => {
        card.addEventListener('click', function () {
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
// Gallery Teaser Fading Effect
document.addEventListener('DOMContentLoaded', () => {
    const teaserImages = document.querySelectorAll('.gallery-fade-image');
    
    if (teaserImages.length > 0) {
        let currentIndex = 0;
        
        // Set first image active initially
        teaserImages[0].classList.add('active');

        setInterval(() => {
            // Remove active class from current
            teaserImages[currentIndex].classList.remove('active');
            
            // Move to next index (looping back to 0)
            currentIndex = (currentIndex + 1) % teaserImages.length;
            
            // Add active class to next
            teaserImages[currentIndex].classList.add('active');
        }, 4000); // Change image every 4 seconds
    }
});

// Console message
console.log('%c🗃️ ML Enterprises LLP', 'color: #e10600; font-size: 20px; font-weight: bold;');
console.log('%cBuilding India\'s Infrastructure since 1972', 'color: #007bff; font-size: 14px;');
console.log('This website is made by %crajgaurav.me', 'color:rgb(0, 255, 195);');