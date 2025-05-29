const starNames = [
  "Путь", "Сущность", "Карма", "Дар", "Задача", "Опора",
  "Память", "Предназначение", "Сила Рода", "Боль Души",
  "Обретение Себя", "РОКОВАЯ ОШИБКА", "Будущее", "Служение"
];

function calculateMatrix() {
  const birthInput = document.getElementById("birthdate").value;
  const starsContainer = document.getElementById("stars");
  starsContainer.innerHTML = "";

  if (!birthInput) {
    alert("Пожалуйста, введите дату.");
    return;
  }

  const birthDate = new Date(birthInput);
  const numbers = [
    birthDate.getDate(),
    birthDate.getMonth() + 1,
    birthDate.getFullYear()
  ];

  const reduced = numbers.flatMap(num => num.toString().split('').map(Number));
  const total = reduced.reduce((a, b) => a + b, 0);

  for (let i = 0; i < starNames.length; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    star.innerText = starNames[i];

    if (starNames[i] === "РОКОВАЯ ОШИБКА") {
      star.classList.add("special");
      starsContainer.appendChild(star);
      break;
    }

    starsContainer.appendChild(star);
  }
}