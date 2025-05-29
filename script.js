const starNames = [
  "Путь", "Сущность", "Карма", "Дар", "Задача", "Опора",
  "Память", "Предназначение", "Сила Рода", "Боль Души",
  "Обретение Себя", "РОКОВАЯ ОШИБКА", "Будущее", "Служение"
];

function getDigits(dateStr) {
  return dateStr.replace(/-/g, '').split('').map(Number);
}

function sumDigits(array) {
  return array.reduce((a, b) => a + b, 0);
}

function reduceToDigit(n) {
  while (n > 22) {
    n = n.toString().split('').reduce((a, b) => a + Number(b), 0);
  }
  return n;
}

function calculateMatrix() {
  const birthInput = document.getElementById("birthdate").value;
  const starsContainer = document.getElementById("stars");
  starsContainer.innerHTML = "";

  if (!birthInput) {
    alert("Пожалуйста, введите дату.");
    return;
  }

  const digits = getDigits(birthInput); // Alle Ziffern aus TTMMJJJJ
  const A = sumDigits(digits);
  const B = reduceToDigit(A);
  const C = reduceToDigit(digits[0] + digits[1] + digits[2]); // Beispiel-Logik
  const D = reduceToDigit(digits[3] + digits[4] + digits[5]);

  const matrix = [
    reduceToDigit(A),   // Путь
    reduceToDigit(B),   // Сущность
    reduceToDigit(C),   // Карма
    reduceToDigit(D),   // Дар
    reduceToDigit(B + C), // Задача
    reduceToDigit(C + D), // Опора
    reduceToDigit(A + B), // Память
    reduceToDigit(C + B), // Предназначение
    reduceToDigit(A + D), // Сила Рода
    reduceToDigit(B + D), // Боль Души
    reduceToDigit(B + C + D), // Обретение себя
    reduceToDigit(C + D + A), // РОКОВАЯ ОШИБКА
    // die restlichen lassen wir aus
  ];

  for (let i = 0; i < matrix.length; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    star.innerText = `${starNames[i]}: ${matrix[i]}`;

    if (starNames[i] === "РОКОВАЯ ОШИБКА") {
      star.classList.add("special");
      starsContainer.appendChild(star);
      break;
    }

    starsContainer.appendChild(star);
  }
}