const users = [
    { id: 1, name: "Алекс", age: 25, photo: "photo1.jpg", avatar: "avatar1.jpg", banner: "banner1.jpg", description: "Привет! Я Алекс.", photos: ["photo1.jpg", "photo2.jpg"], tgUsername: "alex123", channel: "https://t.me/channel1", bot: "https://t.me/bot1" },
    { id: 2, name: "Мария", age: 22, photo: "photo2.jpg", avatar: "avatar2.jpg", banner: "banner2.jpg", description: "Люблю путешествовать!", photos: ["photo3.jpg", "photo4.jpg"], tgUsername: "maria22", channel: "https://t.me/channel2", bot: "https://t.me/bot2" }
  ];
  
  const app = document.getElementById("app");
  
  function renderCatalog() {
    app.innerHTML = `<div class='grid'>${users.map(user => `
      <div class='card' onclick='openProfile(${user.id})'>
        <img src='${user.photo}' alt='${user.name}' />
        <div class='info'><b>${user.name}</b>, ${user.age}</div>
      </div>
    `).join('')}</div>`;
  }
  
  function openProfile(id) {
    const user = users.find(u => u.id === id);
    if (!user) return;
    app.innerHTML = `
      <div class='profile'>
        <div class='banner' style='background-image: url(${user.banner})'></div>
        <div class='avatar'><img src='${user.avatar}' alt='${user.name}' /></div>
        <h2>${user.name}, ${user.age}</h2>
        <p>${user.description}</p>
        <button onclick='tg.openTelegramLink("https://t.me/${user.tgUsername}")'>Личное сообщение</button>
        <button onclick='tg.openTelegramLink("${user.channel}")'>Канал</button>
        <button onclick='tg.openTelegramLink("${user.bot}")'>Оплата подписки</button>
        <button onclick='renderCatalog()'>Назад</button>
        <div class='photo-gallery'>
          ${user.photos.map(photo => `<img src='${photo}' alt='Фото' />`).join('')}
        </div>
      </div>
    `;
  }
  
  renderCatalog();  