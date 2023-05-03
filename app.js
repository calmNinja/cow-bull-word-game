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

// function to open the modal
function openModal() {
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

// function to close the modal
function closeModal() {
  modal.classList.remove("open");
  document.body.style.overflow = "auto";
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
  const url =
    "game.html?wordLength=" + wordLength + "&difficulty=" + difficulty;
  window.location.href = url;
});
