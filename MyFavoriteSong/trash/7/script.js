let clickCount = 0;
const ticker = document.querySelector(".tick");
const burn = new Audio("../../Assets/mp3/burn.mp3");

ticker.addEventListener("click", () => {
  clickCount++;
  burn.play();
  console.log(clickCount);
  if (clickCount === 1) {
    ticker.innerHTML = `<img draggable="false" src="../../Assets/img/folder-icon.png">will you really listen this time?`;
  }
  else if (clickCount === 2) {
    ticker.innerHTML = `<img draggable="false" src="../../Assets/img/folder-icon.png">do you promise?`;
  }
  else if (clickCount === 3) {
    ticker.innerHTML = `<img draggable="false" src="../../Assets/img/folder-icon.png">please promise`;
  }
  else if (clickCount === 4) {
    ticker.innerHTML = `<img draggable="false" src="../../Assets/img/folder-icon.png">idontknowyou.mp3`;
  }
  else if (clickCount >= 5) {
    window.location.href = "../../index.html";
  }
});




document.querySelectorAll(".tick").forEach(link => {
  const audio = new Audio(link.dataset.sound);
  audio.preload = "auto";
  audio.volume = 1.0;
  //maybe experiment with web audio api later for increasing gain over 1.0

  link.addEventListener("mouseenter", () => {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  });
});

