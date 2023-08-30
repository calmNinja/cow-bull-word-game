import { displayGameOptions } from "./displayGameOptions.js";
import { getSecret } from "./fetchSecret.js";
import { registerKeyboardEvents, disableKeyboard } from "./keyboardEvents.js";
import { drawGrid } from "./drawGrid.js";

//Game start
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
