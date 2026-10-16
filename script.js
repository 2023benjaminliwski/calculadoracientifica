* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.calculator {
  background: #141c26;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  width: 100%;
  max-width: 520px;
  padding: 25px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* Pantalla */
.display-container {
  background: #0d131a;
  border-radius: 12px;
  padding: 15px 20px;
  margin-bottom: 20px;
  text-align: right;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.5);
  min-height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  word-wrap: break-word;
  word-break: break-all;
}

.history {
  color: #7a8b9e;
  font-size: 0.9rem;
  min-height: 1.2rem;
}

.display {
  color: #ffffff;
  font-size: 2.2rem;
  font-weight: 600;
}

/* Botonera Superior */
.top-row {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}

/* Cuerpo Principal Organizado */
.main-body {
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 12px;
}

/* Panel Científico (2 Columnas) */
.scientific-panel {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

/* Panel Numérico (4 Columnas) */
.numeric-panel {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

/* Estilos de Botones */
.btn {
  background: #1e293b;
  color: #e2e8f0;
  border: none;
  border-radius: 10px;
  padding: 14px 2px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.btn:hover {
  background: #334155;
  transform: translateY(-2px);
}

.btn:active {
  transform: translateY(1px);
  box-shadow: none;
}

.btn-num {
  background: #0f172a;
  color: #ffffff;
  font-weight: 600;
  font-size: 1.1rem;
}

.btn-num:hover {
  background: #1e293b;
}

.btn-operator {
  background: #3b82f6;
  color: #ffffff;
  font-size: 1.1rem;
}

.btn-operator:hover {
  background: #2563eb;
}

.btn-clear {
  background: #ef4444;
  color: #ffffff;
}

.btn-clear:hover {
  background: #dc2626;
}

.btn-equal {
  background: #10b981;
  color: #ffffff;
  font-weight: bold;
}

.btn-equal:hover {
  background: #059669;
}

.btn-mode {
  background: #8b5cf6;
  color: #ffffff;
  font-weight: bold;
}

.btn-action {
  background: #283548;
  color: #94a3b8;
  font-size: 0.8rem;
}

/* Ajustes Responsivos */
@media (max-width: 480px) {
  .main-body {
    grid-template-columns: 1fr;
  }
  .scientific-panel {
    grid-template-columns: repeat(4, 1fr);
  }
  .calculator {
    padding: 15px;
  }
  .btn {
    padding: 12px 2px;
    font-size: 0.85rem;
  }
}
