const wordLengthSpan = document.querySelector("#option-length");
const difficultySpan = document.querySelector("#option-level");

const wordLengthSelect = document.querySelector("#word-length");
const difficultySelect = document.querySelector("#difficulty");

function displayGameOptions() {
  //Parse the URL to ger params
  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams);
  const wordLength = urlParams.get("wordLength");
  console.log(wordLength);
  const difficulty = urlParams.get("difficulty");
  console.log(difficulty);
  const guesses = urlParams.get("guesses");
  console.log(`guesses: ${guesses}`);
  wordLengthSpan.textContent = `${wordLength} letters`;
  difficultySpan.textContent = `${difficulty} (${guesses} guesses)`;
}
displayGameOptions();

// Function to update game options
// function updateGameOptions() {
//   // Update word length
//   wordLengthSpan.textContent = `${wordLengthSelect.value} letters`;

//   // Update difficulty
//   switch (difficultySelect.value) {
//     case "easy":
//       difficultySpan.textContent = "Easy (12 guesses)";
//       break;
//     case "medium":
//       difficultySpan.textContent = "Medium (10 guesses)";
//       break;
//     case "hard":
//       difficultySpan.textContent = "Hard (8 guesses)";
//       break;
//     default:
//       difficultySpan.textContent = "";
//   }
// }
