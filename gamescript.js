const wordLengthSpan = document.querySelector("#option-length");
const difficultySpan = document.querySelector("#option-level");

const wordLengthSelect = document.querySelector("#word-length");
const difficultySelect = document.querySelector("#difficulty");

//Parse the URL to ger params
const urlParams = new URLSearchParams(window.location.search);
const wordLength = urlParams.get("wordLength");
const difficulty = urlParams.get("difficulty");

const guesses = urlParams.get("guesses");
function displayGameOptions() {
  wordLengthSpan.textContent = `${wordLength} letters`;
  difficultySpan.textContent = `${difficulty} (${guesses} guesses)`;
}
displayGameOptions();

// Generate the word guessing grid
// const tilesGrid = document.createElement("div");
// tilesGrid.classList.add("tiles-grid");

// for (let i = 0; i < guesses; i++) {
//   const tileRow = document.createElement("div");
//   tileRow.classList.add("tile-row");
//   tilesGrid.appendChild(tileRow);

//   for (let j = 0; j < wordLength; j++) {
//     const tile = document.createElement("div");
//     tile.classList.add("tile");
//     tileRow.appendChild(tile);
//   }
// }

// Second attempt
// let currentRow = 1; // Current row of tiles

// // Add the first row of tiles to the tiles grid
// const tilesGrid = document.querySelector(".tiles-grid");
// addRowOfTiles();

// // Add an event listener to the "Guess" button
// const guessBtn = document.querySelector("#guess-btn");
// guessBtn.addEventListener("click", () => {
//   if (currentRow < guesses) {
//     currentRow++;
//     addRowOfTiles();
//   }
// });

// // Function to add a row of tiles to the tiles grid
// function addRowOfTiles() {
//   const tileRow = document.createElement("div");
//   tileRow.classList.add("tile-row");
//   tilesGrid.appendChild(tileRow);

//   for (let j = 0; j < wordLength; j++) {
//     const tile = document.createElement("div");
//     tile.classList.add("tile");
//     tileRow.appendChild(tile);
//   }

//   if (currentRow === guesses) {
//     guessBtn.style.display = "none";
//   }
// }

// // Add the tiles grid to the game container
// const gameContainer = document.querySelector(".game-container");
// gameContainer.appendChild(tilesGrid);
