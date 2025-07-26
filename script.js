document.addEventListener('DOMContentLoaded', () => {

  const user = {
    name: "Иван Иванов",
    balance: 1000,
    inventory: []
  };

  const cases = {
    "New Gifts": ["🎉 50 монет", "🎁 VIP 1 день", "❌ Пусто", "🔮 Тайный бонус"],
    "Best": ["💎 500 монет", "🏆 VIP на неделю", "🎊 Секретный предмет", "❌ Ничего не выпало"]
  };

  const sections = {
    cases: document.getElementById('cases-section'),
    caseOpen: document.getElementById('case-open-section'),
    profile: document.getElementById('profile-section'),
  };

  const caseNameElem = document.getElementById('case-name');
  const animationBox = document.getElementById('animation-box');
  const openBtn = document.getElementById('open-case-btn');
  const prizeResult = document.getElementById('prize-result');
  const backToCasesBtn = document.getElementById('back-to-cases');

  function showSection(sectionKey) {
    Object.keys(sections).forEach(key => {
      if(key === sectionKey) sections[key].classList.remove('hidden');
      else sections[key].classList.add('hidden');
    });
  }

  // Навигация по меню снизу
  document.getElementById('btn-cases').onclick = () => {
    showSection('cases');
    setActiveButton('btn-cases');
  };

  document.getElementById('btn-profile').onclick = () => {
    updateProfile();
    showSection('profile');
    setActiveButton('btn-profile');
  };

  document.getElementById('btn-inventory').onclick = () => {
    alert('Инвентарь пока в разработке!');
  };

  function setActiveButton(id) {
    ['btn-cases','btn-profile','btn-inventory'].forEach(btnId => {
      document.getElementById(btnId).classList.toggle('active', btnId === id);
    });
  }

  function updateProfile() {
    document.getElementById('profile-name').innerText = user.name;
    document.getElementById('profile-balance').innerText = user.balance;
  }

  window.enterCase = function(caseName) {
    caseNameElem.textContent = caseName;
    prizeResult.textContent = "";
    animationBox.classList.remove('glowing');
    openBtn.disabled = false;
    showSection('caseOpen');
    setActiveButton(null);
  };

  function openCase() {
    openBtn.disabled = true;
    prizeResult.textContent = "";
    animationBox.classList.add('glowing');

    setTimeout(() => {
      animationBox.classList.remove('glowing');
      const prizes = cases[caseNameElem.textContent];
      const prize = prizes[Math.floor(Math.random() * prizes.length)];

      user.inventory.push(prize);
      if(prize.includes('монет')) {
        const coins = parseInt(prize.match(/\d+/));
        if(coins) user.balance += coins;
      }

      prizeResult.innerHTML = `<strong>Ты получил: ${prize}</strong>`;
      updateProfile();
    }, 3000);
  }

  backToCasesBtn.onclick = () => {
    showSection('cases');
    setActiveButton('btn-cases');
  };

  openBtn.onclick = openCase;

  // Назначаем клики на кейсы
  document.querySelectorAll('.case').forEach(elem => {
    elem.addEventListener('click', () => {
      const caseName = elem.getAttribute('data-case');
      enterCase(caseName);
    });
  });

  // Стартовая страница — кейсы
  showSection('cases');
  setActiveButton('btn-cases');
  updateProfile();
});
