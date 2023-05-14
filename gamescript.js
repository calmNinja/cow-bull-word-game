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
// displayGameOptions();

// Generate the word guessing grid
const gameContainer = document.querySelector("#game-container");
const tilesGrid = document.querySelector(".tiles-grid");

//target word - temporarily hardcoded
const secret = "nice";

// State object
const state = {
  grid: [],
  currentRow: 0,
  currentTile: 0,
};

const drawGrid = () => {
  for (let i = 0; i < guesses; i++) {
    //Create a tile row
    const tileRow = document.createElement("div");
    tileRow.classList.add("tile-row");
    tileRow.setAttribute("id", `tileRow-${i}`);
    //Create tiles
    const tileRowData = [];
    for (let j = 0; j < wordLength; j++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.setAttribute("id", `tile-${i}-${j}`);
      tileRow.appendChild(tile);
      //Initialize grid with empty values
      tileRowData.push("");
    }
    //Append tile Rows to the Tile Grid
    tilesGrid.appendChild(tileRow);

    // Add tile row data to the grid state
    state.grid.push(tileRowData);
    console.log(tileRowData);
    console.log(state.grid);
  }

  //Append Tiles Grid to the Game Container
  gameContainer.appendChild(tilesGrid);
};

//Key event listener
const handleClick = (event) => {
  const letter = event.target.getAttribute("data-key");
  console.log(letter);
  //Handle different keys
  if (letter === "Backspace") {
    deleteLetter();
    console.log(`state grid: ${state.grid}`);
    return;
  }
  if (letter === "Enter") {
    console.log("check row");
    return;
    // if (state.currentTile === wordLength) {
    // }
  }
  //Finally update the tile with the letter
  addLetter(letter);
};

//Selecting keys from keyboard
const registerKeyboardEvents = () => {
  //Register Events from Virtual Keyboard
  const keys = document.querySelectorAll(".keyboard-row button");
  keys.forEach((key) => {
    key.addEventListener("click", handleClick);
  });
  //Register Events from Physical Keyboard
  document.body.onkeydown = (e) => {
    const key = e.key;
    console.log(`from the keyboard: ${key}`);
  };
};

//Add Letter to the Tile
const addLetter = (letter) => {
  if (state.currentTile < wordLength && state.currentRow < guesses) {
    const tile = document.getElementById(
      `tile-${state.currentRow}-${state.currentTile}`
    );
    tile.textContent = letter;
    state.grid[state.currentRow][state.currentTile] = letter;
    console.log(`state grid: ${state.grid}`);
    tile.setAttribute("data", letter); //to check for cow bull later
    state.currentTile++;
  }
};

//Delete Letter from Tile
const deleteLetter = () => {
  if (state.currentTile > 0) {
    state.currentTile--;
    const tile = document.getElementById(
      `tile-${state.currentRow}-${state.currentTile}`
    );
    tile.textContent = "";
    state.grid[state.currentRow][state.currentTile] = "";
    tile.setAttribute("data", ""); //to check for cow bull later
  }
};

//Game Start
const startUp = () => {
  displayGameOptions();
  drawGrid();
  registerKeyboardEvents();
};
startUp();
