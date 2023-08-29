import { handleClick } from "./gameLogic";

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

// Function to disable Enter Key

export const disableEnterKey = () => {
  const enterKey = document.getElementById("enterKey");
  enterKey.classList.add("disabled");
  enterKey.disabled = true;
};

//Function to disable Delete Key
const deleteKey = document.getElementById("deleteKey");
export const disableDeleteKey = () => {
  deleteKey.classList.add("disabled");
  deleteKey.disabled = true;
};

//Function to enable Delete Key
export const enableDeleteKey = () => {
  deleteKey.classList.remove("disabled");
  deleteKey.disabled = false;
};
