function openCase(caseName) {
  const cases = {
    "New Gifts": ["🎉 50 монет", "🎁 VIP 1 день", "❌ Пусто", "🔮 Тайный бонус"],
    "Best": ["💎 500 монет", "🏆 VIP на неделю", "🎊 Секретный предмет", "❌ Ничего не выпало"]
  };

  const prizes = cases[caseName];
  if (!prizes) {
    document.getElementById("result").innerText = "Ошибка: кейс не найден";
    return;
  }
  
  const prize = prizes[Math.floor(Math.random() * prizes.length)];
  document.getElementById("result").innerHTML = `<h2>Ты выбрал <b>${caseName}</b> и получил: ${prize}</h2>`;
}
