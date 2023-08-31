import {
  disableDeleteKey,
  disableEnterKey,
  enableKeyboard,
  disableKeyboard,
} from "./keyboardEvents";

import { state } from "./drawGrid";
import { deleteRowTiles } from "./inputHandler";

export const displayCowBullImages = (cowBulls) => {
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
    // Append a message indicating no bulls
    const noneElement = document.createElement("span");
    noneElement.textContent = "None";
    noneElement.classList.add("none-message");
    bullsElement.appendChild(noneElement);
  } else {
    // Append bulls images
    Array.from({ length: cowBulls.bulls }).forEach(() => {
      const bullImg = document.createElement("img");
      bullImg.src = "./assets/bull-icon.png";
      bullImg.classList.add("bull-image");
      bullsElement.appendChild(bullImg);
    });
  }

  if (cowBulls.cows === 0 || cowBulls.cows === "none") {
    // Append a message indicating no cows
    const noneElement = document.createElement("span");
    noneElement.textContent = "None";
    noneElement.classList.add("none-message");
    cowsElement.appendChild(noneElement);
  } else {
    // Append cows images
    Array.from({ length: cowBulls.cows }).forEach(() => {
      const cowImg = document.createElement("img");
      cowImg.src = "./assets/cow-icon.png";
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
    tile.style.border = "1px solid darkgreen";
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
