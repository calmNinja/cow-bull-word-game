const cowAnimate = document.querySelector(".cow-animate");
cowAnimate.addEventListener("animationend", function () {
  this.classList.add("done");
});
