export function displayGameOptions(wordLength, difficulty, guesses) {
  const wordLengthSpan = document.querySelector("#option-length");
  const difficultySpan = document.querySelector("#option-level");

  wordLengthSpan.textContent = `${wordLength} letters`;
  difficultySpan.textContent = `${difficulty} (${guesses} guesses)`;
}
