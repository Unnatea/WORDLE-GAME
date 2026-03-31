const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

const WORDS = ["decal", "bawdy","angst","briny","ascot","vapid","gamut","facet","smock","frond","cameo","adage","forte","overt","shank","stoic","wreak","terse","louse","skiff","plait","lithe","saucy","guile","plumb","swoon","stint"];

let targetWord = "";
let currentRow = 0;

const grid = document.getElementById("grid");
const message = document.getElementById("message");
const input = document.getElementById("guessInput");

// Event listeners
document.getElementById("guessBtn").addEventListener("click", submitGuess);
document.getElementById("restartBtn").addEventListener("click", restartGame);

input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    submitGuess();
  }
});

// Initialize game
function initGame() {
  grid.innerHTML = "";
  message.textContent = "";
  currentRow = 0;

  targetWord = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();

  for (let i = 0; i < WORD_LENGTH * MAX_ATTEMPTS; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    grid.appendChild(cell);
  }
}

// Submit guess
function submitGuess() {
  let guess = input.value.toUpperCase();

  // Validation
  if (guess.length !== WORD_LENGTH) {
    alert("Enter a 5-letter word!");
    return;
  }

  if (!/^[A-Z]+$/.test(guess)) {
    alert("Only letters allowed!");
    return;
  }

  if (currentRow >= MAX_ATTEMPTS) return;

  const startIndex = currentRow * WORD_LENGTH;

  let targetArray = targetWord.split("");
  let guessArray = guess.split("");
  let result = Array(WORD_LENGTH).fill("absent");

  // Check correct letters
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessArray[i] === targetArray[i]) {
      result[i] = "correct";
      targetArray[i] = null;
      guessArray[i] = null;
    }
  }

  // Check present letters
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessArray[i] && targetArray.includes(guessArray[i])) {
      result[i] = "present";
      targetArray[targetArray.indexOf(guessArray[i])] = null;
    }
  }

  // Display result
  for (let i = 0; i < WORD_LENGTH; i++) {
    const cell = grid.children[startIndex + i];
    cell.textContent = guess[i];
    cell.classList.add(result[i]);
  }

  // Win condition
  if (guess === targetWord) {
    message.textContent = "🎉 You Win!";
    input.disabled = true;
    return;
  }

  currentRow++;
  input.value = "";

  // Lose condition
  if (currentRow === MAX_ATTEMPTS) {
    message.textContent = "❌ You Lost! Word was: " + targetWord;
    input.disabled = true;
  }
}

// Restart game
function restartGame() {
  input.disabled = false;
  input.value = "";
  initGame();
}

// Start game
initGame();
