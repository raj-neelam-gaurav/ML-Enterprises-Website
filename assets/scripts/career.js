// ML Enterprises - Career Page Specific Scripts

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Scroll Animations
    initScrollAnimations();
    
    // Initialize Gallery Stagger Animation
    initGalleryAnimation();
    
    // Remove mobile flip logic as we switched to zig-zag layout
});

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe all feature rows
    document.querySelectorAll('.feature-row').forEach(row => {
        sectionObserver.observe(row);
    });
}

function initGalleryAnimation() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger effect based on index
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                galleryObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    galleryItems.forEach(item => {
        // Set initial state for JS animation
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        galleryObserver.observe(item);
    });
}