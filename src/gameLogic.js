import { secret, checkWordInDictionary } from "./fetchSecret";
import { state, scrollToAddTileRow } from "./drawGrid";
import {
  disableDeleteKey,
  disableEnterKey,
  disableKeyboard,
} from "./keyboardEvents";
import { showGameOverModal } from "./modalEvents";
import {
  showMessage,
  applyInvalidGuessStyle,
  displayCowBullImages,
} from "./gameLogicUtils";
import { wordLength, guesses } from "./gamescript";

let hasScrolled = false;
let isGameOver = false;

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
      if (!hasScrolled) {
        const halfwayPoint = Math.floor(guesses / 2);
        if (state.currentRow >= halfwayPoint) {
          scrollToAddTileRow();
          hasScrolled = true;
        }
      }
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
};
