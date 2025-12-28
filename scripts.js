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
}

function animateKey(note) {
	const key = document.querySelector(`.key[data-note="${note}"]`);
	if (!key) return;

	key.classList.add("active");

	setTimeout(() => {
		key.classList.remove("active");
	}, 150);
}
