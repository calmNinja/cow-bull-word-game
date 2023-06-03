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

// Generate the word guessing grid
const gameContainer = document.querySelector("#game-container");
const tilesGrid = document.querySelector(".tiles-grid");

//fetching the secret word from backend
let secret;

const getSecret = async () => {
  try {
    const response = await fetch(
      `http://localhost:8000/word?wordLength=${wordLength}`
    );
    const json = await response.json();
    const isValid = await checkWordInDictionary(json);
    if (isValid) {
      secret = json;
      console.log(secret);
    } else {
      //Retry fetching a valid secret
      await getSecret();
    }
  } catch (err) {
    console.log(err);
  }
};

getSecret();

let isGameOver = false;
let isFirstTileFilled = false;

// State object
const state = {
  grid: [],
  currentRow: 0,
  currentTile: 0,
};

// Function to disable Enter Key
const enterKey = document.getElementById("enterKey");
function disableEnterKey() {
  enterKey.classList.add("disabled");
  enterKey.disabled = true;
}

//Function to disable Delete Key
const deleteKey = document.getElementById("deleteKey");
function disableDeleteKey() {
  deleteKey.classList.add("disabled");
  deleteKey.disabled = true;
}

//Function to enable Delete Key
function enableDeleteKey() {
  deleteKey.classList.remove("disabled");
  deleteKey.disabled = false;
}
const drawGrid = () => {
  for (let i = 0; i < guesses; i++) {
    //Create a tile row
    const tileRow = document.createElement("div");
    tileRow.classList.add("tile-row");
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
  }

  //Append Tiles Grid to the Game Container
  gameContainer.appendChild(tilesGrid);
};

//Key event listener
const handleClick = (event) => {
  const letter = event.target.getAttribute("data-key");
  //Handle different keys
  if (letter === "Backspace") {
    deleteLetter();
    return;
  }
  if (letter === "Enter") {
    checkGuess();
    return;
  }
  //Finally update the tile with the letter
  addLetter(letter);
};

//Register Keyboard events on Virtual Keyboard
const registerKeyboardEvents = () => {
  const keys = document.querySelectorAll(".keyboard-row button");
  keys.forEach((key) => {
    key.addEventListener("click", handleClick);
  });
};

//Add Letter to the Tile
const addLetter = (letter) => {
  if (state.currentTile < wordLength && state.currentRow < guesses) {
    const tile = document.getElementById(
      `tile-${state.currentRow}-${state.currentTile}`
    );
    tile.textContent = letter;
    state.grid[state.currentRow][state.currentTile] = letter;
    tile.setAttribute("data", letter); //to check for cow bull later
    state.currentTile++;

    // Update the isFirstTileFilled variable if the current tile is the first tile in the row
    // Enable the delete key once the first tile is filled
    if (state.currentTile === 1) {
      isFirstTileFilled = true;
      enableDeleteKey();
    }

    // Check if the row is full and enable the enter key
    if (state.currentTile == wordLength) {
      const enterKey = document.getElementById("enterKey");
      enterKey.classList.remove("disabled");
      enterKey.disabled = false;
    }
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

    // Disable the delete key if the row has no filled tiles
    const currentRowTiles = state.grid[state.currentRow];
    const hasFilledTiles = currentRowTiles.some((tile) => tile !== "");
    if (!hasFilledTiles || !isFirstTileFilled) {
      disableDeleteKey();
    } else {
      enableDeleteKey();
    }
    // Disable the enter key if the row is not full
    disableEnterKey();
  }
};

// Function to check the guessed word against the dictionary
const checkWordInDictionary = async (word) => {
  try {
    const response = await fetch(
      `http://localhost:8000/check-dictionary/?word=${word}`
    );
    const json = await response.json();
    return json.status === "valid";
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};

//Check guessed word
const checkGuess = async () => {
  const guess = state.grid[state.currentRow].join("");

  if (state.currentTile > wordLength - 1) {
    disableEnterKey();
    disableDeleteKey();

    const isValid = await checkWordInDictionary(guess);

    if (!isValid) {
      showMessage("Your Guess is Invalid");
      return;
    }

    if (guess === secret) {
      const cowBulls = getCowBulls(guess);
      state.currentRow++;
      displayCowBullImages(cowBulls);
      isGameOver = true;
      setTimeout(() => {
        showGameOverModal(
          "Congratulations! \u{1F389}",
          `The word was '<span class="target-word">${secret}</span>'.`
        );
      }, 1000);
      return;
    }

    if (state.currentRow >= guesses - 1) {
      console.log("last guess..");
      console.log("Calling results on the last guess..");
      state.currentRow++;
      const cowBulls = getCowBulls(guess);
      displayCowBullImages(cowBulls);
      isGameOver = true;
      setTimeout(() => {
        showGameOverModal(
          "Game Over \u{1F480}",
          `The word was '<span class="target-word">${secret}</span>'.`
        );
      }, 500);
      return;
    }

    if (state.currentRow < guesses) {
      state.currentRow++;
      state.currentTile = 0;
    }

    const cowBulls = getCowBulls(guess);
    displayCowBullImages(cowBulls);
  }
};

//Display Cow Bull Results as Images
const displayCowBullImages = (cowBulls) => {
  console.log("calling displayCowBullImages function for result..");
  const bullsElement = document.querySelector(
    `#tileRow-${state.currentRow} .bulls`
  );
  const cowsElement = document.querySelector(
    `#tileRow-${state.currentRow} .cows`
  );
  //Clear existing content
  bullsElement.innerHTML = "";
  cowsElement.innerHTML = "";

  if (cowBulls.bulls === 0 && cowBulls.cows === 0) {
    // Append a message or symbol indicating no cows and no bulls
    const noneElement = document.createElement("span");
    noneElement.textContent = "None";
    noneElement.classList.add("none-message");
    bullsElement.appendChild(noneElement);
    cowsElement.appendChild(noneElement.cloneNode(true));
  } else {
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
  }
};

//Game logic
const getCowBulls = (guess) => {
  let cows = 0;
  let bulls = 0;

  let secretCopy = secret.split("");
  let guessCopy = guess.split("");

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === secret[i]) {
      bulls++;
      secretCopy[i] = "";
      guessCopy[i] = "";
    }
  }

  for (let i = 0; i < guess.length; i++) {
    if (guessCopy[i] !== "" && secretCopy.includes(guessCopy[i])) {
      cows++;
      const index = secretCopy.indexOf(guessCopy[i]);
      secretCopy[index] = "";
    }
  }

  return { cows, bulls };
};

const messageDisplay = document.querySelector(".message-container");

const showMessage = (message) => {
  const messageElement = document.createElement("p");
  messageElement.textContent = message;
  messageDisplay.append(messageElement);
  disableDeleteKey();
  disableEnterKey();
  setTimeout(() => {
    messageDisplay.removeChild(messageElement);
    if (message === "Your Guess is Invalid") {
      deleteRowTiles(state.currentRow);
    }
  }, 1500);
};

// Function to delete the letters in the given row
const deleteRowTiles = (rowIndex) => {
  const rowTiles = state.grid[rowIndex];
  rowTiles.forEach((_, columnIndex) => {
    const tile = document.getElementById(`tile-${rowIndex}-${columnIndex}`);
    tile.textContent = "";
    state.grid[rowIndex][columnIndex] = "";
  });
  disableDeleteKey();
  disableEnterKey();
  state.currentTile = 0;
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
const openRulesModal = () => {
  rulesModal.style.display = "block";
};

const closeRulesModal = () => {
  rulesModal.style.display = "none";
};

// Open the modal when the "Game Rules" button is clicked
rulesButton.addEventListener("click", openRulesModal);
closeRulesButton.addEventListener("click", closeRulesModal);
window.addEventListener("click", function (event) {
  if (event.target === rulesModal) {
    closeRulesModal();
  }
});

const gameOverModal = document.getElementById("game-over-modal");
// Function to close the modal and navigate to the home page
const closeModalAndNavigateToHomePage = () => {
  console.log("calling close modal and navigate to Home Page");
  gameOverModal.classList.add("hidden");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 500);
};

// Function to display the game-over modal with custom content
const showGameOverModal = (title, message) => {
  const gameOverModalTitle = document.getElementById("game-over-modal-title");
  const gameOverModalMessage = document.getElementById(
    "game-over-modal-message"
  );
  const closeSymbol = document.getElementById("close-game-over-modal");

  gameOverModalTitle.textContent = title;
  gameOverModalMessage.innerHTML = message;
  gameOverModal.classList.remove("hidden");

  // Close modal and navigate to the home page when close symbol is clicked
  closeSymbol.addEventListener("click", closeModalAndNavigateToHomePage);
  // Close modal and navigate to the home page when clicking outside the modal
  document.addEventListener("click", function (event) {
    const modal = document.getElementById("game-over-modal");
    if (event.target === modal) {
      closeModalAndNavigateToHomePage();
    }
  });
};

//Handle Play Again Feature
const closeModalAndPlayAgain = () => {
  console.log("calling closeModal and Play Again");
  gameOverModal.style.display = "none";
  const queryParams = new URLSearchParams();
  queryParams.set("showGameOptionsModal", "true");
  const gameOptionsUrl = `index.html?${queryParams.toString()}`;
  window.location.href = gameOptionsUrl;
};
const playAgainBtn = document.getElementById("game-over-play-again-button");
playAgainBtn.addEventListener("click", closeModalAndPlayAgain);

//Handling esc key for respective modals
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    if (!gameOverModal.classList.contains("hidden")) {
      console.log("Trying to escape from Game Over Modal");
      closeModalAndNavigateToHomePage();
    } else if (rulesModal.style.display != "none") {
      console.log("Trying to escape from rules modal");
      closeRulesModal();
    }
  }
});
