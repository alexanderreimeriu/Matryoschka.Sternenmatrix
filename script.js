function showMatrix() {
  const dateInput = document.getElementById('birthdate').value;
  const container = document.getElementById('matrix-container');
  container.innerHTML = '';

  if (!dateInput) {
    alert('Пожалуйста, введите дату рождения');
    return;
  }

  const birthDate = new Date(dateInput);
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  const year = birthDate.getFullYear();

  const allDigits = [...`${day < 10 ? '0' : ''}${day}`, `${month < 10 ? '0' : ''}${month}`, `${year}`]
    .join('')
    .split('')
    .map(Number);

  const values = calculateFullStarMatrix(allDigits);

  const sphereNames = [
    'Сфера 1: Предназначение тела',
    'Сфера 2: Энергия души',
    'Сфера 3: Кармическая задача',
    'Сфера 4: Социальная реализация',
    'Сфера 5: Личное развитие',
    'Сфера 6: Родовая энергия',
    'Сфера 7: Энергия таланта'
  ];

  for (let i = 0; i < sphereNames.length; i++) {
    const block = document.createElement('div');
    block.className = 'star-block';

    const heading = document.createElement('h3');
    heading.textContent = sphereNames[i];
    block.appendChild(heading);

    const valuesDiv = document.createElement('div');
    valuesDiv.className = 'sub-values';
    values[i].forEach(v => {
      const span = document.createElement('span');
      span.textContent = v;
      valuesDiv.appendChild(span);
    });

    block.appendChild(valuesDiv);
    container.appendChild(block);
  }

  // Visualisierung starten
  renderSVGStar(values);
}

function sumDigits(arr) {
  return arr.reduce((sum, val) => sum + val, 0);
}

function reduceTo22(num) {
  let result = num;
  while (result > 22) {
    result = result.toString().split('').reduce((a, b) => a + Number(b), 0);
  }
  return result === 0 ? 22 : result;
}

function calculateFullStarMatrix(digits) {
  const sum1 = sumDigits(digits);
  const sum2 = sumDigits(sum1.toString().split('').map(Number));
  const sum3 = sumDigits([...digits, ...sum1.toString().split('').map(Number)]);
  const sum4 = sumDigits(sum3.toString().split('').map(Number));

  const values = [];

  values.push([digits[0], digits[1], reduceTo22(sum1)]);
  values.push([digits[2], digits[3], reduceTo22(sum2)]);
  values.push([digits[4], digits[5], reduceTo22(sum3)]);
  values.push([digits[6], digits[7], reduceTo22(sum4)]);
  values.push([reduceTo22(sum1 + sum2), reduceTo22(sum3 + sum4), reduceTo22(sum1 + sum4)]);
  values.push([reduceTo22(sum1 + sum3), reduceTo22(sum2 + sum4), reduceTo22(sum1 + sum2 + sum3 + sum4)]);
  values.push([reduceTo22(sum1 * 2), reduceTo22(sum2 * 2), reduceTo22(sum1 + sum2)]);

  return values;
}

function renderSVGStar(values) {
  const svgContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgContainer.setAttribute("width", "400");
  svgContainer.setAttribute("height", "400");
  svgContainer.setAttribute("viewBox", "0 0 400 400");
  svgContainer.classList.add("matrix-svg");

  const centerX = 200;
  const centerY = 200;
  const radius = 120;
  const angleStep = (2 * Math.PI) / 7;

  let points = [];

  for (let i = 0; i < 7; i++) {
    const angle = i * angleStep - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push({ x, y });

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", "20");
    circle.setAttribute("fill", "#f8f8f8");
    circle.setAttribute("stroke", "#333");
    circle.setAttribute("stroke-width", "1");
    svgContainer.appendChild(circle);

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", x);
    text.setAttribute("y", y + 5);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("font-size", "14");
    text.textContent = values[i][2]; // Hauptwert der Sphäre
    svgContainer.appendChild(text);
  }

  // Linien zwischen Punkten
  for (let i = 0; i < points.length; i++) {
    const start = points[i];
    const end = points[(i + 1) % points.length];
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", start.x);
    line.setAttribute("y1", start.y);
    line.setAttribute("x2", end.x);
    line.setAttribute("y2", end.y);
    line.setAttribute("stroke", "#999");
    line.setAttribute("stroke-width", "1");
    svgContainer.insertBefore(line, svgContainer.firstChild);
  }

  const matrixWrapper = document.createElement("div");
  matrixWrapper.classList.add("svg-wrapper");
  matrixWrapper.appendChild(svgContainer);

  document.getElementById("matrix-container").appendChild(matrixWrapper);
}
