document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  const history = document.getElementById('history');
  const angleBtn = document.getElementById('angle-mode');

  let currentExpression = '';
  let isDegree = true; // Modo por defecto DEG (Grados)
  let memory = 0;

  // Actualizar pantalla
  function updateDisplay() {
    display.textContent = currentExpression || '0';
  }

  // Escuchar clics en los botones
  document.querySelector('.keypad').addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const num = btn.classList.contains('btn-num') ? btn.textContent : null;
    const func = btn.dataset.func;
    const op = btn.dataset.op;

    // Números y punto decimal
    if (num !== null) {
      currentExpression += num;
      updateDisplay();
      return;
    }

    // Operadores básicos
    if (op) {
      currentExpression += ` ${op} `;
      updateDisplay();
      return;
    }

    // Funciones científicas
    if (func) {
      handleScientificFunc(func);
      return;
    }

    // Acciones especiales por ID
    switch (btn.id) {
      case 'clear':
        currentExpression = '';
        history.textContent = '';
        updateDisplay();
        break;

      case 'backspace':
        currentExpression = currentExpression.trimEnd();
        currentExpression = currentExpression.slice(0, -1);
        updateDisplay();
        break;

      case 'equals':
        calculateResult();
        break;

      case 'angle-mode':
        isDegree = !isDegree;
        angleBtn.textContent = isDegree ? 'DEG' : 'RAD';
        break;

      case 'toggle-sign':
        if (currentExpression) {
          if (currentExpression.startsWith('-')) {
            currentExpression = currentExpression.substring(1);
          } else {
            currentExpression = '-' + currentExpression;
          }
          updateDisplay();
        }
        break;

      // Memoria
      case 'mc':
        memory = 0;
        break;
      case 'mr':
        currentExpression += memory.toString();
        updateDisplay();
        break;
      case 'm-plus':
        try {
          memory += parseFloat(eval(parseExpression(currentExpression)));
        } catch { }
        break;
    }
  });

  // Manejo de funciones científicas
  function handleScientificFunc(func) {
    switch (func) {
      case 'sin':
      case 'cos':
      case 'tan':
      case 'log':
      case 'ln':
      case 'sqrt':
        currentExpression += `${func}(`;
        break;
      case 'pow':
        currentExpression += '^2';
        break;
      case 'power':
        currentExpression += '^';
        break;
      case 'pi':
        currentExpression += 'π';
        break;
      case 'e':
        currentExpression += 'e';
        break;
      case 'fact':
        currentExpression += '!';
        break;
    }
    updateDisplay();
  }

  // Reemplazar sintaxis para evaluarla en JavaScript
  function parseExpression(expr) {
    let parsed = expr;

    // Constantes
    parsed = parsed.replace(/π/g, 'Math.PI');
    parsed = parsed.replace(/\be\b/g, 'Math.E');

    // Potencias y Raíces
    parsed = parsed.replace(/\^2/g, '**2');
    parsed = parsed.replace(/\^/g, '**');

    // Factorial (evaluación básica para números sencillos)
    parsed = parsed.replace(/(\d+)!/g, (_, n) => factorial(parseInt(n)));

    // Logaritmos
    parsed = parsed.replace(/log\(/g, 'Math.log10(');
    parsed = parsed.replace(/ln\(/g, 'Math.log(');
    parsed = parsed.replace(/sqrt\(/g, 'Math.sqrt(');

    // Funciones Trigonométricas (considerando DEG / RAD)
    const angleConv = isDegree ? '*(Math.PI/180)' : '';
    parsed = parsed.replace(/sin\(([^)]+)\)/g, `Math.sin(($1)${angleConv})`);
    parsed = parsed.replace(/cos\(([^)]+)\)/g, `Math.cos(($1)${angleConv})`);
    parsed = parsed.replace(/tan\(([^)]+)\)/g, `Math.tan(($1)${angleConv})`);

    return parsed;
  }

  // Función Factorial auxiliar
  function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  }

  // Calcular el resultado final
  function calculateResult() {
    if (!currentExpression) return;

    try {
      history.textContent = currentExpression + ' =';
      const parsed = parseExpression(currentExpression);
      
      // Evaluamos la expresión
      let result = eval(parsed);

      // Formatear decimales largos
      if (typeof result === 'number' && !Number.isInteger(result)) {
        result = parseFloat(result.toFixed(8));
      }

      currentExpression = result.toString();
      updateDisplay();
    } catch (err) {
      display.textContent = 'Error';
      currentExpression = '';
    }
  }
});
