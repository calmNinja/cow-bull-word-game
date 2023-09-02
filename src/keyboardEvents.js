import { handleClick, addLetter, deleteLetter } from "./inputHandler";
import { checkGuess } from "./gameLogic";

export const registerKeyboardEvents = () => {
  const keys = document.querySelectorAll(".keyboard-row button");
  keys.forEach((key) => {
    key.addEventListener("click", handleClick);
  });
};

export const disableKeyboard = () => {
  const buttons = document.querySelectorAll("#keyboard-container button");
  buttons.forEach((button) => {
    button.classList.add("disabled");
  });
};

export const enableKeyboard = () => {
  const buttons = document.querySelectorAll("#keyboard-container button");
  buttons.forEach((button) => {
    button.classList.remove("disabled");
  });
};

export const disableEnterKey = () => {
  const enterKey = document.getElementById("enterKey");
  enterKey.classList.add("disabled");
  enterKey.disabled = true;
};

const deleteKey = document.getElementById("deleteKey");
export const disableDeleteKey = () => {
  deleteKey.classList.add("disabled");
  deleteKey.disabled = true;
};

export const enableDeleteKey = () => {
  deleteKey.classList.remove("disabled");
  deleteKey.disabled = false;
};

// Function to handle input from physical keyboard
export const handleKeyDown = (event) => {
  const letter = event.key;
  if (/^[a-zA-Z]$/.test(letter)) {
    addLetter(letter.toLowerCase());
  } else if (event.key === "Enter") {
    checkGuess();
  } else if (event.key === "Backspace") {
    deleteLetter();
  }
};
//Listening for input from physical keyboard
document.addEventListener("keydown", handleKeyDown);
