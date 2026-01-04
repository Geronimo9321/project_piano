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

const noteNames = { //DENOMINACION DE NOTAS, LAS QUE CONTIENEN # SON LAS TECLAS NEGRAS.
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

document.addEventListener("keydown", (event) => {
	const note = keyMap[event.key];

	if (note) {
		playSound(note);
		animateKey(note);
	}
});

const keys = document.querySelectorAll(".key");

keys.forEach(key => {
  key.addEventListener("click", (e) => {
    e.stopPropagation(); // evita que las blancas suenen si tocás negras
    const note = key.dataset.note;
    playSound(note);
  });
});

function playSound(note) {
  const audio = new Audio(`sounds/${note}.mp3`);
  audio.currentTime = 0; // reinicia si tocás rápido
  audio.play();
  document.getElementById("current-note").textContent = noteNames[note] || note; //INDICADOR DE NOTA TOCADA
  animateKey(note);

//Guardar nota si se esta grabando
  if (isRecording) {
  	const time = Date.now() - startTime;
  	recordedNotes.push({ note, time });
  }
}

function animateKey(note) {
	const key = document.querySelector(`.key[data-note="${note}"]`);
	if (!key) return;

	key.classList.add("active");

	setTimeout(() => {
		key.classList.remove("active");
	}, 150);
}

//Boton grabar
const recordBtn = document.getElementById("recordBtn");
const playBtn = document.getElementById("playBtn");
const clearBtn = document.getElementById("clearBtn");

recordBtn.addEventListener("click", () => {
  if (!isRecording) {
    // ▶️ EMPEZAR GRABACIÓN
    recordedNotes = [];
    isRecording = true;
    startTime = Date.now();
    recordBtn.textContent = "⏹ Detener";
  } else {
    // ⏹ DETENER GRABACIÓN
    isRecording = false;
    recordBtn.textContent = "⏺ Grabar";
  }
});

//Boton reproducir
playBtn.addEventListener("click", async () => {
  if (recordedNotes.length === 0) return;

  for (let i = 0; i < recordedNotes.length; i++) {
    const current = recordedNotes[i];
    const previous = recordedNotes[i - 1];

    const delay = i === 0 ? current.time : current.time - previous.time;

    await wait(delay);
    playSound(current.note);
  }
});


//Boton borrar
clearBtn.addEventListener("click", () => {
  if (recordedNotes.length === 0) {
    alert("No hay ninguna grabación para borrar.");
    return;
  }

  const confirmDelete = confirm("¿Seguro que querés borrar la grabación?");

  if (confirmDelete) {
    recordedNotes = [];
    alert("Grabación borrada correctamente.");
  }
});

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
