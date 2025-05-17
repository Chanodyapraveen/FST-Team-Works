const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".nav-links"); 
const navLinks = document.querySelectorAll(".nav-links a");


hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active"); 
});


navLinks.forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        menu.classList.remove("active");
    });
});


// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 60, 
                behavior: 'smooth'
            });
        }
    });
});

// Back to Top Button Functionality
const backToTopButton = document.getElementById('back-to-top');

// Show/hide button based on scroll position
const toggleBackToTopButton = () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
};

// Scroll to top when button is clicked
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Listen for scroll events
window.addEventListener('scroll', toggleBackToTopButton);

// Scroll animation for service cards
const serviceCards = document.querySelectorAll('.service-card');

// Footer elements animation
const footerElements = document.querySelectorAll('.footer-logo, .footer-links, .footer-social, .footer-newsletter');

const checkScroll = () => {
    const triggerBottom = window.innerHeight * 0.8;
    
    // Check service cards
    serviceCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        
        if(cardTop < triggerBottom) {
            card.classList.add('visible');
        }
    });
    
    // Check footer elements
    footerElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if(elementTop < triggerBottom) {
            element.style.opacity = "1";
        }
    });
};

// Handle newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        
        // You would typically send this to a server
        alert(`Thank you! ${emailInput.value} has been subscribed to our newsletter.`);
        
        // Reset the form
        emailInput.value = '';
    });
}

// Initial check on page load
window.addEventListener('load', checkScroll);
// Check on scroll
window.addEventListener('scroll', checkScroll);
// Gallery and Lightbox Functionality
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentImageIndex = 0;

// Check if gallery items are visible on scroll
const checkGalleryScroll = () => {
    const triggerBottom = window.innerHeight * 0.8;
    
    galleryItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        
        if(itemTop < triggerBottom) {
            // Add delay based on index for staggered animation
            setTimeout(() => {
                item.classList.add('visible');
            }, 100 * (index % 3)); // Stagger effect based on column position
        }
    });
};

// Open lightbox
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('.gallery-img').src;
        const imgAlt = item.querySelector('.gallery-img').alt;
        const title = item.querySelector('.gallery-info h3').textContent;
        const subtitle = item.querySelector('.gallery-info p').textContent;
        
        openLightbox(imgSrc, imgAlt, title, subtitle, index);
    });
});

// Function to open lightbox
function openLightbox(src, alt, title, subtitle, index) {
    lightbox.classList.add('active');
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightboxCaption.innerHTML = `<strong>${title}</strong> - ${subtitle}`;
    currentImageIndex = index;
    
    // Add active class to image after a brief delay for transition
    setTimeout(() => {
        lightboxImg.classList.add('active');
    }, 10);
    
    // Disable body scroll
    document.body.style.overflow = 'hidden';
}

// Close lightbox
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Close with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
    
    // Navigate with arrow keys
    if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            navigateLightbox('prev');
        } else if (e.key === 'ArrowRight') {
            navigateLightbox('next');
        }
    }
});

function closeLightbox() {
    lightboxImg.classList.remove('active');
    
    // Wait for image fade out before hiding entire lightbox
    setTimeout(() => {
        lightbox.classList.remove('active');
        // Re-enable body scroll
        document.body.style.overflow = '';
    }, 300);
}

// Navigation buttons
lightboxPrev.addEventListener('click', () => {
    navigateLightbox('prev');
});

lightboxNext.addEventListener('click', () => {
    navigateLightbox('next');
});

function navigateLightbox(direction) {
    // Remove active class from current image
    lightboxImg.classList.remove('active');
    
    setTimeout(() => {
        // Calculate new index
        if (direction === 'prev') {
            currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        } else {
            currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        }
        
        // Get new image details
        const newItem = galleryItems[currentImageIndex];
        const imgSrc = newItem.querySelector('.gallery-img').src;
        const imgAlt = newItem.querySelector('.gallery-img').alt;
        const title = newItem.querySelector('.gallery-info h3').textContent;
        const subtitle = newItem.querySelector('.gallery-info p').textContent;
        
        // Update lightbox
        lightboxImg.src = imgSrc;
        lightboxImg.alt = imgAlt;
        lightboxCaption.innerHTML = `<strong>${title}</strong> - ${subtitle}`;
        
        // Add active class back after image has loaded
        lightboxImg.onload = () => {
            lightboxImg.classList.add('active');
        };
        
        // Fallback in case onload doesn't trigger
        setTimeout(() => {
            lightboxImg.classList.add('active');
        }, 50);
    }, 200);
}

// Check gallery items on page load
window.addEventListener('load', checkGalleryScroll);
// Check on scroll
window.addEventListener('scroll', checkGalleryScroll);