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
let isGameOver = false;

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
    // tileRow.setAttribute("id", `tileRow-${i}`);
    tileRow.setAttribute("id", `tileRow-${i + 1}`);
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
    //Create Placeholders for cows and bulls
    const bullsElement = document.createElement("div");
    bullsElement.classList.add("bulls");

    const cowsElement = document.createElement("div");
    cowsElement.classList.add("cows");

    //Append placeholders to the Tile Row
    tileRow.appendChild(bullsElement);
    tileRow.appendChild(cowsElement);

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
    console.log("calling checkGuess function...");
    checkGuess();
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
    //Handle different keys for physical keyboard events
    //yet to be done
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

//Check guessed word
const checkGuess = () => {
  const guess = state.grid[state.currentRow].join("");
  if (state.currentTile > wordLength - 1) {
    console.log(`guess is : ${guess} and target word is : ${secret}`);
    if (guess == secret) {
      const cowBulls = getCowBulls(guess);

      showMessage(`Bulls: ${cowBulls.bulls}, Cows: ${cowBulls.cows}`);
      showMessage("Congratulations!!");
      isGameOver = true;
      return;
    } else {
      if (state.currentRow >= guesses - 1) {
        isGameOver = true;
        showMessage("Game Over!");
        return;
      }
      if (state.currentRow < guesses) {
        state.currentRow++;
        state.currentTile = 0;
      }
    }
    const cowBulls = getCowBulls(guess);
    //display bulls and cows
    showMessage(`Bulls: ${cowBulls.bulls}, Cows: ${cowBulls.cows}`);
    displayCowBullImages(cowBulls);
  }
};

//Display Cow Bull Results as Images
const displayCowBullImages = (cowBulls) => {
  const bullsElement = document.querySelector(
    `#tileRow-${state.currentRow} .bulls`
  );
  const cowsElement = document.querySelector(
    `#tileRow-${state.currentRow} .cows`
  );
  //Clear existing content
  bullsElement.innerHTML = "";
  cowsElement.innerHTML = "";

  //Append bulls images
  Array.from({ length: cowBulls.bulls }).forEach(() => {
    const bullImg = document.createElement("img");
    bullImg.src = "./bull-icon.png";
    bullImg.classList.add("bull-image");
    bullsElement.appendChild(bullImg);
  });

  //Append cow images
  Array.from({ length: cowBulls.cows }).forEach(() => {
    const cowImg = document.createElement("img");
    cowImg.src = "./cow-icon.png";
    cowImg.classList.add("cow-image");
    cowsElement.appendChild(cowImg);
  });
};

//Game logic
const getCowBulls = (guess) => {
  let cows = 0;
  let bulls = 0;
  for (let i = 0; i < wordLength; i++) {
    if (guess[i] === secret[i]) {
      bulls++;
    } else if (secret.includes(guess[i])) {
      cows++;
    }
  }
  return { cows, bulls };
};

const messageDisplay = document.querySelector(".message-container");

const showMessage = (message) => {
  const messageElement = document.createElement("p");
  messageElement.textContent = message;
  messageDisplay.append(messageElement);
  setTimeout(() => messageDisplay.removeChild(messageElement), 2000);
};

//Game Start
const startUp = () => {
  displayGameOptions();
  drawGrid();
  registerKeyboardEvents();
};
startUp();

//Script to open and close game rules modal
const rulesModal = document.getElementById("rules-modal");
const rulesButton = document.getElementById("rules-button");
const closeRulesButton = document.getElementById("close-rules-modal");

//functions to open & close modal
function openRulesModal() {
  rulesModal.style.display = "block";
}

function closeRulesModal() {
  rulesModal.style.display = "none";
}

// Open the modal when the "Game Rules" button is clicked
rulesButton.addEventListener("click", openRulesModal);
closeRulesButton.addEventListener("click", closeRulesModal);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeRulesModal();
  }
});
window.addEventListener("click", function (event) {
  if (event.target === rulesModal) {
    closeRulesModal();
  }
});
