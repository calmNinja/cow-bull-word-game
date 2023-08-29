import {
  enableDeleteKey,
  disableDeleteKey,
  disableEnterKey,
} from "./keyboardEvents";
import { secret, checkWordInDictionary } from "./fetchSecret";
import { state } from "./drawGrid";
import { wordLength, guesses } from "./gamescript";
import { showGameOverModal } from "./modalEvents";

let isGameOver = false;
let isFirstTileFilled = false;

export const handleClick = (event) => {
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

export const addLetter = (letter) => {
  if (state.currentTile < wordLength && state.currentRow < guesses) {
    const tile = document.getElementById(
      `tile-${state.currentRow}-${state.currentTile}`
    );
    tile.textContent = letter;
    state.grid[state.currentRow][state.currentTile] = letter;
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

export const deleteLetter = () => {
  if (state.currentTile > 0) {
    state.currentTile--;
    const tile = document.getElementById(
      `tile-${state.currentRow}-${state.currentTile}`
    );
    tile.textContent = "";
    state.grid[state.currentRow][state.currentTile] = "";
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

export const checkGuess = async () => {
  const guess = state.grid[state.currentRow].join("");
  disableKeyboard();
  disableDeleteKey();
  disableEnterKey();

  if (state.currentTile > wordLength - 1) {
    disableEnterKey();
    disableDeleteKey();

    const isValid = await checkWordInDictionary(guess);

    if (!isValid) {
      showMessage("Your Guess is Invalid");
      applyInvalidGuessStyle(state.currentRow);
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

export const getCowBulls = (guess) => {
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
  // Handle case for only cows or only bulls
  if (bulls === 0 && cows === 0) {
    return { cows: "none", bulls: "none" };
  } else if (bulls === 0) {
    return { cows: cows, bulls: "none" };
  } else if (cows === 0) {
    return { cows: "none", bulls: bulls };
  } else {
    return { cows, bulls };
  }
  // return { cows, bulls };
};

export const displayCowBullImages = (cowBulls) => {
  console.log("calling displayCowBullImages function for result..");
  const bullsElement = document.querySelector(
    `#tileRow-${state.currentRow} .bulls`
  );
  const cowsElement = document.querySelector(
    `#tileRow-${state.currentRow} .cows`
  );
  // Clear existing content
  bullsElement.innerHTML = "";
  cowsElement.innerHTML = "";

  if (cowBulls.bulls === 0 || cowBulls.bulls === "none") {
    // Append a message or symbol indicating no bulls
    const noneElement = document.createElement("span");
    noneElement.textContent = "None";
    noneElement.classList.add("none-message");
    bullsElement.appendChild(noneElement);
  } else {
    // Append bulls images
    Array.from({ length: cowBulls.bulls }).forEach(() => {
      const bullImg = document.createElement("img");
      bullImg.src = "/assets/bull-icon.png";
      bullImg.classList.add("bull-image");
      bullsElement.appendChild(bullImg);
    });
  }

  if (cowBulls.cows === 0 || cowBulls.cows === "none") {
    // Append a message or symbol indicating no cows
    const noneElement = document.createElement("span");
    noneElement.textContent = "None";
    noneElement.classList.add("none-message");
    cowsElement.appendChild(noneElement);
  } else {
    // Append cow images
    Array.from({ length: cowBulls.cows }).forEach(() => {
      const cowImg = document.createElement("img");
      cowImg.src = "/assets/cow-icon.png";
      cowImg.classList.add("cow-image");
      cowsElement.appendChild(cowImg);
    });
  }

  enableKeyboard();
  disableDeleteKey();
  disableEnterKey();
};

export const applyInvalidGuessStyle = (rowIndex) => {
  const rowTiles = state.grid[rowIndex];
  rowTiles.forEach((_, columnIndex) => {
    const tile = document.getElementById(`tile-${rowIndex}-${columnIndex}`);
    tile.style.border = "2px solid red";
  });
};

export const removeInvalidGuessStyle = (rowIndex) => {
  const rowTiles = state.grid[rowIndex];
  rowTiles.forEach((_, columnIndex) => {
    const tile = document.getElementById(`tile-${rowIndex}-${columnIndex}`);
    tile.style.border = "1px solid darkgreen"; // Set the original border style here
  });
};

const messageDisplay = document.querySelector(".message-container");

export const showMessage = (message) => {
  const messageElement = document.createElement("p");
  messageElement.textContent = message;
  messageDisplay.append(messageElement);
  disableDeleteKey();
  disableEnterKey();
  disableKeyboard();
  setTimeout(() => {
    messageDisplay.removeChild(messageElement);
    if (message === "Your Guess is Invalid") {
      deleteRowTiles(state.currentRow);
      removeInvalidGuessStyle(state.currentRow);
    }
    enableKeyboard();
    disableDeleteKey();
    disableEnterKey();
  }, 1500);
};

// Function to delete the letters in the given row
export const deleteRowTiles = (rowIndex) => {
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
