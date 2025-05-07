/*
* Story Ink - Custom Visual Stories by Amy Quinn Digges
* Main JavaScript File
*/

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initFAQAccordion();
    initPortfolioFilter();
    initTestimonialSlider();
    initScrollEffect();
    initContactForm();
});

// Navigation Menu Toggle
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Toggle menu icon animation
            menuToggle.classList.toggle('active');
            
            // If menu is now active, intercept scroll
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a nav link
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.site-header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// FAQ Accordion
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                // Check if this item is already active
                const isActive = item.classList.contains('active');
                
                // Close all items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                    const faqQuestion = faqItem.querySelector('.faq-question');
                    if (faqQuestion) {
                        faqQuestion.classList.remove('active');
                    }
                });
                
                // If the clicked item wasn't active, open it
                if (!isActive) {
                    item.classList.add('active');
                    question.classList.add('active');
                }
            });
        }
    });
}

// Portfolio Filter
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filter = this.getAttribute('data-filter');
                
                // Filter items
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || filter === category) {
                        item.style.display = 'block';
                        
                        // Animate items into view
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        
                        // Hide after animation
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// Testimonial Slider
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    // Show initial slide
    showSlide(currentSlide);
    
    // Next button click
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });
    }
    
    // Previous button click
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
    }
    
    // Dot clicks
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
    }
    
    // Auto slide every 5 seconds
    let slideInterval = setInterval(function() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
    
    // Pause auto slide on hover
    const slider = document.querySelector('.testimonial-slider');
    if (slider) {
        slider.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', function() {
            slideInterval = setInterval(function() {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            }, 5000);
        });
    }
    
    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.style.display = 'none';
            slide.style.opacity = '0';
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the current slide
        if (slides[index]) {
            slides[index].style.display = 'block';
            
            // Trigger reflow
            slides[index].offsetHeight;
            
            // Fade in the current slide
            slides[index].style.opacity = '1';
        }
        
        // Set the corresponding dot as active
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }
}

// Scroll Animation Effects
function initScrollEffect() {
    // Animate elements when they come into view
    const elements = document.querySelectorAll('.section-header, .service-card, .process-step, .portfolio-item');
    
    // Create observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Observe each element
    elements.forEach(element => {
        observer.observe(element);
    });
    
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get header height for offset
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact Form Validation & Submission
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = form.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value.trim())) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (isValid) {
                // Normally we'd submit the form to a server here
                // For now, we'll just show a success message
                const formData = new FormData(form);
                const formObject = {};
                
                formData.forEach((value, key) => {
                    formObject[key] = value;
                });
                
                console.log('Form submitted:', formObject);
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.innerHTML = '<p>Thank you for your message! I\'ll get back to you soon.</p>';
                
                form.innerHTML = '';
                form.appendChild(successMessage);
            }
        });
        
        // Remove error class on input
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
            });
        });
    }
}

// Booking Calendar and Scheduling (basic simulation)
// This would be expanded with a real booking API integration
function initBookingCalendar() {
    const timeSlots = document.querySelectorAll('.time-slot');
    const bookingForm = document.getElementById('bookingForm');
    
    if (timeSlots.length > 0) {
        timeSlots.forEach(slot => {
            if (!slot.classList.contains('unavailable')) {
                slot.addEventListener('click', function() {
                    // Deselect all slots
                    timeSlots.forEach(s => s.classList.remove('selected'));
                    
                    // Select this slot
                    this.classList.add('selected');
                    
                    // Update hidden input
                    const slotInput = document.getElementById('selectedTimeSlot');
                    if (slotInput) {
                        slotInput.value = this.getAttribute('data-time');
                    }
                });
            }
        });
    }
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const requiredFields = bookingForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Check if a time slot is selected
            const selectedSlot = document.querySelector('.time-slot.selected');
            if (!selectedSlot) {
                isValid = false;
                alert('Please select a time slot for your consultation.');
            }
            
            if (isValid) {
                // In a real implementation, this would send the booking data to a server
                const formData = new FormData(bookingForm);
                const bookingData = {};
                
                formData.forEach((value, key) => {
                    bookingData[key] = value;
                });
                
                console.log('Booking submitted:', bookingData);
                
                // Show confirmation message
                const confirmationMessage = document.createElement('div');
                confirmationMessage.className = 'booking-confirmation';
                confirmationMessage.innerHTML = `
                    <h3>Your Consultation is Confirmed!</h3>
                    <p>Thank you for booking a consultation. I'm looking forward to discussing your story!</p>
                    <p>You'll receive a confirmation email shortly with all the details.</p>
                `;
                
                const bookingContent = document.querySelector('.booking-content');
                bookingContent.innerHTML = '';
                bookingContent.appendChild(confirmationMessage);
            }
        });
    }
}

// Payment Processing Integration (for a real implementation, use a payment processor like Stripe)
function initPaymentForm() {
    const paymentForm = document.getElementById('paymentForm');
    
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, this would integrate with a payment processor
            // For now, we'll just show a success message
            
            const paymentConfirmation = document.createElement('div');
            paymentConfirmation.className = 'payment-confirmation';
            paymentConfirmation.innerHTML = `
                <h3>Payment Successful!</h3>
                <p>Thank you for your payment. Your Story Ink creation process will begin soon!</p>
                <p>You'll receive a receipt and further instructions via email.</p>
            `;
            
            const paymentContent = document.querySelector('.payment-content');
            paymentContent.innerHTML = '';
            paymentContent.appendChild(paymentConfirmation);
        });
    }
}

// Initialize booking and payment functionality if on those pages
if (window.location.pathname.includes('booking.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        initBookingCalendar();
    });
}

if (window.location.pathname.includes('payment.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        initPaymentForm();
    });
}