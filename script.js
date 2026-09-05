'use strict';

/* ===== Elementos ===== */
const input = document.getElementById('tempInput');
const message = document.getElementById('message');
const unitButtons = Array.from(document.querySelectorAll('.unit-btn'));
const resC = document.getElementById('resC');
const resF = document.getElementById('resF');
const resK = document.getElementById('resK');
const resultCards = Array.from(document.querySelectorAll('.result-card'));
const keypad = document.getElementById('keypad');
const clearBtn = document.getElementById('clearBtn');
const speakBtn = document.getElementById('speakBtn');
const refButtons = Array.from(document.querySelectorAll('.ref-chip'));

let currentUnit = 'C';

/* ===== Conversión ===== */
const FROM_C = {
  C: (v) => v,
  F: (v) => (v * 9) / 5 + 32,
  K: (v) => v + 273.15,
};

const TO_C = {
  C: (v) => v,
  F: (v) => ((v - 32) * 5) / 9,
  K: (v) => v - 273.15,
};

function convertAll(value) {
  const c = TO_C[currentUnit](value);
  return { C: FROM_C.C(c), F: FROM_C.F(c), K: FROM_C.K(c) };
}

/* ===== Formato ===== */
function format(n) {
  if (!Number.isFinite(n)) return '—';
  if (Object.is(n, -0)) n = 0;
  return n.toLocaleString('es-ES', { maximumFractionDigits: 2 });
}

function spokenNumber(n) {
  if (Object.is(n, -0)) n = 0;
  const s = String(Math.round(n * 100) / 100);
  return s.replace('.', ' coma ');
}

/* ===== Entrada ===== */
function sanitize(raw) {
  let s = raw.replace(/[^0-9.,\-]/g, '');
  const negative = s.startsWith('-');
  s = s.replace(/-/g, '');
  const sep = s.search(/[.,]/);
  if (sep !== -1) {
    s = s.slice(0, sep) + ',' + s.slice(sep + 1).replace(/[.,]/g, '');
  }
  if (negative) s = '-' + s;
  return s;
}

function parseInput(raw) {
  return parseFloat(raw.replace(/,/g, '.'));
}

function isEmpty(raw) {
  return raw.trim().replace(/[-,.]/g, '') === '';
}

function setMessage(text, kind) {
  message.textContent = text;
  message.className = 'message' + (kind ? ' ' + kind : '');
}

function setAllResults(text) {
  resC.textContent = text;
  resF.textContent = text;
  resK.textContent = text;
}

function update() {
  const raw = input.value;
  const clean = sanitize(raw);
  if (clean !== raw) input.value = clean;

  if (isEmpty(input.value)) {
    setAllResults('—');
    setMessage('Escribe un número para ver el resultado.', 'hint');
    return;
  }

  const value = parseInput(input.value);
  if (!Number.isFinite(value)) {
    setAllResults('—');
    setMessage('Ese número no es válido. Inténtalo otra vez.', 'warning');
    return;
  }

  if (currentUnit === 'K' && value < 0) {
    setMessage('⚠️ Kelvin no puede ser negativo. El mínimo es 0 K (−273,15 °C).', 'warning');
  } else if (currentUnit === 'C' && value < -273.15) {
    setMessage('⚠️ Menos de −273,15 °C no existe: es el cero absoluto.', 'warning');
  } else if (currentUnit === 'F' && value < -459.67) {
    setMessage('⚠️ Menos de −459,67 °F no existe: es el cero absoluto.', 'warning');
  } else {
    setMessage('', '');
  }

  const r = convertAll(value);
  resC.textContent = format(r.C);
  resF.textContent = format(r.F);
  resK.textContent = format(r.K);

  resultCards.forEach((card) => {
    card.classList.remove('pulse');
    void card.offsetWidth;
    card.classList.add('pulse');
  });
}

/* ===== Selección de unidad ===== */
function selectUnit(u) {
  currentUnit = u;
  unitButtons.forEach((btn) => {
    const active = btn.dataset.unit === u;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-checked', String(active));
  });
  resultCards.forEach((card) => {
    card.classList.toggle('active', card.dataset.unit === u);
  });
  update();
}

unitButtons.forEach((btn) => {
  btn.addEventListener('click', () => selectUnit(btn.dataset.unit));
});

/* ===== Teclado ===== */
keypad.addEventListener('click', (e) => {
  const btn = e.target.closest('.key');
  if (!btn) return;
  const k = btn.dataset.key;
  if (k === 'back') {
    input.value = input.value.slice(0, -1);
  } else {
    input.value = sanitize(input.value + (k === '.' ? ',' : k));
  }
  update();
  input.focus();
});

input.addEventListener('input', update);

/* ===== Limpiar ===== */
clearBtn.addEventListener('click', () => {
  input.value = '';
  update();
  input.focus();
});

/* ===== Referencias ===== */
refButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    selectUnit(btn.dataset.unit || 'C');
    input.value = btn.dataset.value;
    update();
  });
});

/* ===== Voz ===== */
const LABELS = { C: 'grados Celsius', F: 'grados Fahrenheit', K: 'Kelvin' };

function speakText(text) {
  if (!('speechSynthesis' in window)) {
    setMessage('Tu navegador no puede leer en voz alta.', 'warning');
    return;
  }
  speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'es-ES';
  const voices = speechSynthesis.getVoices();
  const es = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith('es'));
  if (es) utter.voice = es;
  utter.rate = 0.95;
  speechSynthesis.speak(utter);
}

function speakResult() {
  if (isEmpty(input.value)) {
    speakText('Escribe un número primero y luego pulsa este botón.');
    return;
  }
  const value = parseInput(input.value);
  if (!Number.isFinite(value)) return;
  const r = convertAll(value);
  const others = ['F', 'C', 'K'].filter((u) => u !== currentUnit);
  const text =
    spokenNumber(value) + ' ' + LABELS[currentUnit] + ' equivalen a ' +
    others.map((u) => spokenNumber(r[u]) + ' ' + LABELS[u]).join(' y ') + '.';
  speakText(text);
}

speakBtn.addEventListener('click', speakResult);
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') speakResult();
});

/* ===== Inicio ===== */
update();