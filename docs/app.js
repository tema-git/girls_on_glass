// Initialize Telegram MiniApp
const loader = document.getElementById("loader");
const appContainer = document.getElementById("appContainer");

const telegramApp = window.Telegram.WebApp;
telegramApp.expand();

// Sample database of accounts
const accounts = [
  {
    id: 1,
    name: "Kendall",
    age: 22,
    description: "Let’s go on an adventure – or just coffee ☕️",
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
// const detailTitle = document.getElementById("detailTitle");
const detailAge = document.getElementById("detailAge");
const detailDesc = document.getElementById("detailDesc");
const chatButton = document.getElementById("chatButton");
const sliderContainer = document.getElementById("sliderContainer");
const sliderDots = document.getElementById("sliderDots");
const sliderPrev = document.getElementById("sliderPrev");
const sliderNext = document.getElementById("sliderNext");
const photoSlider = document.getElementById("photoSlider");
const detailContent = document.querySelector(".detail-content");
const detailHeader = document.querySelector(".detail-header");
const detailTitleName = document.querySelector(".detail-title-name");
const subtitle = document.querySelector(".subtitle");
const headerContainer = document.querySelector(".header__container");
const headerContainerTitle = headerContainer.querySelector("h1");
const modal = document.querySelector(".modal");
const formConfirmWrapper = document.querySelector(".form");
//    <img src="./assets/icons/pink.png" alt="icon" class="banner-title__icon">

// Current state
let currentSlide = 0;
let currentAccount = null;
let isSliding = false;

window.addEventListener("DOMContentLoaded", () => {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  const startTime = localStorage.getItem("startTime");
  const endTime = Date.now();
  const difference = endTime - startTime;

  console.log(endTime);
  console.log(startTime);
  console.log(difference);

  if (!localStorage.getItem("isChecked")) {
    console.log("block");
    formConfirmWrapper.style.display = "block";
  } else if (localStorage.getItem("startTime") && difference > 86400000) {
    formConfirmWrapper.style.display = "block";
    localStorage.removeItem("isChecked");
    localStorage.removeItem("startTime");
  }
  // window.addEventListener("scroll", function () {
  //   document.getElementById("showScroll").innerHTML = pageYOffset + "px";
  // });
  const telegramApp = window.Telegram.WebApp;
  telegramApp.ready && telegramApp.ready();
  telegramApp.expand();
  loader.style.display = "none";
  appContainer.style.display = "block";

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
    window.scrollTo(0, 0);
    detailHeader.style.display = "flex";
    detailTitleName.style.display = "flex";
    subtitle.style.display = "none";
    headerContainerTitle.style.display = "none";

    currentAccount = account;

    catalogElement.style.display = "none";
    detailPage.style.display = "block";

    detailTitleName.innerHTML = `
       <h2>${account.name} Profile</h2>      
    `;

    sliderContainer.innerHTML = `
        <div class="detail-bio">
            <img src="${account.photos[0]}" alt="${
      account.name
    }" class="main-detail-img">
            <div class="detail-title">
                <h2>${account.name}</h2>
               
            </div>
                
            <p class="detail-age">${account.age} years old</p>
            <p class="detail-desc">${account.description}</p>
   

            <div class="button-pulse-2">
                <div class="button__wrapper-2">
                <div class="pulsing-2"></div>
                <a href="https://t.me/${
                  account.username
                }" class="chat-button-2"><span>💬 Flirt in Telegram</span></a>
                </div>             
            </div>
         
            <div class="photo-grid">
                ${account.photos
                  .slice(1)
                  .map(
                    (photo, index) =>
                      `<div class="grid-photo hideGridPhoto">
                    <img src="${photo}" alt="Gallery ${index + 1}" >
                      </div>
                    `
                  )
                  .join("")}
                  <div id = "myModal" class = "modal-photo" >  
                    <img class = "modal-photo__content" id = "img01" >                  
                  </div>
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
                <a href="https://t.me/${account.username}" class="chat-button-2"><span>💬 Flirt in Telegram</span> </a>
                </div>             
            </div>
    `;

    //----------- modal-photo ---------------------------------------------

    const modalPhoto = document.querySelector("#myModal");
    const modalImg = document.querySelector("#img01");

    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    // Порог, сколько нужно тянуть для закрытия (например, 100px)
    const threshold = 100;

    modalPhoto.addEventListener(
      "touchstart",
      (e) => {
        startY = e.touches[0].clientY;
        isDragging = true;
        modalImg.style.transition = "none"; // Отключаем анимацию во время перетаскивания
      },
      false
    );

    modalPhoto.addEventListener(
      "touchmove",
      (e) => {
        if (!isDragging) return;

        currentY = e.touches[0].clientY;
        const deltaY = currentY - startY;

        // Двигаем картинку вертикально
        modalImg.style.transform = `translateY(${deltaY}px)`;
      },
      false
    );

    modalPhoto.addEventListener(
      "touchend",
      () => {
        if (!isDragging) return;

        isDragging = false;
        const deltaY = currentY - startY;

        // Если пользователь тянул достаточно сильно — закрываем
        if (Math.abs(deltaY) > threshold) {
          modalImg.style.transition = "transform 0.3s ease, opacity 0.3s ease";
          modalImg.style.transform = `translateY(${
            deltaY > 0 ? "100%" : "-100%"
          })`;
          modalImg.style.opacity = 0;

          setTimeout(() => {
            modalPhoto.style.display = "none";
            modalImg.style.transition = "none";
            modalImg.style.transform = "translateY(0)";
            modalImg.style.opacity = 1;

            // ВОССТАНОВЛЕНИЕ СКРОЛЛА
            document.body.style.overflow = "";
          }, 300);
        } else {
          // Иначе плавно возвращаем картинку назад
          modalImg.style.transition = "transform 0.3s ease";
          modalImg.style.transform = "translateY(0)";
          // ВОССТАНОВЛЕНИЕ СКРОЛЛА
          document.body.style.overflow = "";
        }
      },
      false
    );

    //------------------------------------------------------------------------------
    // Get the modal
    // const modalPhoto = document.querySelector("#myModal");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    const imagesPersonalList = document.querySelectorAll(".grid-photo");
    // const modalImg = document.querySelector("#img01");

    imagesPersonalList.forEach((item) => {
      item.addEventListener("click", () => {
        console.log(item.firstElementChild);
        modalPhoto.style.display = "block";
        modalImg.src = item.firstElementChild.src;
        modalImg.alt = item.firstElementChild.alt;
        document.body.style.overflow = "hidden";
      });
    });

    modalPhoto.addEventListener("click", (event) => {
      console.log(event.target.className);
      // modalImg.className += " out";
      document.body.style.overflow = "";
      setTimeout(function () {
        modalPhoto.style.display = "none";
        modalImg.className = "modal-photo__content";
      }, 100);
    });

    //-----------------------------------------------------------------------------------

    // sliderDots.innerHTML = '';
  }

  // UI navigation
  backButton.addEventListener("click", hideDetail);

  // Hide detail page
  function hideDetail() {
    window.scrollTo(0, 0);
    detailHeader.style.display = "none";
    detailPage.style.display = "none";
    catalogElement.style.display = "grid";
    detailTitle.style.display = "none";
    subtitle.style.display = "block";
    headerContainerTitle.style.display = "block";
    currentAccount = null;
    console.log("vbf");
  }

  //-------------- modal-form --------------------------------------

  const modalTrigger = document.querySelectorAll("[data-modal]");
  // const modalCloseBtn = document.querySelector("[data-close]");

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
  }

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal();
    });
  });

  // modalCloseBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (
      event.target === modal ||
      event.target.getAttribute("data-close") == ""
    ) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  //------------------------ form - отправка (моя) не нужна  ---------------------------------------

  const formContact = document.querySelector(".modal__form");

  const message = {
    loading: "./assets/icons/spinner.svg",
    success: "Спасибо! Скоро мы свяжемся с вами!",
    failure: "Что-то пошло не так...",
  };

  // forms.forEach((item) => {
  //   bindPostData(item);
  // });

  bindPostData(formContact);

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: data,
    });

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  const postFormData = async (url, data) => {
    // для данный в формате FormData
    const res = await fetch(url, {
      method: "POST",
      body: data,
    });

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.textContent = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.append(statusMessage);

      const formData = new FormData(form);

      // если надо отправить данные в формате FormData:

      postFormData("server.php", formData)
        .then((data) => data.text())
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });

      // если надо отправить данные в формате JSON:

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      // postData("server.php", json)
      //   .then((data) => {
      //     console.log(data);
      //     showThanksModal(message.success);
      //     statusMessage.remove();
      //   })
      //   .catch(() => {
      //     showThanksModal(message.failure);
      //   })
      //   .finally(() => {
      //     form.reset();
      // });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
       <div class="modal__content">
          <div data-close class="modal__close">&times;</div>
          <div class="modal__title">${message}</div>
       </div>
    `;

    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  }

  //----------------------------- Яндекс-форма ----------------------------------------

  const openFormBtn = document.querySelector("#open-form-btn");
  const formPopup = document.querySelector("#form-popup");

  openFormBtn.addEventListener("click", function () {
    formPopup.classList.add("show-form");
    formPopup.classList.remove("hide");
    document.body.style.overflow = "hidden";
  });

  formPopup.addEventListener("click", (event) => {
    if (event.target === formPopup) {
      formPopup.classList.add("hide");
      formPopup.classList.remove("show-form");
      document.body.style.overflow = "";
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape" && formPopup.classList.contains("show-form")) {
      formPopup.classList.add("hide");
      formPopup.classList.remove("show-form");
      document.body.style.overflow = "";
    }
  });

  //------------------------------- форма - подьверждение возраста ------------------------------------

  const formConfirm = document.querySelector(".form__body");

  formConfirm.addEventListener("submit", formSend);

  function formSend(e) {
    e.preventDefault();

    let error = formValidate(formConfirm);

    if (error === 0) {
      formConfirm.reset();
      localStorage.setItem("isChecked", true);
      localStorage.setItem("startTime", Date.now());
      formConfirmWrapper.style.display = "none";
    } else {
      alert("Заполните обязательные поля!");
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll("._req");

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);
      if (
        input.getAttribute("type") === "checkbox" &&
        input.checked === false
      ) {
        formAddError(input);
        error++;
      }
    }
    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add("_error");
    input.classList.add("_error");
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove("_error");
    input.classList.remove("_error");
  }

  //------------------------ Go to specific slide --------------------------------------

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
});
