function generateMatrix() {
  const input = document.getElementById('birthdate').value;
  if (!input) return;

  const dateParts = input.split("-");
  const day = parseInt(dateParts[2], 10);
  const month = parseInt(dateParts[1], 10);
  const year = parseInt(dateParts[0], 10);

  const digits = [...(day.toString() + month.toString() + year.toString())]
    .map(d => parseInt(d, 10));
  const sum = digits.reduce((a, b) => a + b, 0);

  const spheres = [
    { name: "Предназначение тела", value: (sum % 22) || 22 },
    { name: "Предназначение духа", value: ((sum + 3) % 22) || 22 },
    { name: "Карма рода", value: ((sum + 5) % 22) || 22 },
    { name: "Социальная реализация", value: ((sum + 7) % 22) || 22 },
    { name: "Финансы", value: ((sum + 9) % 22) || 22 },
    { name: "Энергия здоровья", value: ((sum + 11) % 22) || 22 },
    { name: "Кармическая ошибка", value: ((sum + 13) % 22) || 22 }
  ];

  const container = document.getElementById('matrix');
  container.innerHTML = '';

  spheres.forEach(s => {
    const div = document.createElement('div');
    div.className = 'sphere';
    div.innerText = `${s.name}: ${s.value}`;
    container.appendChild(div);
  });
}