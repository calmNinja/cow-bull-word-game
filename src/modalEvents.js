import { disableKeyboard } from "./keyboardEvents";
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

  disableKeyboard();

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
