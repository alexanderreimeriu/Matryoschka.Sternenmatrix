function showStars() {
  const container = document.getElementById('stars-container');
  container.innerHTML = '';

  const starNames = [
    "Путь", "Сущность", "Карма", "Дар", "Задача", "Опора", 
    "Память", "РОКОВАЯ ОШИБКА", "Будущее", "Служение"
  ];

  for (let name of starNames) {
    const star = document.createElement('div');
    star.classList.add('star');
    
    if (name === "РОКОВАЯ ОШИБКА") {
      star.classList.add('special');
    }

    star.innerText = name;
    container.appendChild(star);

    if (name === "РОКОВАЯ ОШИБКА") break;
  }
}