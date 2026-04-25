// VGU Love Adda - Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Floating Hearts Animation
    createFloatingHearts();
    
    // 2. Smooth Scrolling for Navigation
    setupSmoothScrolling();
    
    // 3. Navbar Scroll Effect
    setupNavbarScrollEffect();
    
    // 4. Single Meter Animation
    animateSingleMeter();
    
    // 5. Swipe Functionality for Profiles
    setupSwipeButtons();
    
    // 6. Intersection Observer for Animations
    setupScrollAnimations();
    
    // 7. Tagline Cards Hover Effects
    setupTaglineHover();
    
    // 8. Profile Card Interactions
    setupProfileInteractions();
    
    console.log('🌟 VGU Love Adda loaded successfully! Ready to mingle! 💖');
});

// 1. Floating Hearts Animation
function createFloatingHearts() {
    const heartsBg = document.getElementById('heartsBg');
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = ['💖', '💕', '💗', '💝', '❤️'][Math.floor(Math.random() * 5)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
        
        heartsBg.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 7000);
    }
    
    setInterval(createHeart, 300);
}

// 2. Smooth Scrolling for Navigation
function setupSmoothScrolling() {
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
}

// 3. Navbar Scroll Effect
function setupNavbarScrollEffect() {
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up or at top
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Add background on scroll
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
        }
    });
}

// 4. Single Meter Animation
function animateSingleMeter() {
    const meterFill = document.getElementById('meterFill');
    const meterStatus = document.getElementById('meterStatus');
    
    const statuses = [
        'Low 😌',
        'Medium 😏',
        'High 😤',
        'Desperate 😭',
        'Bhai shaadi kar le 💀'
    ];
    
    let currentLevel = 0;
    
    setInterval(() => {
        currentLevel = (currentLevel + 1) % 5;
        const width = [20, 40, 60, 80, 100][currentLevel];
        const status = statuses[currentLevel];
        
        meterFill.style.width = width + '%';
        meterStatus.textContent = `Status: ${status}`;
        
        // Color change based on level
        const colors = ['#4ecdc4', '#45b7d1', '#ff6b6b', '#ff8e8e', '#ff4757'];
        meterFill.style.background = `linear-gradient(90deg, ${colors[currentLevel]}, #ff6b9d)`;
    }, 2000);
}

// 5. Swipe Functionality for Profiles
function setupSwipeButtons() {
    const swipeBtns = document.querySelectorAll('.swipe-btn');
    
    swipeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const isRightSwipe = this.classList.contains('right');
            const profileCard = this.closest('.profile-card');
            
            // Add swipe animation
            profileCard.style.transition = 'transform 0.5s ease';
            
            if (isRightSwipe) {
                profileCard.style.transform = 'translateX(100%) scale(0.8)';
                showNotification('💖 MATCH! Great choice bhai! 🔥', 'success');
                playMatchSound();
            } else {
                profileCard.style.transform = 'translateX(-100%) scale(0.8)';
                showNotification('👎 Next profile loading...', 'skip');
            }
            
            // Remove card after animation
            setTimeout(() => {
                profileCard.remove();
            }, 500);
            
            // Load new profile after delay
            setTimeout(loadNewProfile, 700);
        });
    });
}

function loadNewProfile() {
    const profilesGrid = document.querySelector('.profiles-grid');
    const newProfile = document.createElement('div');
    newProfile.className = 'profile-card';
    newProfile.innerHTML = `
        <div class="profile-img">
            <i class="fas fa-user${Math.random() > 0.5 ? '' : '-female'}"></i>
        </div>
        <div class="profile-info">
            <h3>${generateRandomName()}, ${Math.floor(Math.random() * 5) + 18}</h3>
            <p class="bio">${generateRandomBio()}</p>
            <p class="looking-for">Looking for: ${generateRandomLookingFor()}</p>
            <button class="swipe-btn left">👎 No</button>
            <button class="swipe-btn right">💖 Yes</button>
        </div>
    `;
    profilesGrid.appendChild(newProfile);
    setupSwipeButtons(); // Re-attach event listeners
}

function generateRandomName() {
    const names = ['Aryan', 'Riya', 'Vikram', 'Sneha', 'Arjun', 'Priya', 'Rohan', 'Divya', 'Karan', 'Neha'];
    return names[Math.floor(Math.random() * names.length)];
}

function generateRandomBio() {
    const bios = [
        'Gym + Gaming + Late night talks 😎',
        'Foodie + Netflix + Travel ❤️',
        'Coffee + Books + Deep talks ☕',
        'Cricket + Biryani + Chill vibes 🏏',
        'Coding + Anime + Memes 💻'
    ];
    return bios[Math.floor(Math.random() * bios.length)];
}

function generateRandomLookingFor() {
    const lookingFor = [
        'Serious / Timepass / Dekhte hain 😏',
        'Cute banda jo reply kare 😤',
        'Just vibes, no pressure ✨',
        'Long term wala pyaar 💍'
    ];
    return lookingFor[Math.floor(Math.random() * lookingFor.length)];
}

// 6. Scroll Animations with Intersection Observer
function setupScrollAnimations() {
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
    
    document.querySelectorAll('.tagline-card, .step, .feature, .story-card, .profile-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });
}

// 7. Enhanced Tagline Hover Effects
function setupTaglineHover() {
    document.querySelectorAll('.tagline-card').forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05) rotate(1deg)';
            createHeartBurst(this);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        });
    });
}

// 8. Profile Card Interactions
function setupProfileInteractions() {
    document.querySelectorAll('.profile-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('swiping')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#ff6b9d' : '#c44569'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.5s ease;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

function createHeartBurst(element) {
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = ['💖', '💕', '💗'][Math.floor(Math.random() * 3)];
            heart.style.cssText = `
                position: absolute;
                font-size: 20px;
                pointer-events: none;
                z-index: 10;
                left: 50%;
                top: 50%;
                animation: heartBurst 1s ease-out forwards;
            `;
            element.appendChild(heart);
            
            setTimeout(() => heart.remove(), 1000);
        }, i * 100);
    }
}

function playMatchSound() {
    // Create audio context for match sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

// Add CSS for new animations (injected dynamically)
const style = document.createElement('style');
style.textContent = `
    @keyframes heartBurst {
        0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(var(--x, 0), var(--y, 0)) scale(1) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Mobile Menu Toggle (for responsive navbar)
function setupMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '☰';
    hamburger.style.cssText = `
        display: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: white;
        @media (max-width: 768px) { display: block; }
    `;
    
    document.querySelector('.navbar').appendChild(hamburger);
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-open');
    });
}

setupMobileMenu();