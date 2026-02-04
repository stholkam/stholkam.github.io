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

const burn = new Audio("../../Assets/mp3/burn.mp3");

document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");

    // No href, empty href, or "#" → do nothing
    if (!href || href === "#") return;

    e.preventDefault();

    burn.currentTime = 0;
    burn.play();

    setTimeout(() => {
      window.location.href = href;
    }, 1000);
  });
});
