// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const modal = document.getElementById('modal');
const modalClose = document.querySelector('.modal-close');
const registrationForm = document.getElementById('registrationForm');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeThemes();
    initializeCommittee();
    initializeGallery();
    initializeBlog();
    initializeRegistration();
    initializeModal();
    initializeAnimations();
});

// Navigation functionality
function initializeNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
        } else {
            navbar.style.background = '#ffffff';
            navbar.style.backdropFilter = 'none';
            navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
        }
    });
}

// Themes section functionality
function initializeThemes() {
    const themeCards = document.querySelectorAll('.theme-card');
    
    themeCards.forEach(card => {
        const expandBtn = card.querySelector('.expand-btn');
        const themeDetails = card.querySelector('.theme-details');
        
        if (expandBtn && themeDetails) {
            expandBtn.addEventListener('click', function() {
                const isActive = themeDetails.classList.contains('active');
                
                // Close all other theme details
                document.querySelectorAll('.theme-details').forEach(detail => {
                    detail.classList.remove('active');
                });
                
                document.querySelectorAll('.expand-btn').forEach(btn => {
                    btn.textContent = 'View All Topics';
                });
                
                // Toggle current theme details
                if (!isActive) {
                    themeDetails.classList.add('active');
                    expandBtn.textContent = 'Hide Topics';
                }
            });
        }
    });
}

// Committee section functionality
function initializeCommittee() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const committeeContents = document.querySelectorAll('.committee-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(tab => tab.classList.remove('active'));
            committeeContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Gallery section functionality
function initializeGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Remove active class from all filter buttons
            filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide gallery items based on filter
            galleryItems.forEach(item => {
                const category = item.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

// Blog section functionality
function initializeBlog() {
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    const newsletterForm = document.querySelector('.newsletter-form');
    const footerNewsletter = document.querySelector('.footer-newsletter');
    
    // Blog pagination
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.textContent.includes('Next')) {
                paginationBtns.forEach(pBtn => pBtn.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Newsletter subscription
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                showModal(`
                    <div style="text-align: center; padding: 1rem;">
                        <i class="fas fa-check-circle" style="font-size: 3rem; color: #28a745; margin-bottom: 1rem;"></i>
                        <h3>Successfully Subscribed!</h3>
                        <p>Thank you for subscribing to our blog updates. You will receive the latest articles and conference news at <strong>${email}</strong></p>
                    </div>
                `, 'success');
                this.reset();
            }
        });
    }
    
    if (footerNewsletter) {
        footerNewsletter.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                showModal(`
                    <div style="text-align: center; padding: 1rem;">
                        <i class="fas fa-check-circle" style="font-size: 3rem; color: #28a745; margin-bottom: 1rem;"></i>
                        <h3>Successfully Subscribed!</h3>
                        <p>Thank you for subscribing to our updates!</p>
                    </div>
                `, 'success');
                this.reset();
            }
        });
    }
}

// Registration form functionality
function initializeRegistration() {
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate required fields
            const requiredFields = ['fullName', 'email', 'institution', 'country', 'degree', 'researchArea'];
            const missingFields = requiredFields.filter(field => !data[field]);
            
            if (missingFields.length > 0) {
                showModal(`
                    <div style="text-align: center; padding: 1rem;">
                        <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #ffc107; margin-bottom: 1rem;"></i>
                        <h3>Missing Required Fields</h3>
                        <p>Please fill in all required fields marked with *</p>
                    </div>
                `, 'warning');
                return;
            }
            
            // Check terms acceptance
            if (!document.getElementById('termsAccept').checked) {
                showModal(`
                    <div style="text-align: center; padding: 1rem;">
                        <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #ffc107; margin-bottom: 1rem;"></i>
                        <h3>Terms Acceptance Required</h3>
                        <p>Please accept the terms and conditions to proceed with registration.</p>
                    </div>
                `, 'warning');
                return;
            }
            
            // Simulate registration process
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                const registrationId = 'ISCMG-' + Date.now();
                
                // Generate confirmation message
                showModal(`
                    <div style="text-align: center; padding: 1rem;">
                        <i class="fas fa-check-circle" style="font-size: 3rem; color: #28a745; margin-bottom: 1rem;"></i>
                        <h3>Registration Successful!</h3>
                        <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                            <p><strong>Registration ID:</strong> ${registrationId}</p>
                            <p><strong>Name:</strong> ${data.fullName}</p>
                            <p><strong>Email:</strong> ${data.email}</p>
                            <p><strong>Institution:</strong> ${data.institution}</p>
                        </div>
                        <div style="text-align: left; margin: 1rem 0;">
                            <h4>Next Steps:</h4>
                            <ul style="margin-left: 1rem;">
                                <li>Confirmation email will be sent within 24 hours</li>
                                <li>Abstract review results in 2 weeks</li>
                                <li>Conference access details before event</li>
                            </ul>
                        </div>
                        <p style="font-size: 0.9rem; color: #666;">For queries: contact@iscmgeh-southasia.org</p>
                    </div>
                `, 'success');
                
                // Reset form
                registrationForm.reset();
                
                // Log registration data (in real implementation, this would be sent to server)
                console.log('Registration Data:', {
                    registrationId,
                    personalInfo: {
                        name: data.fullName,
                        email: data.email,
                        institution: data.institution,
                        country: data.country,
                        degree: data.degree
                    },
                    research: {
                        theme: data.researchArea,
                        title: data.abstractTitle,
                        abstract: data.abstractText,
                        presentationType: data.presentationType
                    },
                    timestamp: new Date().toISOString()
                });
                
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
            }, 2000);
        });
    }
}

// Modal functionality
function initializeModal() {
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Show modal with message
function showModal(message, type = 'info') {
    const modalMessage = document.getElementById('modalMessage');
    if (modalMessage && modal) {
        modalMessage.innerHTML = message;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Auto-close after 5 seconds for success messages
        if (type === 'success') {
            setTimeout(() => {
                closeModal();
            }, 5000);
        }
    }
}

// Close modal
function closeModal() {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Initialize animations and scroll effects
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.8s ease forwards';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.theme-card, .member-card, .gallery-item, .blog-post, .info-card');
    animateElements.forEach(el => observer.observe(el));
    
    // Parallax effect for floating elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelectorAll('.floating-element');
        const speed = 0.5;
        
        parallax.forEach(element => {
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Utility functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Search functionality (if search is added later)
function initializeSearch() {
    const searchInput = document.querySelector('#searchInput');
    if (searchInput) {
        const debouncedSearch = debounce(performSearch, 300);
        searchInput.addEventListener('input', debouncedSearch);
    }
}

function performSearch(e) {
    const query = e.target.value.toLowerCase();
    const searchableElements = document.querySelectorAll('.theme-card, .blog-post, .gallery-item');
    
    searchableElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes(query) || query === '') {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
}

// Form validation helpers
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#dc3545';
            isValid = false;
        } else {
            input.style.borderColor = '#28a745';
        }
        
        // Email validation
        if (input.type === 'email' && input.value && !validateEmail(input.value)) {
            input.style.borderColor = '#dc3545';
            isValid = false;
        }
    });
    
    return isValid;
}

// Add loading states to buttons
function setLoadingState(button, isLoading) {
    if (isLoading) {
        button.dataset.originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        button.disabled = true;
    } else {
        button.innerHTML = button.dataset.originalText;
        button.disabled = false;
    }
}

// Handle gallery image loading
function initializeImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/300x200/f0f0f0/666666?text=Image+Not+Available';
        });
    });
}

// Initialize blog post interactions
function initializeBlogInteractions() {
    const blogReadMore = document.querySelectorAll('.blog-read-more');
    
    blogReadMore.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const blogPost = this.closest('.blog-post');
            const title = blogPost.querySelector('h4').textContent;
            
            showModal(`
                <div style="text-align: left; padding: 1rem;">
                    <h3 style="color: #2c7873; margin-bottom: 1rem;">${title}</h3>
                    <p style="margin-bottom: 1rem; color: #666;">This is a preview of the blog post. In a full implementation, this would load the complete article content.</p>
                    <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                        <p><strong>Full article features:</strong></p>
                        <ul style="margin-left: 1rem; color: #666;">
                            <li>Detailed research insights</li>
                            <li>Expert commentary</li>
                            <li>References and citations</li>
                            <li>Related resources</li>
                        </ul>
                    </div>
                    <div style="text-align: center; margin-top: 2rem;">
                        <button onclick="closeModal()" style="background: #2c7873; color: white; border: none; padding: 0.8rem 2rem; border-radius: 25px; cursor: pointer;">Close Preview</button>
                    </div>
                </div>
            `);
        });
    });
}

// Initialize committee member interactions
function initializeCommitteeInteractions() {
    const memberCards = document.querySelectorAll('.member-card');
    
    memberCards.forEach(card => {
        card.addEventListener('click', function() {
            const name = this.querySelector('h4').textContent;
            const title = this.querySelector('.member-title').textContent;
            const institution = this.querySelector('.member-institution').textContent;
            const specialization = this.querySelector('.member-specialization').textContent;
            
            showModal(`
                <div style="text-align: center; padding: 1rem;">
                    <div style="width: 120px; height: 120px; border-radius: 50%; background: #2c7873; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem;">
                        ${name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 style="color: #2c7873; margin-bottom: 0.5rem;">${name}</h3>
                    <p style="color: #ff8c42; font-weight: 600; margin-bottom: 0.5rem;">${title}</p>
                    <p style="color: #666; font-style: italic; margin-bottom: 1rem;">${institution}</p>
                    <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin: 1rem 0; text-align: left;">
                        <h4 style="color: #2c7873;">Specialization:</h4>
                        <p style="color: #666;">${specialization}</p>
                    </div>
                    <div style="text-align: center; margin-top: 2rem;">
                        <button onclick="closeModal()" style="background: #2c7873; color: white; border: none; padding: 0.8rem 2rem; border-radius: 25px; cursor: pointer;">Close</button>
                    </div>
                </div>
            `);
        });
    });
}

// Initialize all interactions when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeImageLoading();
    initializeBlogInteractions();
    initializeCommitteeInteractions();
});

// Export functions for global access (if needed)
window.showModal = showModal;
window.closeModal = closeModal;


document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.querySelector('#submitAbstractBtn'); // Button in Hero
    const signinModal = document.getElementById('signinModal');
    const abstractModal = document.getElementById('abstractModal');
    const modals = document.querySelectorAll('.modal');
    let isSignedIn = false; // change this if your backend has auth

    // Show proper modal on click
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (!isSignedIn) {
                signinModal.classList.add('active');
            } else {
                abstractModal.classList.add('active');
            }
        });
    }

    // Handle sign-in form
    document.getElementById('signinForm').addEventListener('submit', function(e) {
        e.preventDefault();
        isSignedIn = true; // In real app, verify from backend
        signinModal.classList.remove('active');
        abstractModal.classList.add('active');
    });

    // Close modals
    modals.forEach(modal => {
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.classList.remove('active');
        });
    });
});
