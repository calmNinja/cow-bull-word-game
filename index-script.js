// Title animation script
const cowAnimate = document.querySelector(".cow-animate");
cowAnimate.addEventListener("animationend", function () {
  this.classList.add("done");
});

// Game Options modal script
const playBtn = document.querySelector(".start-button");
const modal = document.querySelector(".modal");
const closeModalBtn = document.querySelector(".close-modal-button");
const modalDialog = document.querySelector(".modal-dialog");
const beginBtn = document.querySelector(".begin-button");

const PAUSED_CLASS = "paused";

// function to open the modal
function openModal() {
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
  playBtn.classList.add(PAUSED_CLASS);
}

// function to close the modal
function closeModal() {
  modal.classList.remove("open");
  document.body.style.overflow = "auto";
  playBtn.classList.remove(PAUSED_CLASS);
}

playBtn.addEventListener("click", openModal);

closeModalBtn.addEventListener("click", closeModal);

beginBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

// Game begins
beginBtn.addEventListener("click", () => {
  //Get the Game Option values
  const wordLengthSelect = document.querySelector("#word-length");
  const difficultySelect = document.querySelector("#difficulty");
  const wordLength = encodeURIComponent(wordLengthSelect.value);
  const difficulty = encodeURIComponent(difficultySelect.value);

  let guesses;
  switch (difficulty) {
    case "Easy":
      guesses = 12;
      break;
    case "Medium":
      guesses = 10;
      break;
    case "Hard":
      guesses = 8;
      break;
  }
  const gameOptionsUrl = `game.html?wordLength=${wordLength}&difficulty=${difficulty}&guesses=${guesses}`;
  window.location.href = gameOptionsUrl;
});

//Handle Play Again button from game.html
// Check if the URL has the parameter "showGameOptionsModal" set to "true"
const urlParams = new URLSearchParams(window.location.search);
const showGameOptionsModal = urlParams.get("showGameOptionsModal");

// If the parameter is set to "true", display the game options modal
if (showGameOptionsModal === "true") {
  openModal();
}
