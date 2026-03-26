 // FuelRadar Landing Page JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('FuelRadar Landing Page Loaded 🚗⛽');

    // Initialize all features
    initMobileMenu();
    initScrollEffects();
    initFAQ();
    initNewsletterForm();
    initCounterAnimation();
    initScrollReveal();
    initScrollProgressBar();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking on a nav link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

// Navbar Scroll Effect
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Newsletter Form
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;

            // Show success notification
            showNotification('🎉 Successfully subscribed! Check your email for confirmation.', 'success');
            
            // Clear the form
            emailInput.value = '';

            // Log subscription (in real app, send to backend)
            console.log('Newsletter subscription:', email);
        });
    }
}

// Counter Animation for Stats
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    let animated = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };

            updateCounter();
        });
    };

    // Trigger animation when stats section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// Scroll Reveal Animation
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.step-card, .feature-card, .testimonial-card, .problem-content, .app-content'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
}

// Show Notification
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    const bgColor = type === 'success' ? '#10b981' : 
                     type === 'error' ? '#ef4444' : '#f97316';
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
        font-weight: 500;
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// CTA Buttons Functionality
// Check Prices
document.querySelector('.btn-check')?.addEventListener('click', () => {
    showNotification('🔍 Opening price feed... Find the cheapest stations near you!', 'success');
    window.location.href = 'comingsoon.html';
});

// Get Started
document.querySelector('.btn-start')?.addEventListener('click', () => {
    showNotification('🚀 Let\'s get you started! Creating your account...', 'success');
    window.location.href = 'comingsoon.html';
});

// Drop Update
document.querySelector('.btn-drop')?.addEventListener('click', () => {
    showNotification('📍 Share a fuel price update and help your community!', 'success');
    window.location.href = 'comingsoon.html';
});

// App Download Buttons
document.querySelectorAll('.app-download-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const platform = this.textContent.includes('Android') ? 'Android' : 'iOS';
        // showNotification(`📱 Redirecting to ${platform} app store...`, 'success');   
        showNotification(`📱 coming soon `, 'success');
        
        // In real app:
        // if (platform === 'Android') {
        //     window.location.href = 'https://play.google.com/store/apps/details?id=com.fuelradar';
        // } else {
        //     window.location.href = 'https://apps.apple.com/app/fuelradar';
        // }
    });
});

// Testimonials hover effect
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Log page interactions
console.log('FuelRadar Analytics:', {
    pageViews: 1,
    uniqueVisitors: 'tracking...',
    conversionRate: 'calculating...'
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage && scrolled < 800) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showNotification('🎮 Easter Egg Unlocked! You found the secret code! Free premium for life! (Just kidding 😄)', 'success');
        
        // Add confetti effect
        document.body.style.background = 'linear-gradient(45deg, #f97316, #ea580c, #f97316)';
        setTimeout(() => {
            document.body.style.background = 'white';
        }, 2000);
    }
});

// Track user journey
const userJourney = {
    entryTime: new Date(),
    sections: [],
    
    trackSection: function(section) {
        this.sections.push({
            name: section,
            timestamp: new Date(),
            timeSpent: null
        });
    },
    
    getJourney: function() {
        console.log('User Journey:', this.sections);
    }
};

// Track section views
const sections = document.querySelectorAll('section[id]');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            userJourney.trackSection(entry.target.id);
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Before user leaves, log journey
window.addEventListener('beforeunload', function() {
    userJourney.getJourney();
});

// Share functionality (if Web Share API is supported)
function shareApp() {
    if (navigator.share) {
        navigator.share({
            title: 'FuelRadar',
            text: 'Check out FuelRadar - Know fuel prices before you drive!',
            url: window.location.href
        }).then(() => {
            console.log('Thanks for sharing!');
        }).catch(err => {
            console.log('Error sharing:', err);
        });
    } else {
        showNotification('📋 Link copied to clipboard!', 'success');
        navigator.clipboard.writeText(window.location.href);
    }
}

// Add share button functionality if it exists
const shareButtons = document.querySelectorAll('[data-share]');
shareButtons.forEach(btn => {
    btn.addEventListener('click', shareApp);
});

// Footer links
document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const page = this.textContent;
        showNotification(`📄 Loading ${page} page...`, 'success');
        // In real app: window.location.href = this.getAttribute('href');
    });
});

console.log('🎉 All features initialized successfully!');
console.log('💡 Tip: Try subscribing to the newsletter for the best fuel deals!');

// Export functions for use in other scripts
window.FuelRadar = {
    showNotification,
    shareApp,
    userJourney
};


// ===== JS =====
const track = document.querySelector(".testimonial-track")
const slides = document.querySelectorAll(".testimonial")
const dotsContainer = document.querySelector(".testimonial-dots")

let index = 0

slides.forEach((_, i) => {
    const dot = document.createElement("span")
    if (i === 0) dot.classList.add("active")

    dot.addEventListener("click", () => {
        index = i
        updateSlider()
    })

    dotsContainer.appendChild(dot)
})

const dots = document.querySelectorAll(".testimonial-dots span")

function updateSlider() {
    track.style.transform = `translateX(-${index * 100}%)`

    dots.forEach(dot => dot.classList.remove("active"))
    dots[index].classList.add("active")
}

setInterval(() => {
    index = (index + 1) % slides.length
    updateSlider()
}, 3500)

let startX = 0

track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX
})

track.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX

    if (startX - endX > 50) index++
    if (endX - startX > 50) index--

    if (index < 0) index = 0
    if (index >= slides.length) index = slides.length - 1

    updateSlider()
})

// Scroll Progress Bar
function initScrollProgressBar() {
    const scrollBar = document.getElementById("scroll-bar");

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        scrollBar.style.width = scrollPercent + "%";
    });
}
