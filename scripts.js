document.addEventListener("DOMContentLoaded", () => {

  let isRecording = false;
  let isPlaying = false;
  let recordedNotes = [];
  let startTime = 0;

  let melodies = {};               // 🔹 (9) todas las melodías guardadas
  let currentMelodyName = null;    // 🔹 (9) melodía seleccionada

  const keyMap = {
    "a": "C", "w": "Cs", "s": "D", "e": "Ds",
    "d": "E", "f": "F", "t": "Fs",
    "g": "G", "y": "Gs", "h": "A",
    "u": "As", "j": "B",
  };

  const noteNames = {
    C: "Do", Cs: "Do#", D: "Re", Ds: "Re#",
    E: "Mi", F: "Fa", Fs: "Fa#",
    G: "Sol", Gs: "Sol#",
    A: "La", As: "La#", B: "Si",
  };

  // 🔹 (9) cargar melodías al iniciar
  loadMelodies();

  document.addEventListener("keydown", (event) => {
    const note = keyMap[event.key];
    if (note) playSound(note);
  });

  const keys = document.querySelectorAll(".key");
  keys.forEach(key => {
    key.addEventListener("click", (e) => {
      e.stopPropagation();
      playSound(key.dataset.note);
    });
  });

  function playSound(note) {
    const audio = new Audio(`sounds/${note}.mp3`);
    audio.currentTime = 0;
    audio.play();

    document.getElementById("current-note").textContent =
      noteNames[note] || note;

    animateKey(note);

    if (isRecording && !isPlaying) {
      const time = Date.now() - startTime;
      recordedNotes.push({ note, time });
    }
  }

  function animateKey(note) {
    const key = document.querySelector(`.key[data-note="${note}"]`);
    if (!key) return;

    key.classList.add("active");
    setTimeout(() => key.classList.remove("active"), 150);
  }

  const recordBtn = document.getElementById("recordBtn");
  const playBtn = document.getElementById("playBtn");
  const clearBtn = document.getElementById("clearBtn");

  // 🎙 GRABAR / DETENER
  recordBtn.addEventListener("click", () => {
    if (isPlaying) return;

    if (!isRecording) {
      recordedNotes = [];
      isRecording = true;
      startTime = Date.now();
      recordBtn.textContent = "⏹ Detener";
    } else {
      isRecording = false;
      recordBtn.textContent = "⏺ Grabar";

      const name = prompt("Nombre de la melodía:");

      if (name && recordedNotes.length > 0) {
        melodies[name] = recordedNotes;
        currentMelodyName = name;

        localStorage.setItem("lastMelody", name);
        saveMelodies();
        renderMelodyList();        // 🔹 (9) actualizar lista
      }
    }
  });

  // ▶ REPRODUCIR melodía seleccionada
  playBtn.addEventListener("click", async () => {
    if (isRecording || isPlaying || recordedNotes.length === 0) return;

    isPlaying = true;

    for (let i = 0; i < recordedNotes.length; i++) {
      const current = recordedNotes[i];
      const previous = recordedNotes[i - 1];
      const delay = i === 0 ? current.time : current.time - previous.time;

      await wait(delay);
      playSound(current.note);
    }

    isPlaying = false;
  });

  // 🗑 BORRAR TODAS
  clearBtn.addEventListener("click", () => {
    if (Object.keys(melodies).length === 0) {
      alert("No hay melodías guardadas.");
      return;
    }

    if (confirm("¿Seguro que querés borrar todas las melodías?")) {
      melodies = {};
      recordedNotes = [];
      currentMelodyName = null;
      localStorage.clear();
      renderMelodyList();          // 🔹 (9) limpiar lista
    }
  });

  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function saveMelodies() {
    localStorage.setItem("pianoMelodies", JSON.stringify(melodies));
  }

  function loadMelodies() {
    const saved = localStorage.getItem("pianoMelodies");
    const last = localStorage.getItem("lastMelody");

    if (saved) melodies = JSON.parse(saved);

    if (last && melodies[last]) {
      currentMelodyName = last;
      recordedNotes = melodies[last];
    }

    renderMelodyList();            // 🔹 (9) mostrar al iniciar
  }

  // 🔹 (9) RENDERIZAR LISTA DE MELODÍAS
  function renderMelodyList() {
    const list = document.getElementById("melodies");
    if (!list) return;

    list.innerHTML = "";

    const names = Object.keys(melodies);

    if (names.length === 0) {
      list.innerHTML = "<li>No hay melodías guardadas</li>";
      return;
    }

    names.forEach(name => {
      const li = document.createElement("li");
      li.textContent = name;

      if (name === currentMelodyName) {
        li.classList.add("active-melody");
      }

      li.addEventListener("click", () => {
        currentMelodyName = name;
        recordedNotes = melodies[name];
        localStorage.setItem("lastMelody", name);
        renderMelodyList();
      });

      list.appendChild(li);
    });
  }

});
