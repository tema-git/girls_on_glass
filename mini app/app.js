// Initialize Telegram MiniApp
const telegramApp = window.Telegram.WebApp;
telegramApp.expand();

// Sample database of accounts
const accounts = [
    {
        id: 1,
        name: "Alex",
        age: 28,
        description: "Hi there! I love hiking, photography and playing guitar. Looking for friends to explore the city with.",
        photos: [
            "https://i.pravatar.cc/500?img=1",
            "https://i.pravatar.cc/500?img=11",
            "https://i.pravatar.cc/500?img=12"
        ],
        username: "alex_adventures"
    },
    {
        id: 2,
        name: "Sophia",
        age: 24,
        description: "Bookworm, coffee enthusiast, and amateur painter. Would love to meet people who share similar interests!",
        photos: [
            "https://i.pravatar.cc/500?img=5",
            "https://i.pravatar.cc/500?img=25",
            "https://i.pravatar.cc/500?img=32"
        ],
        username: "sophia_reads"
    },
    {
        id: 3,
        name: "Marcus",
        age: 30,
        description: "Tech geek by day, foodie by night. Always up for trying new restaurants or discussing the latest gadgets.",
        photos: [
            "https://i.pravatar.cc/500?img=7",
            "https://i.pravatar.cc/500?img=17",
            "https://i.pravatar.cc/500?img=27"
        ],
        username: "marcus_tech"
    },
    {
        id: 4,
        name: "Emma",
        age: 26,
        description: "Yoga instructor who loves traveling. Ask me about my adventures across Southeast Asia!",
        photos: [
            "https://i.pravatar.cc/500?img=9",
            "https://i.pravatar.cc/500?img=19",
            "https://i.pravatar.cc/500?img=29"
        ],
        username: "emma_travels"
    }
];

// DOM Elements
const catalogElement = document.getElementById('catalog');
const detailPage = document.getElementById('detailPage');
const backButton = document.getElementById('backButton');
const detailName = document.getElementById('detailName');
const detailTitle = document.getElementById('detailTitle');
const detailAge = document.getElementById('detailAge');
const detailDesc = document.getElementById('detailDesc');
const chatButton = document.getElementById('chatButton');
const sliderContainer = document.getElementById('sliderContainer');
const sliderDots = document.getElementById('sliderDots');
const sliderPrev = document.getElementById('sliderPrev');
const sliderNext = document.getElementById('sliderNext');
const photoSlider = document.getElementById('photoSlider');

// Current state
let currentSlide = 0;
let currentAccount = null;
let isSliding = false;

// Create banners for each account
function renderCatalog() {
    catalogElement.innerHTML = '';
    
    accounts.forEach(account => {
        const banner = document.createElement('div');
        banner.className = 'banner';
        banner.innerHTML = `
            <img src="${account.photos[0]}" alt="${account.name}" class="banner-img">
            <div class="banner-content">
                <h2 class="banner-title">${account.name}</h2>
                <p class="banner-age">${account.age} years old</p>
                <p class="banner-desc">${account.description.substring(0, 80)}...</p>
            </div>
        `;
        
        banner.addEventListener('click', () => showDetail(account));
        catalogElement.appendChild(banner);
    });
}

// Show detail page for an account
function showDetail(account) {
    currentAccount = account;
    detailName.textContent = account.name;
    detailTitle.textContent = account.name;
    detailAge.textContent = `${account.age} years old`;
    detailDesc.textContent = account.description;
    chatButton.href = `https://t.me/${account.username}`;
    
    // Create photo slider
    sliderContainer.innerHTML = '';
    sliderDots.innerHTML = '';
    
    account.photos.forEach((photo, index) => {
        // Create slider item
        const sliderItem = document.createElement('div');
        sliderItem.className = 'slider-item';
        sliderItem.innerHTML = `<img src="${photo}" alt="${account.name} photo ${index+1}" class="slider-img">`;
        sliderContainer.appendChild(sliderItem);
        
        // Create dot indicator
        const dot = document.createElement('div');
        dot.className = index === 0 ? 'dot active' : 'dot';
        dot.addEventListener('click', () => goToSlide(index));
        sliderDots.appendChild(dot);
    });
    
    detailPage.style.display = 'block';
    currentSlide = 0;
    updateArrows();
    
    // Reset slider position
    sliderContainer.style.transform = 'translateX(0)';
}

// Hide detail page
function hideDetail() {
    detailPage.style.display = 'none';
    currentAccount = null;
}

// Go to specific slide
function goToSlide(index) {
    if (isSliding || !currentAccount) return;
    
    isSliding = true;
    currentSlide = index;
    
    // Make sure index is within bounds
    if (currentSlide < 0) currentSlide = 0;
    if (currentSlide >= currentAccount.photos.length) {
        currentSlide = currentAccount.photos.length - 1;
    }
    
    sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update dots
    const dots = sliderDots.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.className = i === currentSlide ? 'dot active' : 'dot';
    });
    
    updateArrows();
    
    // Re-enable sliding after animation completes
    setTimeout(() => {
        isSliding = false;
    }, 300);
}

// Next slide
function nextSlide() {
    if (!currentAccount || isSliding) return;
    
    if (currentSlide < currentAccount.photos.length - 1) {
        goToSlide(currentSlide + 1);
    } else {
        // Optional: loop back to first slide
        goToSlide(0);
    }
}

// Previous slide
function prevSlide() {
    if (!currentAccount || isSliding) return;
    
    if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
    } else {
        // Optional: loop to last slide
        goToSlide(currentAccount.photos.length - 1);
    }
}

// Update arrows visibility and state
function updateArrows() {
    if (!currentAccount) return;
    
    if (currentAccount.photos.length <= 1) {
        sliderPrev.style.display = 'none';
        sliderNext.style.display = 'none';
    } else {
        sliderPrev.style.display = 'flex';
        sliderNext.style.display = 'flex';
        
        // Optionally change opacity based on position
        sliderPrev.style.opacity = currentSlide === 0 ? '0.5' : '1';
        sliderNext.style.opacity = currentSlide === currentAccount.photos.length - 1 ? '0.5' : '1';
    }
}

// =============== IMPROVED SWIPING FUNCTIONALITY ===============

// Touch handling variables
let touchStartX = null;
let touchMoveX = null;
let touchStartTime = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;

// Handle touch start
function handleTouchStart(event) {
    if (!currentAccount || currentAccount.photos.length <= 1) return;
    
    touchStartX = event.type === 'touchstart' ? event.touches[0].clientX : event.clientX;
    touchStartTime = Date.now();
    isDragging = true;
    
    // Get current position
    const transformMatrix = window.getComputedStyle(sliderContainer).getPropertyValue('transform');
    if (transformMatrix !== 'none') {
        const matrix = new DOMMatrix(transformMatrix);
        prevTranslate = matrix.m41; // Gets the X translation value
    } else {
        prevTranslate = 0;
    }
    
    // Stop animation if in progress
    sliderContainer.style.transition = 'none';
    
    // Capture the slider to prevent text selection
    event.preventDefault();
}

// Handle touch move
function handleTouchMove(event) {
    if (!isDragging || !touchStartX) return;
    
    touchMoveX = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
    
    // Calculate distance moved
    const diff = touchMoveX - touchStartX;
    
    // Apply movement with resistance at edges
    const containerWidth = photoSlider.offsetWidth;
    const maxTranslate = -((currentAccount.photos.length - 1) * containerWidth);
    
    // Calculate new position
    currentTranslate = prevTranslate + diff;
    
    // Add resistance at edges
    if (currentTranslate > 0) {
        currentTranslate = Math.min(containerWidth / 3, diff / 3);
    } else if (currentTranslate < maxTranslate) {
        const overscroll = currentTranslate - maxTranslate;
        currentTranslate = maxTranslate + (overscroll / 3);
    }
    
    // Apply the transform
    applyTransform(currentTranslate);
    
    // Prevent scrolling
    event.preventDefault();
}

// Handle touch end
function handleTouchEnd(event) {
    if (!isDragging) return;
    
    isDragging = false;
    
    // Restore transition
    sliderContainer.style.transition = 'transform 0.3s ease';
    
    // Calculate if we should go to next/prev slide
    if (touchStartX !== null && touchMoveX !== null) {
        const diff = touchMoveX - touchStartX;
        const timeDiff = Date.now() - touchStartTime;
        const containerWidth = photoSlider.offsetWidth;
        const threshold = containerWidth * 0.2; // 20% of width
        const isQuickSwipe = timeDiff < 300; // ms
        
        // Determine direction and if we've moved enough
        if (Math.abs(diff) > threshold || (isQuickSwipe && Math.abs(diff) > 30)) {
            if (diff > 0) {
                // Swipe right -> prev slide
                prevSlide();
            } else {
                // Swipe left -> next slide
                nextSlide();
            }
        } else {
            // Not enough movement, snap back to current slide
            goToSlide(currentSlide);
        }
    } else {
        // Touch was canceled or didn't move
        goToSlide(currentSlide);
    }
    
    // Reset touch tracking
    touchStartX = null;
    touchMoveX = null;
}

// Apply transform to slider
function applyTransform(translate) {
    // Convert pixel value to percentage for responsive behavior
    const containerWidth = photoSlider.offsetWidth;
    const percentage = (translate / containerWidth) * 100;
    sliderContainer.style.transform = `translateX(${percentage}%)`;
}

// =============== EVENT LISTENERS ===============

// Touch events
photoSlider.addEventListener('touchstart', handleTouchStart, { passive: false });
photoSlider.addEventListener('touchmove', handleTouchMove, { passive: false });
photoSlider.addEventListener('touchend', handleTouchEnd);
photoSlider.addEventListener('touchcancel', handleTouchEnd);

// Mouse events (for desktop testing)
photoSlider.addEventListener('mousedown', handleTouchStart);
window.addEventListener('mousemove', handleTouchMove);
window.addEventListener('mouseup', handleTouchEnd);
window.addEventListener('mouseleave', handleTouchEnd);

// UI navigation
backButton.addEventListener('click', hideDetail);
sliderNext.addEventListener('click', nextSlide);
sliderPrev.addEventListener('click', prevSlide);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!currentAccount) return;
    
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === 'Escape') {
        hideDetail();
    }
});

// Initialize the app
renderCatalog();