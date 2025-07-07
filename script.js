document.addEventListener('DOMContentLoaded', function() {
    // Fixed header on scroll
    const header = document.querySelector('.header');
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu when a link is clicked
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current section in viewport
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
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
});

// Optional: Floating Elements Animation Enhancement
document.addEventListener('DOMContentLoaded', function() {
    // Make floating elements move randomly
    const floatingElements = document.querySelectorAll('.floating-diya, .floating-lotus, .floating-peacock');
    
    floatingElements.forEach(element => {
        // Randomize initial position
        element.style.left = `${Math.random() * 80 + 10}%`;
        element.style.top = `${Math.random() * 80 + 10}%`;
        
        // Randomize animation duration
        const duration = Math.random() * 5 + 5;
        element.style.animationDuration = `${duration}s`;
    });
    
    // Smooth scroll for "Explore" and "Book Now" buttons
    document.querySelectorAll('.btn-explore, .btn-book, .scroll-down').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Tab Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.room-tab');
    const roomCards = document.querySelectorAll('.room-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Show/hide rooms
            const roomType = this.getAttribute('data-room');
            roomCards.forEach(card => {
                card.style.display = 'none';
                if (card.classList.contains(roomType)) {
                    card.style.display = 'block';
                }
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Lightbox functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.querySelector('.lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');

    // Open lightbox when image is clicked
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const caption = this.querySelector('.image-caption').textContent;
            
            lightboxImg.src = imgSrc;
            lightboxCaption.textContent = caption;
            lightboxModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close lightbox
    closeBtn.addEventListener('click', function() {
        lightboxModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close when clicking outside image
    lightboxModal.addEventListener('click', function(e) {
        if (e.target === lightboxModal) {
            lightboxModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightboxModal.style.display === 'block') {
            if (e.key === 'Escape') {
                lightboxModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.testimonial-carousel');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.dots-container');
    let currentIndex = 0;

    // Create dots
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // Navigation functions
    function goToTestimonial(index) {
        currentIndex = index;
        updateCarousel();
    }

    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth + 30; // Include gap
        carousel.scrollTo({
            left: currentIndex * cardWidth,
            behavior: 'smooth'
        });

        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Button events
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : cards.length - 1;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < cards.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    // Auto-rotate (optional)
    setInterval(() => {
        currentIndex = (currentIndex < cards.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    }, 5000);
});

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if(name && email && message) {
            // Here you would typically send the data to a server
            alert(`Thank you, ${name}! Your message has been sent. We'll contact you soon at ${email}.`);
            contactForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
});