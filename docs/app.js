// Initialize Telegram MiniApp
const loader = document.getElementById("loader");
const appContainer = document.getElementById("appContainer");
document.addEventListener("DOMContentLoaded", () => {
  const telegramApp = window.Telegram.WebApp;
  telegramApp.ready && telegramApp.ready();
  telegramApp.expand();
  loader.style.display = "none";
  appContainer.style.display = "block";
});

const telegramApp = window.Telegram.WebApp;
telegramApp.expand();

// Sample database of accounts
const accounts = [
  {
    id: 1,
    name: "Kendall",
    age: 22,
    description: "Let’s go on an adventure – or just coffee ☕",
    photos: [
      "./assets/photos/model1/2025-03-29 12.18.09.jpg", 
      "./assets/photos/model1/2025-03-29 12.18.43.jpg",
      "./assets/photos/model1/2025-03-29 12.18.50.jpg",
      "./assets/photos/model1/2025-03-29 12.19.01.jpg",
      "./assets/photos/model1/2025-03-29 12.19.15.jpg",
      "./assets/photos/model1/2025-03-29 12.19.22.jpg",
      "./assets/photos/model1/2025-03-29 12.41.43.jpg",
    ],
    username: "kendalljenner",
  },
  {
    id: 2,
    name: "Sophia",
    age: 20,
    description: "Brains, books, and bad jokes 📚",
    photos: [
      "./assets/photos/model2/2025-03-29 12.20.06.jpg",
      "./assets/photos/model2/2025-03-29 12.20.12.jpg",
      "./assets/photos/model2/2025-03-29 12.20.17.jpg",
      "./assets/photos/model2/2025-03-29 12.20.23.jpg",
      "./assets/photos/model2/2025-03-29 12.21.24.jpg",
      "./assets/photos/model2/2025-03-29 12.21.46.jpg",
      "./assets/photos/model2/2025-03-29 12.39.26.jpg",
    ],
    username: "sophia_books",
  },
  {
    id: 3,
    name: "Tatiana",
    age: 19,
    description: "If food is involved, I’m in 🍜",
    photos: [
      "./assets/photos/model3/2025-03-29 12.21.58.jpg",
      "./assets/photos/model3/2025-03-29 12.22.09.jpg",
      "./assets/photos/model3/2025-03-29 12.22.18.jpg",
      "./assets/photos/model3/2025-03-29 12.22.31.jpg",
      "./assets/photos/model3/2025-03-29 12.22.36.jpg",
      "./assets/photos/model3/2025-03-29 12.22.42.jpg",
      "./assets/photos/model3/2025-03-29 12.22.50.jpg",
      "./assets/photos/model3/2025-03-29 12.23.02.jpg",
    ],
    username: "tatti",
  },
  {
    id: 4,
    name: "Emma",
    age: 21,
    description: "Wanna stretch and chill? Yoga & memes 🧘‍♀️",
    photos: [
      "./assets/photos/model4/2025-03-29 12.23.23.jpg",
      "./assets/photos/model4/2025-03-29 12.23.33.jpg",
      "./assets/photos/model4/2025-03-29 12.23.41.jpg",
      "./assets/photos/model4/2025-03-29 12.23.46.jpg",
      "./assets/photos/model4/2025-03-29 12.23.51.jpg",
      "./assets/photos/model4/2025-03-29 12.23.55.jpg",
      "./assets/photos/model4/2025-03-29 12.39.41.jpg",
    ],
    username: "emma_yogi",
  },
  {
    id: 5,
    name: "Lisa",
    age: 23,
    description: "Sarcasm fluent. Fluent in other things too 😏",
    photos: [
      "./assets/photos/model5/2025-03-29 12.27.53.jpg",
      "./assets/photos/model5/2025-03-29 12.28.04.jpg",
      "./assets/photos/model5/2025-03-29 12.28.11.jpg",
      "./assets/photos/model5/2025-03-29 12.28.25.jpg",
      "./assets/photos/model5/2025-03-29 12.28.36.jpg",
      "./assets/photos/model5/2025-03-29 12.28.43.jpg",
      "./assets/photos/model5/2025-03-29 12.39.57.jpg",
    ],
    username: "ksenia_sobchak",
  },
  {
    id: 6,
    name: "Sabina",
    age: 21,
    description: "Cute chaos and contagious giggles 💥",
    photos: [
      "./assets/photos/model6/2025-03-29 12.34.01.jpg",
      "./assets/photos/model6/2025-03-29 12.34.07.jpg",
      "./assets/photos/model6/2025-03-29 12.34.12.jpg",
      "./assets/photos/model6/2025-03-29 12.34.18.jpg",
      "./assets/photos/model6/2025-03-29 12.37.41.jpg",
      "./assets/photos/model6/2025-03-29 12.37.58.jpg",
      "./assets/photos/model6/2025-03-29 12.40.06.jpg",
    ],
    username: "sabina_carpenter",
  },
];

// DOM Elements
const catalogElement = document.getElementById("catalog");
const detailPage = document.getElementById("detailPage");
const backButton = document.getElementById("backButton");
const detailName = document.getElementById("detailName");
const detailTitle = document.getElementById("detailTitle");
const detailAge = document.getElementById("detailAge");
const detailDesc = document.getElementById("detailDesc");
const chatButton = document.getElementById("chatButton");
const sliderContainer = document.getElementById("sliderContainer");
const sliderDots = document.getElementById("sliderDots");
const sliderPrev = document.getElementById("sliderPrev");
const sliderNext = document.getElementById("sliderNext");
const photoSlider = document.getElementById("photoSlider");
const detailContent = document.querySelector(".detail-content");

// Current state
let currentSlide = 0;
let currentAccount = null;
let isSliding = false;

// Create banners for each account
function renderCatalog() {
  catalogElement.innerHTML = "";

  accounts.forEach((account) => {
    const banner = document.createElement("div");
    banner.className = "banner";

    banner.innerHTML = `
            <div class="banner-img-container">
                <img src="${account.photos[0]}" alt="${account.name}" class="banner-img">
                <div class="banner-overlay">
                          <div class="banner-title">
                               <h2>${account.name}</h2>
                               <img src="./assets/icons/pink.png" alt="icon" class="banner-title__icon">
                           </div>             
                    <p class="banner-age">@${account.username}</p>
                </div>  
            </div>
        

            <div class="item button-pulse">
                <div class="button__wrapper">
                <div class="pulsing"></div>
                <a href="https://t.me/${account.username}" class="banner-img-container__button-2"><img src="./assets/icons/icons8-телеграм.svg" alt="icon" class="banner-img-container__icon"></a>
                </div>             
            </div>
  
            
      
        `;

    catalogElement.appendChild(banner);

    banner.addEventListener("click", () => showDetail(account));
  });
}

// Show detail page for an account
function showDetail(account) {
  currentAccount = account;

  catalogElement.style.display = "none";
  detailPage.style.display = "block";

  sliderContainer.innerHTML = `
        <div class="detail-bio">
            <img src="${account.photos[0]}" alt="${
    account.name
  }" class="main-detail-img">
            <div class="detail-title">
                <h2>${account.name}</h2>
                <img src="./assets/icons/pink.png" alt="icon" class="detail-title__icon">
            </div>
                
            <p class="detail-age">${account.age} years old</p>
            <p class="detail-desc">${account.description}</p>
   

            <div class="button-pulse-2">
                <div class="button__wrapper-2">
                <div class="pulsing-2"></div>
                <a href="https://t.me/${
                  account.username
                }" class="chat-button-2">💬 Flirt in Telegram</a>
                </div>             
            </div>
         
            <div class="photo-grid">
                ${account.photos
                  .slice(1)
                  .map(
                    (photo, index) =>
                      `<img src="${photo}" alt="Gallery ${
                        index + 1
                      }" class="grid-photo">`
                  )
                  .join("")}
            </div>
        </div>
    `;

  detailContent.innerHTML = `
        <h2 class="detail-title" id="detailTitle"></h2>
        <p class="detail-age" id="detailAge"></p>
        <p class="detail-desc" id="detailDesc"></p>
        
            <div class="button-pulse-2">
                <div class="button__wrapper-2">
                <div class="pulsing-2"></div>
                <a href="https://t.me/${account.username}" class="chat-button-2">💬 Flirt in Telegram</a>
                </div>             
            </div>
    `;

  // sliderDots.innerHTML = '';
}

// Hide detail page
function hideDetail() {
  detailPage.style.display = "none";
  catalogElement.style.display = "grid";
  currentAccount = null;
  console.log("vbf");
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
  const dots = sliderDots.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.className = i === currentSlide ? "dot active" : "dot";
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
    sliderPrev.style.display = "none";
    sliderNext.style.display = "none";
  } else {
    sliderPrev.style.display = "flex";
    sliderNext.style.display = "flex";

    // Optionally change opacity based on position
    sliderPrev.style.opacity = currentSlide === 0 ? "0.5" : "1";
    sliderNext.style.opacity =
      currentSlide === currentAccount.photos.length - 1 ? "0.5" : "1";
  }
}

// UI navigation
backButton.addEventListener("click", hideDetail);

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (!currentAccount) return;

  if (e.key === "ArrowLeft") {
    prevSlide();
  } else if (e.key === "ArrowRight") {
    nextSlide();
  } else if (e.key === "Escape") {
    hideDetail();
  }
});

// Initialize the app
renderCatalog();

const MIN_SPEED = 1.5;
const MAX_SPEED = 2.5;

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

class Blob {
  constructor(el) {
    this.el = el;
    const boundingRect = this.el.getBoundingClientRect();
    this.size = boundingRect.width;
    this.initialX = randomNumber(0, window.innerWidth - this.size);
    this.initialY = randomNumber(0, window.innerHeight - this.size);
    this.el.style.top = `${this.initialY}px`;
    this.el.style.left = `${this.initialX}px`;
    this.vx =
      randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1);
    this.vy =
      randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1);
    this.x = this.initialX;
    this.y = this.initialY;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x >= window.innerWidth - this.size) {
      this.x = window.innerWidth - this.size;
      this.vx *= -1;
    }
    if (this.y >= window.innerHeight - this.size) {
      this.y = window.innerHeight - this.size;
      this.vy *= -1;
    }
    if (this.x <= 0) {
      this.x = 0;
      this.vx *= -1;
    }
    if (this.y <= 0) {
      this.y = 0;
      this.vy *= -1;
    }
  }

  move() {
    this.el.style.transform = `translate(${this.x - this.initialX}px, ${
      this.y - this.initialY
    }px)`;
  }
}

function initBlobs() {
  const blobEls = document.querySelectorAll(".bouncing-blob");
  const blobs = Array.from(blobEls).map((blobEl) => new Blob(blobEl));

  function update() {
    requestAnimationFrame(update);
    blobs.forEach((blob) => {
      blob.update();
      blob.move();
    });
  }

  requestAnimationFrame(update);
}

initBlobs();
