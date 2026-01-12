document.addEventListener("DOMContentLoaded", () => {

  let isRecording = false;
  let recordedNotes = [];
  let startTime = 0;

  const keyMap = {
    "a": "C",
    "w": "Cs",
    "s": "D",
    "e": "Ds",
    "d": "E",
    "f": "F",
    "t": "Fs",
    "g": "G",
    "y": "Gs",
    "h": "A",
    "u": "As",
    "j": "B",
  };

  const noteNames = {
    C: "Do",
    Cs: "Do#",
    D: "Re",
    Ds: "Re#",
    E: "Mi",
    F: "Fa",
    Fs: "Fa#",
    G: "Sol",
    Gs: "Sol#",
    A: "La",
    As: "La#",
    B: "Si",
  };

  // 🔽 BOTONES (ahora existen porque el DOM ya cargó)
  const recordBtn = document.getElementById("recordBtn");
  const playBtn = document.getElementById("playBtn");
  const clearBtn = document.getElementById("clearBtn");

  const keys = document.querySelectorAll(".key");

  document.addEventListener("keydown", (event) => {
    const note = keyMap[event.key];
    if (note) playSound(note, true);
  });

  keys.forEach(key => {
    key.addEventListener("click", (e) => {
      e.stopPropagation();
      const note = key.dataset.note;
      playSound(note, true);
    });
  });

  // 🎵 SONAR NOTA
  function playSound(note, allowRecord = false) {
    const audio = new Audio(`sounds/${note}.mp3`);
    audio.currentTime = 0;
    audio.play();

    document.getElementById("current-note").textContent =
      noteNames[note] || note;

    animateKey(note);

    // 🔽 SOLO graba cuando el usuario toca
    if (isRecording && allowRecord) {
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

  // ⏺ GRABAR / DETENER
  recordBtn.addEventListener("click", () => {
    if (!isRecording) {
      recordedNotes = [];
      isRecording = true;
      startTime = Date.now();
      recordBtn.textContent = "⏹ Detener";
    } else {
      isRecording = false;
      recordBtn.textContent = "⏺ Grabar";
    }
  });

  // ▶ REPRODUCIR
  playBtn.addEventListener("click", async () => {
    if (recordedNotes.length === 0) return;

    for (let i = 0; i < recordedNotes.length; i++) {
      const current = recordedNotes[i];
      const previous = recordedNotes[i - 1];
      const delay = i === 0 ? current.time : current.time - previous.time;

      await wait(delay);
      playSound(current.note, false); // ❗ no graba
    }
  });

  // 🗑 BORRAR
  clearBtn.addEventListener("click", () => {
    if (recordedNotes.length === 0) {
      alert("No hay ninguna grabación para borrar.");
      return;
    }

    if (confirm("¿Seguro que querés borrar la grabación?")) {
      recordedNotes = [];
      alert("Grabación borrada.");
    }
  });

  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

});
document.addEventListener("DOMContentLoaded", () => {

  let isRecording = false;
  let recordedNotes = [];
  let startTime = 0;

  const keyMap = {
    "a": "C",
    "w": "Cs",
    "s": "D",
    "e": "Ds",
    "d": "E",
    "f": "F",
    "t": "Fs",
    "g": "G",
    "y": "Gs",
    "h": "A",
    "u": "As",
    "j": "B",
  };

  const noteNames = {
    C: "Do",
    Cs: "Do#",
    D: "Re",
    Ds: "Re#",
    E: "Mi",
    F: "Fa",
    Fs: "Fa#",
    G: "Sol",
    Gs: "Sol#",
    A: "La",
    As: "La#",
    B: "Si",
  };

  // 🔽 BOTONES (ahora existen porque el DOM ya cargó)
  const recordBtn = document.getElementById("recordBtn");
  const playBtn = document.getElementById("playBtn");
  const clearBtn = document.getElementById("clearBtn");

  const keys = document.querySelectorAll(".key");

  document.addEventListener("keydown", (event) => {
    const note = keyMap[event.key];
    if (note) playSound(note, true);
  });

  keys.forEach(key => {
    key.addEventListener("click", (e) => {
      e.stopPropagation();
      const note = key.dataset.note;
      playSound(note, true);
    });
  });

  // 🎵 SONAR NOTA
  function playSound(note, allowRecord = false) {
    const audio = new Audio(`sounds/${note}.mp3`);
    audio.currentTime = 0;
    audio.play();

    document.getElementById("current-note").textContent =
      noteNames[note] || note;

    animateKey(note);

    // 🔽 SOLO graba cuando el usuario toca
    if (isRecording && allowRecord) {
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

  // ⏺ GRABAR / DETENER
  recordBtn.addEventListener("click", () => {
    if (!isRecording) {
      recordedNotes = [];
      isRecording = true;
      startTime = Date.now();
      recordBtn.textContent = "⏹ Detener";
    } else {
      isRecording = false;
      recordBtn.textContent = "⏺ Grabar";
    }
  });

  // ▶ REPRODUCIR
  playBtn.addEventListener("click", async () => {
    if (recordedNotes.length === 0) return;

    for (let i = 0; i < recordedNotes.length; i++) {
      const current = recordedNotes[i];
      const previous = recordedNotes[i - 1];
      const delay = i === 0 ? current.time : current.time - previous.time;

      await wait(delay);
      playSound(current.note, false); // ❗ no graba
    }
  });

  // 🗑 BORRAR
  clearBtn.addEventListener("click", () => {
    if (recordedNotes.length === 0) {
      alert("No hay ninguna grabación para borrar.");
      return;
    }

    if (confirm("¿Seguro que querés borrar la grabación?")) {
      recordedNotes = [];
      alert("Grabación borrada.");
    }
  });

  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

});
