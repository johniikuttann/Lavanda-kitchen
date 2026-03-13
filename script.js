document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    const sections = document.querySelectorAll('section');
    const contactForm = document.querySelector('.contact-form');

    // 1. Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    });

    // 2. Mobile Menu Toggle (To be integrated in HTML/CSS)
    const mobileMenuBtn = document.createElement('div');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    nav.insertBefore(mobileMenuBtn, nav.querySelector('.nav-cta'));

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active')
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });

    // 3. Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('active'); // Close mobile menu if open
            if (mobileMenuBtn) mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 4. Scroll Reveal Animation using Intersection Observer
    const revealOption = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, revealOption);

    sections.forEach(section => {
        section.classList.add('reveal');
        revealObserver.observe(section);
    });

    // 6. Image Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);

    galleryItems.forEach(image => {
        image.addEventListener('click', () => {
            lightbox.classList.add('active');
            const img = document.createElement('img');
            img.src = image.src;
            while (lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild);
            }
            lightbox.appendChild(img);
        });
    });

    lightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    // 5. Contact Form Simulation
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;

            btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                btn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
                btn.style.backgroundColor = '#25D366';
                contactForm.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // 7. Automatic Slider for Premium Offerings (Mobile Only)
    const servicesGrid = document.querySelector('.services-grid');
    const serviceItems = document.querySelectorAll('.service-item');
    let currentIndex = 0;
    let sliderInterval;

    function startAutoSlider() {
        if (window.innerWidth <= 768 && servicesGrid && serviceItems.length > 0) {
            sliderInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % serviceItems.length;
                // Use the first item's width + gap for accurate scrolling
                const itemWidth = serviceItems[0].offsetWidth + 15; // 15 is the gap in CSS
                servicesGrid.scrollTo({
                    left: currentIndex * itemWidth,
                    behavior: 'smooth'
                });
            }, 30000); // 30 seconds
        }
    }

    function stopAutoSlider() {
        clearInterval(sliderInterval);
    }

    // Initialize slider
    startAutoSlider();

    // Handle window resize
    window.addEventListener('resize', () => {
        stopAutoSlider();
        currentIndex = 0; // Reset index on resize to avoid alignment issues
        if (servicesGrid) servicesGrid.scrollTo({ left: 0 });
        startAutoSlider();
    });

    // Pause on user interaction
    if (servicesGrid) {
        servicesGrid.addEventListener('touchstart', stopAutoSlider);
        servicesGrid.addEventListener('touchend', startAutoSlider);
    }
});
