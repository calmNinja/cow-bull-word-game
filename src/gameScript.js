import { displayGameOptions } from "./displayGameOptions.js";
import { getSecret } from "./fetchSecret.js";
import { registerKeyboardEvents, disableKeyboard } from "./keyboardEvents.js";
import { drawGrid } from "./drawGrid.js";

// const wordLengthSpan = document.querySelector("#option-length");
// const difficultySpan = document.querySelector("#option-level");

const wordLengthSelect = document.querySelector("#word-length");
const difficultySelect = document.querySelector("#difficulty");

// Generate the word guessing grid - 1. displayGameOptions.js

//fetching the secret word from backend - 2. fetchSecret.js

let isGameOver = false;
let isFirstTileFilled = false;

// State object

//Functions to enable/disable virtual keyboard, enable/disable delete key, disable enter key - 3. keyboardEvents.js

//drawing game grid - 4. drawGrid.js

//Key event listener - 5. gameLogic.js

//Register Keyboard events on Virtual Keyboard - moved to keyboardEvents.js

//Add Letter to the Tile
//5.moved to gameLogic

//Delete Letter from Tile - moved to gameLogic.js

// Invalid Guess Styling

// Function to check the guessed word against the dictionary
//moved to fetchSecret.js

//Check guessed word - moved to gameLogic.js

//Display Cow Bull Results as Images - moved to gameLogic.js

//Game logic

//Game Start

const urlParams = new URLSearchParams(window.location.search);
export const wordLength = urlParams.get("wordLength");
const difficulty = urlParams.get("difficulty");
export const guesses = urlParams.get("guesses");

const startUp = () => {
  displayGameOptions(wordLength, difficulty, guesses);
  drawGrid(wordLength, guesses);
  disableKeyboard();
  registerKeyboardEvents();
  getSecret(wordLength);
};
startUp();

//Script to open and close game rules modal - moved to modalEvents.js
