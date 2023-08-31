import { state } from "./drawGrid";
import { checkGuess } from "./gameLogic";
import { wordLength, guesses } from "./gamescript";
import {
  enableDeleteKey,
  disableDeleteKey,
  disableEnterKey,
} from "./keyboardEvents";

let isFirstTileFilled = false;

export const handleClick = (event) => {
  const letter = event.target.getAttribute("data-key");
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
