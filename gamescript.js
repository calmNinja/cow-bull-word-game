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
const gameContainer = document.querySelector(".game-container");
const tilesGrid = document.querySelector(".tiles-grid");

for (let i = 0; i < guesses; i++) {
  //Create a tile row
  const tileRow = document.createElement("div");
  tileRow.classList.add("tile-row");
  //Create tiles
  for (let j = 0; j < wordLength; j++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.setAttribute("id", `tile-${i}-${j}`);
    tileRow.appendChild(tile);
  }
  //Append tile Rows to the Tile Grid
  tilesGrid.appendChild(tileRow);
}

//Append Tiles Grid to the Game Container
gameContainer.appendChild(tilesGrid);
