const starNames = [
  "Путь", "Сущность", "Карма", "Дар", "Задача", "Опора",
  "Память", "Предназначение", "Сила Рода", "Боль Души",
  "Обретение Себя", "РОКОВАЯ ОШИБКА"
];

function getDigits(dateStr) {
  return dateStr.replace(/-/g, '').split('').map(Number);
}

function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

function reduceTo22(n) {
  while (n > 22) {
    n = n.toString().split('').reduce((a, b) => a + Number(b), 0);
  }
  return n;
}

function calculateSubValues(baseArray) {
  const values = [];
  values.push(sum(baseArray));
  values.push(reduceTo22(values[0]));
  values.push(reduceTo22(baseArray[0] + baseArray[1]));
  values.push(reduceTo22(baseArray[2] + baseArray[3]));
  return values;
}

function calculateMatrix() {
  const input = document.getElementById("birthdate").value;
  const container = document.getElementById("matrix-container");
  container.innerHTML = "";

  if (!input) {
    alert("Введите дату рождения");
    return;
  }

  const digits = getDigits(input);
  const stars = [];

  for (let i = 0; i < starNames.length; i++) {
    const subVals = calculateSubValues([...digits, i]);
    stars.push({
      name: starNames[i],
      values: subVals
    });

    if (starNames[i] === "РОКОВАЯ ОШИБКА") break;
  }

  stars.forEach(star => {
    const div = document.createElement("div");
    div.className = "star-block";
    if (star.name === "РОКОВАЯ ОШИБКА") div.classList.add("special");

    const title = document.createElement("h2");
    title.textContent = star.name;
    div.appendChild(title);

    const sub = document.createElement("div");
    sub.className = "sub-values";
    star.values.forEach(v => {
      const span = document.createElement("span");
      span.textContent = v;
      sub.appendChild(span);
    });

    div.appendChild(sub);
    container.appendChild(div);
  });
}