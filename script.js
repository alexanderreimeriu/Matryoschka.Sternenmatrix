 <script>
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

function calculateMatrix() {
  const input = document.getElementById("birthdate").value;
  const container = document.getElementById("matrix-container");

  container.innerHTML = "";

  if (!input) {
    alert("Введите дату рождения");
    return;
  }

  const digits = getDigits(input);
  const values = [];

  for (let i = 0; i < 12; i++) {
    const a = sum([...digits, i]);
    const b = reduceTo22(a);
    const c = reduceTo22(a + b);
    const d = reduceTo22(b + c);
    values.push({ name: `Сфера ${i + 1}`, all: [a, b, c, d] });
  }

  values.forEach((star) => {
    const box = document.createElement("div");
    box.className = "star-block";

    const title = document.createElement("h3");
    title.textContent = star.name;
    box.appendChild(title);

    const sub = document.createElement("div");
    sub.className = "sub-values";
    star.all.forEach((v) => {
      const span = document.createElement("span");
      span.textContent = v;
      sub.appendChild(span);
    });

    box.appendChild(sub);
    container.appendChild(box);
  });
}
  </script>