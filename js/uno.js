// ==========================================
// CRONÓMETRO HIIT / DESCANSOS (WEB AUDIO)
// ==========================================
let timerSeconds = 40;
let timerInitial = 40;
let timerInterval = null;
let isHiit = false;
let hiitWorkPhase = true;

function playBeep(freq = 880, duration = 0.25) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Ignorar si el navegador bloquea audio sin interacción
  }
}

function updateTimerUI() {
  const mins = String(Math.floor(timerSeconds / 60)).padStart(2, "0");
  const secs = String(timerSeconds % 60).padStart(2, "0");
  document.getElementById("timerDisplay").textContent = `${mins}:${secs}`;
}

function setTimer(sec) {
  clearInterval(timerInterval);
  timerInterval = null;
  isHiit = false;
  timerSeconds = sec;
  timerInitial = sec;
  const phaseEl = document.getElementById("timerPhase");
  phaseEl.textContent = "Listo";
  phaseEl.classList.remove("rest");
  document.getElementById("timerToggleBtn").textContent = "Iniciar";
  updateTimerUI();
}

function startHiitMode() {
  clearInterval(timerInterval);
  timerInterval = null;
  isHiit = true;
  hiitWorkPhase = true;
  timerSeconds = 40;
  const phaseEl = document.getElementById("timerPhase");
  phaseEl.textContent = "HIIT Trabajo";
  phaseEl.classList.remove("rest");
  document.getElementById("timerToggleBtn").textContent = "Iniciar";
  updateTimerUI();
}

function toggleTimer() {
  const btn = document.getElementById("timerToggleBtn");
  const phaseEl = document.getElementById("timerPhase");

  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    btn.textContent = "Reanudar";
    return;
  }

  if (!isHiit) phaseEl.textContent = "En curso";
  btn.textContent = "Pausar";

  timerInterval = setInterval(() => {
    if (timerSeconds > 0) {
      timerSeconds--;
      updateTimerUI();
    } else {
      if (isHiit) {
        hiitWorkPhase = !hiitWorkPhase;
        timerSeconds = hiitWorkPhase ? 40 : 20;
        phaseEl.textContent = hiitWorkPhase ? "HIIT Trabajo" : "Descanso 20s";
        phaseEl.classList.toggle("rest", !hiitWorkPhase);
        playBeep(hiitWorkPhase ? 950 : 520, 0.35);
        updateTimerUI();
      } else {
        clearInterval(timerInterval);
        timerInterval = null;
        phaseEl.textContent = "¡Tiempo!";
        btn.textContent = "Iniciar";
        playBeep(880, 0.45);
      }
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  if (isHiit) {
    startHiitMode();
  } else {
    setTimer(timerInitial);
  }
}

// ==========================================
// DATOS SECCIÓN 1: RUTINA EN CASA (PRIORIDAD CORE)
// ==========================================
const homeRoutine = [
  {
    day: "Lunes",
    title: "Core Anti-Extensión + Empuje (Pecho, Hombro, Tríceps)",
    duration: "50 min",
    focus: "Prioridad Core + Tren Superior",
    exercises: [
      { name: "Plancha RKC (Máxima Tensión)", desc: "Contrae glúteos y abdomen jalando codos hacia los pies.", specs: "4 series × 35 seg", core: true },
      { name: "Ab Wheel Casero (Deslizamiento con Toalla)", desc: "De rodillas sobre piso liso, extiende brazos sin arquear lumbar.", specs: "4 series × 10-12 reps", core: true },
      { name: "Flexiones Declinadas (Pies en silla)", desc: "Enfoque en haz clavicular del pecho y deltoide anterior.", specs: "4 series × 12-15 reps", core: false },
      { name: "Pike Push-Ups (Flexiones en V)", desc: "Cadera elevada para trabajar hombros con peso corporal.", specs: "4 series × 10-12 reps", core: false },
      { name: "Fondos en Silla / Banco", desc: "Baja controlado a 90° manteniendo espalda cerca del borde.", specs: "3 series × 15 reps", core: false }
    ]
  },
  {
    day: "Martes",
    title: "Core Rotacional + Piernas y Glúteos Explosivos",
    duration: "55 min",
    focus: "Prioridad Core + Tren Inferior",
    exercises: [
      { name: "Russian Twists con Peso (Mochila)", desc: "Gira el torso completo manteniendo pecho erguido.", specs: "4 series × 24 giros", core: true },
      { name: "Plancha Lateral con Elevación de Cadera", desc: "Fortalece oblicuos y cuadrado lumbar para estabilidad.", specs: "3 series × 12/lado", core: true },
      { name: "Sentadilla Búlgara", desc: "Pie trasero elevado en silla; el mejor ejercicio unilateral en casa.", specs: "4 series × 10-12/pierna", core: false },
      { name: "Puente de Glúteo a Una Pierna", desc: "Empuje explosivo arriba con pausa de 2 segundos.", specs: "4 series × 15/pierna", core: false },
      { name: "Zancadas Reversas + Salto", desc: "Potencia de cuádriceps y transferencia directa al sprint.", specs: "3 series × 12/pierna", core: false }
    ]
  },
  {
    day: "Miércoles",
    title: "Core Inferior + Tracción (Espalda y Bíceps)",
    duration: "50 min",
    focus: "Prioridad Core + Espalda",
    exercises: [
      { name: "Elevación de Piernas Colgado o Tumbado Controlado", desc: "Sube piernas rectas y baja en 3 segundos sin despegar lumbar.", specs: "4 series × 12-15 reps", core: true },
      { name: "Hollow Body Hold (Barquito)", desc: "Zona lumbar pegada al suelo, brazos y piernas extendidos.", specs: "4 series × 30-40 seg", core: true },
      { name: "Remo Invertido Bajo Mesa Firme / Barra", desc: "Cuerpo recto, lleva el pecho hacia el borde.", specs: "4 series × 10-14 reps", core: false },
      { name: "Superman con Retracción Escapular", desc: "Eleva pecho y aprieta escápulas 2 segundos en cada repetición.", specs: "4 series × 15 reps", core: false },
      { name: "Curl de Bíceps con Mochila Cargada", desc: "Codos pegados al torso, subida explosiva y bajada lenta.", specs: "3 series × 12-15 reps", core: false }
    ]
  },
  {
    day: "Jueves",
    title: "Core Dinámico + Circuito Metabólico Quema-Grasa",
    duration: "40 min",
    focus: "Oxidación de Grasa + Core",
    exercises: [
      { name: "Mountain Climbers Cruzados", desc: "Rodilla hacia el codo contrario a ritmo rápido sin elevar cadera.", specs: "4 series × 40 seg", core: true },
      { name: "Bicycle Crunches Lentos y Controlados", desc: "Codo a rodilla opuesta con 1 segundo de pausa en cada giro.", specs: "4 series × 20 reps", core: true },
      { name: "Burpees con Flexión Completa", desc: "Trabajo cardiovascular y muscular de cuerpo completo.", specs: "4 series × 12 reps", core: false },
      { name: "Sentadilla con Salto (Jump Squats)", desc: "Aterriza suave y vuelve a saltar de inmediato.", specs: "4 series × 15 reps", core: false },
      { name: "Jumping Jacks / Skipping Alto", desc: "Mantén pulsaciones altas entre bloques.", specs: "4 series × 45 seg", core: false }
    ]
  },
  {
    day: "Viernes",
    title: "Core Estabilidad Total + Full Body Fuerza",
    duration: "55 min",
    focus: "Prioridad Core + Cuerpo Completo",
    exercises: [
      { name: "Dead Bug (Bicho Muerto) Lento", desc: "Extiende brazo y pierna opuesta exhalando todo el aire.", specs: "4 series × 10/lado", core: true },
      { name: "Plancha Comando (Subir y Bajar Codos)", desc: "Evita que la cadera se balancee de lado a lado.", specs: "3 series × 12 reps", core: true },
      { name: "Flexiones Diamante / Cerradas", desc: "Enfoque máximo en tríceps y zona interna del pecho.", specs: "4 series × 10-12 reps", core: false },
      { name: "Sentadilla Tempo (3 seg bajando)", desc: "Aumenta el tiempo bajo tensión para hipertrofia.", specs: "4 series × 15 reps", core: false },
      { name: "Remo Unilateral con Mochila", desc: "Apoya una mano en silla y tracciona hacia la cadera.", specs: "3 series × 12/brazo", core: false }
    ]
  },
  {
    day: "Sábado",
    title: "Core Isométrico + Pantorrillas y Acondicionamiento",
    duration: "40 min",
    focus: "Definición Abdominal + Resistencia",
    exercises: [
      { name: "V-Ups (Navajas Abdominales)", desc: "Sube torso y piernas simultáneamente tocando puntas de pies.", specs: "4 series × 12-15 reps", core: true },
      { name: "Vacuum Abdominal (Hipopresivos)", desc: "Expulsa todo el aire y mete el ombligo hacia adentro.", specs: "4 series × 25 seg", core: true },
      { name: "Elevación de Talones a Una Pierna", desc: "En escalón o libro grueso; clave para agilidad en futsal.", specs: "4 series × 18/pierna", core: false },
      { name: "Shadow Boxing + Desplazamientos Laterales", desc: "Movilidad rápida de pies y resistencia aeróbica.", specs: "4 rounds × 2 min", core: false }
    ]
  },
  {
    day: "Domingo",
    title: "Recuperación Activa, Movilidad y Core Suave",
    duration: "25 min",
    focus: "Descanso Muscular y Flexibilidad",
    exercises: [
      { name: "Bird-Dog (Perro de Caza)", desc: "Estabilidad lumbar y coordinación cruzada.", specs: "3 series × 10/lado", core: true },
      { name: "Estiramiento Gato-Camello + Cobra", desc: "Libera tensión en columna torácica, lumbar y recto abdominal.", specs: "3 series × 45 seg", core: false },
      { name: "Movilidad de Cadera 90/90 e Isquiotibiales", desc: "Previene lesiones musculares para la semana siguiente.", specs: "10 minutos suaves", core: false }
    ]
  }
];

// ==========================================
// DATOS SECCIÓN 5: ENTRENAMIENTO FÚTBOL SALA
// ==========================================
const futsalRoutine = [
  {
    day: "Lunes",
    title: "Control de Balón con Planta + Conducción en Espacio Reducido",
    duration: "45 min",
    focus: "Control de Balón y Agilidad",
    exercises: [
      { name: "Pisadas Rápidas sobre Balón (Toe Taps + Roladas)", desc: "Alterna planta derecha e izquierda manteniendo vista al frente.", specs: "4 series × 1 min" },
      { name: "Slalom en Zig-Zag con Planta y Borde Interno", desc: "Usa 5 conos o botellas separadas a 80 cm; cambios de dirección secos.", specs: "6 pasadas ida/vuelta" },
      { name: "Control Orientado contra Pared", desc: "Pasa fuerte a la pared, pisa el balón y gira 180° en un solo toque.", specs: "4 series × 15/pierna" },
      { name: "Sprints Cortos 5m - 10m - 5m", desc: "Arranque explosivo frenando con planta de pie en cada línea.", specs: "6 repeticiones" }
    ]
  },
  {
    day: "Martes",
    title: "Resistencia Intermitente Específica de Futsal (HIIT)",
    duration: "45 min",
    focus: "Resistencia Anaeróbica",
    exercises: [
      { name: "Suicidios de Cancha (6m - 12m - 20m)", desc: "Ida y vuelta a máxima velocidad simulando transiciones defensa-ataque.", specs: "2 bloques × 5 series" },
      { name: "Desplazamiento Defensivo Lateral + Sprint", desc: "Postura baja en zig-zag 8 metros y sprint frontal 10 metros.", specs: "6 repeticiones" },
      { name: "Conducción a Máxima Velocidad + Freno en Seco", desc: "Conduce 15 m, pisa el balón y cambia de ritmo inmediatamente.", specs: "6 repeticiones" },
      { name: "Trote Regenerativo + Respiración Nasal", desc: "Recuperación controlada para acostumbrar al cuerpo a la altura.", specs: "8 minutos" }
    ]
  },
  {
    day: "Miércoles",
    title: "Primer Toque, Pase Rápido y Perfilamiento",
    duration: "40 min",
    focus: "Técnica bajo Presión",
    exercises: [
      { name: "Pared a Un Toque con Ambos Perfiles", desc: "A 2 metros de la pared, golpea continuo sin dejar que el balón se detenga.", specs: "4 series × 45 seg" },
      { name: "Recepción con Planta + Regate Lateral (La Croqueta)", desc: "Pisa, arrastra de izquierda a derecha y acelera 3 metros.", specs: "4 series × 12 reps" },
      { name: "Control Aéreo y Semivolea", desc: "Lanza el balón hacia arriba, amortigua con empeine/muslo y pisa.", specs: "3 series × 15 reps" },
      { name: "Escalera de Coordinación (Frecuencia de Pies)", desc: "Entradas y salidas rápidas para mejorar velocidad de reacción.", specs: "6 pasadas" }
    ]
  },
  {
    day: "Jueves",
    title: "Velocidad de Reacción y Explosividad",
    duration: "45 min",
    focus: "Velocidad Pura y Aceleración",
    exercises: [
      { name: "Salidas desde Sentado / Boca Abajo", desc: "Levántate explosivo a la señal y esprinta 10 metros con balón.", specs: "8 repeticiones" },
      { name: "Cambios de Dirección en Estrella (4 Puntos)", desc: "Desde el centro toca adelante, izquierda, derecha y atrás a máxima velocidad.", specs: "5 series × 20 seg" },
      { name: "Saltos Laterales Monopodales (Patinador)", desc: "Potencia de frenado y arranque lateral en cancha dura.", specs: "4 series × 12/pierna" },
      { name: "1 vs 1 Simulado con Finta de Cuerpo", desc: "Amaga salida por un lado sin tocar balón y sal explosivo por el otro.", specs: "4 series × 10 reps" }
    ]
  },
  {
    day: "Viernes",
    title: "Definición Rápida (Puntera y Empeine) + Resistencia",
    duration: "45 min",
    focus: "Finalización y Toma de Decisiones",
    exercises: [
      { name: "Control Orientado y Remate de Puntera en 1 Segundo", desc: "El tiro más efectivo en futsal: poco recorrido de pierna y máxima potencia.", specs: "4 series × 10 tiros" },
      { name: "Pared + Definición al Segundo Palo", desc: "Toca a pared, desmárcate en diagonal y define raso.", specs: "3 series × 8/lado" },
      { name: "Circuito Fatiga + Precisión", desc: "10 burpees + 15 m sprint + pase preciso a objetivo pequeño.", specs: "5 rondas" }
    ]
  },
  {
    day: "Sábado",
    title: "Partido Real / Pichanga Competitiva de Fútbol Sala",
    duration: "60 min",
    focus: "Aplicación Real en Cancha",
    exercises: [
      { name: "Calentamiento Pre-Partido (Movilidad + Pases Cortos)", desc: "Activa tobillos, isquiotibiales y ritmo cardíaco 10 min antes.", specs: "10 minutos" },
      { name: "Partido Intenso (Rotaciones Cortas de 4-5 min)", desc: "Aplica control con planta, coberturas defensivas y sprints cortos.", specs: "45-50 minutos" }
    ]
  },
  {
    day: "Domingo",
    title: "Descanso Total / Soltura de Piernas",
    duration: "20 min",
    focus: "Recuperación Muscular",
    exercises: [
      { name: "Caminata Suave + Estiramiento de Gemelos y Aductores", desc: "Descarga la musculatura tras el partido del sábado.", specs: "15-20 minutos" }
    ]
  }
];

// ==========================================
// RENDERIZADO DINÁMICO DE RUTINAS (1 Y 5)
// ==========================================
function setupRoutineTabs(tabsContainerId, cardContainerId, dataList, activeClass) {
  const tabsEl = document.getElementById(tabsContainerId);
  const cardEl = document.getElementById(cardContainerId);

  function renderDay(index) {
    const item = dataList[index];
    Array.from(tabsEl.children).forEach((btn, idx) => {
      btn.classList.toggle(activeClass, idx === index);
    });

    cardEl.innerHTML = `
      <div class="workout-meta">
        <div>
          <h3>${item.day}: ${item.title}</h3>
          <span class="subtitle-muted">⏱️ Duración estimada: ${item.duration}</span>
        </div>
        <span class="badge ${activeClass === 'active' ? 'badge-focus' : 'badge-futsal'}">${item.focus}</span>
      </div>
      <div class="exercise-list">
        ${item.exercises.map(ex => `
          <div class="exercise-item ${ex.core ? 'core-priority' : ''}">
            <div>
              ${ex.core ? '<span class="badge badge-core">🔥 Prioridad Core</span>' : ''}
              <h4>${ex.name}</h4>
              <p>${ex.desc}</p>
            </div>
            <div class="exercise-specs">
              <span>Volumen:</span>
              <span>${ex.specs}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  tabsEl.innerHTML = dataList.map((d, idx) =>
    `<button class="day-btn" data-idx="${idx}">${d.day}</button>`
  ).join('');

  tabsEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('day-btn')) {
      renderDay(Number(e.target.dataset.idx));
    }
  });

  renderDay(0);
}

setupRoutineTabs('homeDayTabs', 'homeWorkoutCard', homeRoutine, 'active');
setupRoutineTabs('futsalDayTabs', 'futsalWorkoutCard', futsalRoutine, 'futsal-active');

// ==========================================
// SECCIÓN 3: CALENDARIO DE CUMPLIMIENTO (LOCALSTORAGE)
// ==========================================
const habits = [
  "💪 Rutina en Casa + Core",
  "🥗 Plan de Alimentación (Proteína + Déficit)",
  "⚽ Entrenamiento Fútbol Sala",
  "💧 Hidratación (2.5L+) y Vitaminas"
];
const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const STORAGE_CURRENT = "fitaltiplano_current_week_v1";
const STORAGE_HISTORY = "fitaltiplano_history_v1";

let currentChecks = JSON.parse(localStorage.getItem(STORAGE_CURRENT)) || {};

function renderComplianceTable() {
  const tbody = document.getElementById("complianceBody");
  tbody.innerHTML = habits.map((habit, hIdx) => `
    <tr>
      <td>${habit}</td>
      ${days.map((_, dIdx) => {
        const key = `${hIdx}-${dIdx}`;
        const checked = currentChecks[key] ? "checked" : "";
        return `<td><input type="checkbox" class="habit-check" data-key="${key}" ${checked}></td>`;
      }).join("")}
    </tr>
  `).join("");

  tbody.querySelectorAll(".habit-check").forEach(cb => {
    cb.addEventListener("change", (e) => {
      currentChecks[e.target.dataset.key] = e.target.checked;
      localStorage.setItem(STORAGE_CURRENT, JSON.stringify(currentChecks));
      updateProgressUI();
    });
  });

  updateProgressUI();
}

function updateProgressUI() {
  const total = habits.length * days.length;
  const completed = Object.values(currentChecks).filter(Boolean).length;
  const percent = Math.round((completed / total) * 100);

  document.getElementById("progressPercent").textContent = `${percent}%`;
  document.getElementById("completedCount").textContent = `${completed} de ${total} hábitos completados`;
  document.getElementById("progressBar").style.width = `${percent}%`;
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

function saveWeekProgress() {
  const total = habits.length * days.length;
  const completed = Object.values(currentChecks).filter(Boolean).length;
  const percent = Math.round((completed / total) * 100);
  const today = new Date().toLocaleDateString("es-BO", { day: "2-digit", month: "short", year: "numeric" });

  const history = JSON.parse(localStorage.getItem(STORAGE_HISTORY)) || [];
  history.unshift({ date: today, completed, total, percent });
  localStorage.setItem(STORAGE_HISTORY, JSON.stringify(history.slice(0, 12)));

  renderHistory();
  showToast(`✅ Avance guardado (${percent}% completado)`);
}

function resetCurrentWeek() {
  if (confirm("¿Deseas limpiar las casillas de la semana actual para iniciar una nueva?")) {
    currentChecks = {};
    localStorage.setItem(STORAGE_CURRENT, JSON.stringify(currentChecks));
    renderComplianceTable();
    showToast("🔄 Semana reiniciada");
  }
}

function renderHistory() {
  const history = JSON.parse(localStorage.getItem(STORAGE_HISTORY)) || [];
  const container = document.getElementById("historyContainer");
  if (!history.length) {
    container.innerHTML = `<span class="subtitle-muted">Aún no guardaste registros semanales.</span>`;
    return;
  }
  container.innerHTML = history.map(item => `
    <div class="history-pill">
      📅 ${item.date}: <strong>${item.percent}%</strong> (${item.completed}/${item.total})
    </div>
  `).join("");
}

// ==========================================
// TRACKER DE PESO Y CINTURA + GRÁFICO SVG
// ==========================================
const STORAGE_BODY = "fitaltiplano_body_records_v1";
document.getElementById("trackDate").valueAsDate = new Date();

function getBodyRecords() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_BODY));
  if (saved && saved.length) return saved;
  const initial = [{ date: "Inicio", weight: 72.0, waist: 82.0 }];
  localStorage.setItem(STORAGE_BODY, JSON.stringify(initial));
  return initial;
}

function addBodyRecord() {
  const dateVal = document.getElementById("trackDate").value;
  const weightVal = parseFloat(document.getElementById("trackWeight").value);
  const waistVal = parseFloat(document.getElementById("trackWaist").value);

  if (!dateVal || isNaN(weightVal) || isNaN(waistVal)) {
    alert("Por favor completa fecha, peso y medida de cintura.");
    return;
  }

  const records = getBodyRecords();
  records.push({ date: dateVal, weight: weightVal, waist: waistVal });
  localStorage.setItem(STORAGE_BODY, JSON.stringify(records));

  document.getElementById("trackWeight").value = "";
  document.getElementById("trackWaist").value = "";
  renderBodyTracker();
  showToast("⚖️ Medida corporal registrada");
}

function renderBodyTracker() {
  const records = getBodyRecords();
  const svg = document.getElementById("weightChart");
  const listEl = document.getElementById("bodyRecordsList");
  const deltaEl = document.getElementById("weightDeltaSummary");

  if (records.length >= 2) {
    const first = records[0];
    const last = records[records.length - 1];
    const diffW = (last.weight - first.weight).toFixed(1);
    const diffC = (last.waist - first.waist).toFixed(1);
    deltaEl.textContent = `Cambio total: ${diffW > 0 ? '+' : ''}${diffW} kg · Cintura: ${diffC > 0 ? '+' : ''}${diffC} cm`;
  } else {
    deltaEl.textContent = `Base inicial: ${records[0].weight} kg · ${records[0].waist} cm`;
  }

  const width = 600, height = 110, pad = 25;
  const weights = records.map(r => r.weight);
  const minW = Math.min(...weights) - 1;
  const maxW = Math.max(...weights) + 1;

  const points = records.map((r, i) => {
    const x = records.length === 1
      ? width / 2
      : pad + (i * (width - pad * 2)) / (records.length - 1);
    const y = height - pad - ((r.weight - minW) / (maxW - minW)) * (height - pad * 2);
    return { x, y, ...r };
  });

  const polyline = points.map(p => `${p.x},${p.y}`).join(" ");

  svg.innerHTML = `
    <line x1="${pad}" y1="${height - pad}" x2="${width - pad}" y2="${height - pad}" stroke="#243252" stroke-width="1" />
    ${points.length > 1 ? `<polyline fill="none" stroke="#38bdf8" stroke-width="3" points="${polyline}" />` : ''}
    ${points.map(p => `
      <circle cx="${p.x}" cy="${p.y}" r="5" fill="#10b981" />
      <text x="${p.x}" y="${p.y - 10}" fill="#f1f5f9" font-size="11" text-anchor="middle" font-weight="bold">${p.weight}kg</text>
      <text x="${p.x}" y="${height - 6}" fill="#94a3b8" font-size="10" text-anchor="middle">${p.date}</text>
    `).join("")}
  `;

  listEl.innerHTML = records.slice().reverse().slice(0, 8).map(r => `
    <div class="history-pill">
      📅 ${r.date}: <strong>${r.weight} kg</strong> · Cintura: <strong>${r.waist} cm</strong>
    </div>
  `).join("");
}

// ==========================================
// EXPORTAR / IMPORTAR RESPALDO JSON
// ==========================================
function exportAllData() {
  const payload = {
    currentWeek: JSON.parse(localStorage.getItem(STORAGE_CURRENT)) || {},
    history: JSON.parse(localStorage.getItem(STORAGE_HISTORY)) || [],
    bodyRecords: getBodyRecords()
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `fitaltiplano_respaldo_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast("⬇️ Respaldo JSON descargado");
}

function importAllData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.currentWeek) localStorage.setItem(STORAGE_CURRENT, JSON.stringify(data.currentWeek));
      if (data.history) localStorage.setItem(STORAGE_HISTORY, JSON.stringify(data.history));
      if (data.bodyRecords) localStorage.setItem(STORAGE_BODY, JSON.stringify(data.bodyRecords));
      currentChecks = JSON.parse(localStorage.getItem(STORAGE_CURRENT)) || {};
      renderComplianceTable();
      renderHistory();
      renderBodyTracker();
      showToast("⬆️ Respaldo restaurado con éxito");
    } catch (err) {
      alert("El archivo JSON no tiene un formato válido.");
    }
  };
  reader.readAsText(file);
}

// Inicializar módulos
renderComplianceTable();
renderHistory();
renderBodyTracker();