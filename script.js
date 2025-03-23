const words = [
  // Animals (Dyr)
  { word: "ELEFANT", hint: "Et stort dyr med snabel 🐘" },
  { word: "PINGVIN", hint: "En fugl som ikke kan fly, men svømmer godt 🐧" },
  { word: "GIRAFF", hint: "Det høyeste dyret i verden 🦒" },
  { word: "KENGURU", hint: "Et dyr som hopper med en lomme på magen 🦘" },
  { word: "DELFIN", hint: "En smart svømmende venn i havet 🐬" },

  // Nature (Natur)
  { word: "REGNBUE", hint: "Fargerik bue på himmelen etter regn 🌈" },
  { word: "STJERNE", hint: "Lyser på nattehimmelen ⭐" },
  { word: "BLOMST", hint: "Vokser i hagen og lukter godt 🌸" },
  { word: "FJELL", hint: "Høyt og stort i naturen 🏔️" },
  { word: "STRAND", hint: "Her møter havet land 🏖️" },

  // Food (Mat)
  { word: "PIZZA", hint: "Rund italiensk mat med ost 🍕" },
  { word: "BANAN", hint: "Gul frukt som aper elsker 🍌" },
  { word: "JORDBÆR", hint: "Rød søt frukt som vokser lavt 🍓" },
  { word: "ISKREM", hint: "Kald dessert på en varm dag 🍦" },
  { word: "SJOKOLADE", hint: "Søt brun godteri 🍫" },

  // Objects (Gjenstander)
  { word: "TELEFON", hint: "Vi ringer og sender meldinger med den 📱" },
  { word: "KLOKKE", hint: "Viser hva tiden er ⌚" },
  { word: "FOTBALL", hint: "Rund ball vi sparker ⚽" },
  { word: "SYKKEL", hint: "To hjul og pedaler 🚲" },
  { word: "PARAPLY", hint: "Beskytter mot regn ☔" },

  // Places (Steder)
  { word: "SKOLE", hint: "Her lærer barn nye ting 🏫" },
  { word: "SYKEHUS", hint: "Her jobber leger og sykepleiere 🏥" },
  { word: "BIBLIOTEK", hint: "Hus fullt av bøker 📚" },
  { word: "SLOTT", hint: "Der kongen og dronningen bor 🏰" },
  { word: "BONDEGÅRD", hint: "Her bor mange husdyr 🏡" },

  // Transportation (Transport)
  { word: "HELIKOPTER", hint: "Flyr med roterende vinger 🚁" },
  { word: "BÅTEN", hint: "Flyter på vannet ⛴️" },
  { word: "BUSSEN", hint: "Stor bil med mange seter 🚌" },
  { word: "FLYET", hint: "Transporterer folk gjennom luften ✈️" },
  { word: "TOGET", hint: "Kjører på skinner 🚂" },

  // Weather (Vær)
  { word: "REGN", hint: "Vann som faller fra skyene 🌧️" },
  { word: "SNØ", hint: "Hvite fnugg som faller om vinteren ❄️" },
  { word: "SOL", hint: "Gir lys og varme om dagen ☀️" },
  { word: "TORDEN", hint: "Høy lyd på himmelen i uvær ⛈️" },
  { word: "VIND", hint: "Får trær til å bevege seg 🌪️" },

  // Professions (Yrker)
  { word: "LÆRER", hint: "Underviser på skolen 👨‍🏫" },
  { word: "KOKK", hint: "Lager mat på restaurant 👨‍🍳" },
  { word: "BRANNMANN", hint: "Slukker branner 👨‍🚒" },
  { word: "POLITI", hint: "Passer på at alle følger loven 👮" },
  { word: "LEGE", hint: "Hjelper syke mennesker 👨‍⚕️" },
];

let remainingGuesses = 8;
let selectedWord = "";
let guessedLetters = [];
let isGameOver = false;
let isMuted = false;
let selectedHint = "";

const canvas = document.getElementById("hangmanCanvas");
const ctx = canvas.getContext("2d");
const muteButton = document.getElementById("muteButton");

function selectRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  selectedWord = words[randomIndex].word;
  selectedHint = words[randomIndex].hint;
}

function showHint() {
  if (!isGameOver) {
    selectRandomWord();
    const hintElement = document.getElementById("hintText");
    hintElement.textContent = selectedHint;
    hintElement.style.animation = "fadeIn 0.5s ease-in";
    initGame();
  }
}

function playSound(soundId) {
  if (!isMuted) {
    const sound = document.getElementById(soundId);
    sound.currentTime = 0;
    sound.play().catch((error) => console.log("Sound play prevented:", error));
  }
}

function toggleMute() {
  isMuted = !isMuted;
  muteButton.querySelector("span").textContent = isMuted ? "🔇" : "🔊";
  muteButton.classList.toggle("muted", isMuted);
  document
    .querySelectorAll("audio")
    .forEach((audio) => (audio.muted = isMuted));
}

function drawHangman(step) {
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;

  switch (step) {
    case 1:
      ctx.beginPath();
      ctx.arc(130, 100, 20, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case 2:
      ctx.beginPath();
      ctx.arc(122, 95, 2, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case 3:
      ctx.beginPath();
      ctx.arc(138, 95, 2, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case 4:
      ctx.beginPath();
      ctx.moveTo(124, 110);
      ctx.quadraticCurveTo(130, 115, 136, 110);
      ctx.stroke();
      break;
    case 5:
      ctx.beginPath();
      ctx.moveTo(130, 120);
      ctx.lineTo(130, 190);
      ctx.stroke();
      break;
    case 6:
      ctx.beginPath();
      ctx.moveTo(130, 140);
      ctx.lineTo(100, 160);
      ctx.stroke();
      break;
    case 7:
      ctx.beginPath();
      ctx.moveTo(130, 140);
      ctx.lineTo(160, 160);
      ctx.stroke();
      break;
    case 8:
      ctx.beginPath();
      ctx.moveTo(130, 190);
      ctx.lineTo(110, 230);
      ctx.moveTo(130, 190);
      ctx.lineTo(150, 230);
      ctx.stroke();
      break;
  }
}

function drawFixedStructure() {
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(20, 280);
  ctx.lineTo(180, 280);
  ctx.moveTo(40, 280);
  ctx.lineTo(40, 50);
  ctx.moveTo(40, 50);
  ctx.lineTo(130, 50);
  ctx.moveTo(130, 50);
  ctx.lineTo(130, 80);
  ctx.stroke();
}

function initGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFixedStructure();
  guessedLetters = [];
  remainingGuesses = 8;
  isGameOver = false;

  if (!selectedWord) {
    selectRandomWord();
  }

  updateDisplay();
  createKeyboard();
  document.querySelector(".play-again-btn")?.remove();
  const wordDisplay = document.getElementById("wordDisplay");
  wordDisplay.classList.remove("animate-correct-word", "glitter-effect");
}

function setCustomWord() {
  const wordInput = document.getElementById("wordInput");
  const word = wordInput.value.trim().toUpperCase();

  if (/^[A-ZÆØÅ]+$/.test(word)) {
    selectedWord = word;
    selectedHint = "Ingen hint gitt";
    wordInput.value = "";
    initGame();
  } else {
    alert("Ugyldig ord! Kun bokstaver tillatt.");
  }
}

function updateDisplay() {
  const display = selectedWord
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");
  document.getElementById("wordDisplay").textContent = display;
}

function createKeyboard() {
  const keyboard = document.getElementById("keyboard");
  keyboard.innerHTML = "";

  "ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ".split("").forEach((letter) => {
    const btn = document.createElement("button");
    btn.className = "keyboard-btn";
    btn.textContent = letter;
    btn.setAttribute("data-letter", letter);
    btn.onclick = () => handleGuess(letter);
    keyboard.appendChild(btn);
  });
}

function handleGuess(letter) {
  if (guessedLetters.includes(letter) || isGameOver) return;
  guessedLetters.push(letter);

  const button = document.querySelector(
    `.keyboard-btn[data-letter="${letter}"]`
  );
  const isCorrect = selectedWord.includes(letter);

  if (isCorrect) {
    playSound("correctSound");
    button.style.backgroundColor = "#4ECDC4";
    button.style.color = "white";
  } else {
    remainingGuesses--;
    drawHangman(8 - remainingGuesses);
    playSound("wrongSound");
    button.style.backgroundColor = "#FF6B6B";
    button.style.color = "white";
    setTimeout(() => button.remove(), 300);
  }

  checkGameStatus();
  updateDisplay();
}

function checkGameStatus() {
  const hasWon = !selectedWord
    .split("")
    .some((l) => !guessedLetters.includes(l));

  if (hasWon || remainingGuesses <= 0) {
    isGameOver = true;
    setTimeout(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      showResultMessage(hasWon ? "🎉 Seier!" : "💔 Game Over!");
      showCorrectWord(hasWon);
      showPlayAgainButton();
      playSound(hasWon ? "victorySound" : "gameOverSound");
    }, 100);
  }
}

function showCorrectWord(hasWon) {
  const wordDisplay = document.getElementById("wordDisplay");
  wordDisplay.textContent = selectedWord;
  wordDisplay.style.color = hasWon ? "#4ECDC4" : "#FF6B6B";
  wordDisplay.classList.add("animate-correct-word");

  if (!hasWon) {
    setTimeout(() => {
      wordDisplay.classList.add("glitter-effect");
    }, 500); // Legg til glitreeffekten etter pop-in animasjonen
  }
}

function showResultMessage(message) {
  ctx.font = "30px Arial";
  ctx.fillStyle = message.includes("Seier") ? "#4ECDC4" : "#FF6B6B";
  ctx.textAlign = "center";
  ctx.fillText(message, canvas.width / 2, canvas.height / 2);

  if (message.includes("Game Over")) {
    ctx.font = "20px Arial";
    ctx.fillText(
      `Det riktige ordet var: ${selectedWord}`,
      canvas.width / 2,
      canvas.height / 2 + 40
    );
  }
}

function showResultMessage(message) {
  ctx.font = "30px Arial";
  ctx.fillStyle = message.includes("Seier") ? "#4ECDC4" : "#FF6B6B";
  ctx.textAlign = "center";
  ctx.fillText(message, canvas.width / 2, canvas.height / 2);
}

function showPlayAgainButton() {
  const playAgainButton = document.createElement("button");
  playAgainButton.className = "play-again-btn";
  playAgainButton.textContent = "Spill Igjen";
  playAgainButton.onclick = () => {
    selectedWord = "";
    selectedHint = "";
    initGame();
  };
  document.querySelector(".game-container").appendChild(playAgainButton);
}

muteButton.addEventListener("click", toggleMute);
document.addEventListener("DOMContentLoaded", initGame);
