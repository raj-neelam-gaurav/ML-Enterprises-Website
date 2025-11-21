// ML Enterprises - Gallery Page Script

// Image Data Configuration
// IMPORTANT: Ensure these files exist in your folders. 
// Based on your directory listing:
// site: 0.jpg to 15.jpg, 1_.jpg
// team: 1.jpg to 9.jpg
// training: 0.jpg to 6.jpg

const galleryImages = [
    // --- Site Images ---
    { src: '../images/site/1.jpg', category: 'site', caption: 'Site Overview' },
    { src: '../images/site/2.jpg', category: 'site', caption: 'Construction in Progress' },
    { src: '../images/site/3.jpg', category: 'site', caption: 'Heavy Machinery at Work' },
    { src: '../images/site/4.jpg', category: 'site', caption: 'Infrastructure Development' },
    { src: '../images/site/5.jpg', category: 'site', caption: 'Project Site' },
    { src: '../images/site/6.jpg', category: 'site', caption: 'Railway Work' },
    { src: '../images/site/7.jpg', category: 'site', caption: 'Site Operations' },
    { src: '../images/site/8.jpg', category: 'site', caption: 'Ground Level Work' },
    { src: '../images/site/9.jpg', category: 'site', caption: 'Engineering Excellence' },
    { src: '../images/site/10.jpg', category: 'site', caption: 'Team on Site' },
    { src: '../images/site/11.jpg', category: 'site', caption: 'Project Milestone' },
    { src: '../images/site/12.jpg', category: 'site', caption: 'Industrial Setup' },

    // --- Team Images ---
    { src: '../images/team/1.jpg', category: 'team', caption: 'Our Dedicated Team' },
    { src: '../images/team/2.jpg', category: 'team', caption: 'Leadership' },
    { src: '../images/team/3.jpg', category: 'team', caption: 'Team Collaboration' },
    { src: '../images/team/4.jpg', category: 'team', caption: 'On-Site Engineers' },
    { src: '../images/team/5.jpg', category: 'team', caption: 'Office Staff' },
    { src: '../images/team/6.jpg', category: 'team', caption: 'Planning Meeting' },
    { src: '../images/team/7.jpg', category: 'team', caption: 'Group Photo' },

    // --- Training Images ---
    { src: '../images/training/0.jpg', category: 'training', caption: 'Safety Training Session' },
    { src: '../images/training/1.jpg', category: 'training', caption: 'Technical Workshop' },
    { src: '../images/training/2.jpg', category: 'training', caption: 'Equipment Handling' },
    { src: '../images/training/3.jpg', category: 'training', caption: 'Safety Gear Demonstration' },
    { src: '../images/training/4.jpg', category: 'training', caption: 'Team Briefing' },
    { src: '../images/training/5.jpg', category: 'training', caption: 'Site Safety Protocols' }
];

let currentImageIndex = 0;
let currentFilteredImages = [];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('gallery-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Initial Load (All images)
    loadImages('all');

    // Filter Click Events
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            loadImages(filter);
        });
    });

    // Load Images Function
    function loadImages(filter) {
        grid.innerHTML = ''; // Clear current
        
        // Filter the array
        currentFilteredImages = filter === 'all' 
            ? galleryImages 
            : galleryImages.filter(img => img.category === filter);

        // Generate HTML
        currentFilteredImages.forEach((imgData, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.onclick = () => openLightbox(index);

            // Using innerHTML for structure
            item.innerHTML = `
                <img src="${imgData.src}" alt="${imgData.caption}" loading="lazy">
                <div class="item-overlay">
                    <div class="overlay-icon">+</div>
                </div>
            `;
            
            // Add animation delay
            item.style.animation = `fadeInUp 0.5s ease ${index * 0.05}s backwards`;
            
            grid.appendChild(item);
        });
    }
});

// --- Lightbox Functions ---

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const lbCaption = document.getElementById('caption');
    
    currentImageIndex = index;
    const imgData = currentFilteredImages[currentImageIndex];

    lightbox.style.display = "block";
    lbImg.src = imgData.src;
    lbCaption.innerHTML = imgData.caption;
    
    // Disable scrolling on body
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = "none";
    document.body.style.overflow = 'auto';
}

// Close button click
document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);

// Close on outside click
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
        closeLightbox();
    }
});

function changeImage(n) {
    currentImageIndex += n;
    
    // Loop functionality
    if (currentImageIndex >= currentFilteredImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = currentFilteredImages.length - 1;
    }

    const imgData = currentFilteredImages[currentImageIndex];
    const lbImg = document.getElementById('lightbox-img');
    const lbCaption = document.getElementById('caption');

    // Fade effect
    lbImg.style.opacity = 0;
    setTimeout(() => {
        lbImg.src = imgData.src;
        lbCaption.innerHTML = imgData.caption;
        lbImg.style.opacity = 1;
    }, 200);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (document.getElementById('lightbox').style.display === "block") {
        if (e.key === "ArrowLeft") changeImage(-1);
        if (e.key === "ArrowRight") changeImage(1);
        if (e.key === "Escape") closeLightbox();
    }
});

// Add keyframe for entry animation
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(styleSheet);