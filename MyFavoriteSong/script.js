const openCan = document.getElementById('trashcan');
const initialSrc = 'Assets/img/closedtrashcan.png';
const hoverSrc = 'Assets/img/opentrashcan.png';
const trash = document.getElementById('trashcan');
const audio = document.querySelector('audio');
const trashSfx = document.getElementById('trashSound');
const cursor = document.querySelector('.cursor');
const nextPageLink = document.getElementById('delayCanClick');
const button = document.getElementById('play');
const threat = document.getElementById('threat');
const casette = document.getElementById('songLoad');


function startAudioOnButtonClick() {
  if (!audio) return;
  const startAudio = () => {
    audio.play().catch(() => {});
    button.removeEventListener('click', startAudio);
    casette.volume=0.5;
    casette.play();
  };
  button.addEventListener('click', startAudio, { once: true });
}
startAudioOnButtonClick();

function enableCursor(){
  openCan.style.pointerEvents = 'all';
  nextPageLink.style.pointerEvents = 'all';
  console.log("The trashcan is now clickable!");
}

setTimeout(enableCursor, 12000); // 12 seconds delay


openCan.addEventListener("click", () => {
  audio.pause();
  trashSfx.play();
  document.documentElement.classList.add("cursor-off");
  document.removeEventListener('click', openCan);
  button.textContent = ">:(";
  button.style.backgroundColor = "red";
  audio.remove();
  threat.classList.add('fade-in');
});


openCan.addEventListener('mouseenter', function() {
    openCan.src = hoverSrc;
});

openCan.addEventListener('mouseleave', function() {
    openCan.src = initialSrc;
});

document.getElementById("delayCanClick").addEventListener("click", function (e) {
  e.preventDefault();
  const targetHref = (e.currentTarget && e.currentTarget.href) || this.href;
  setTimeout(() => {
    trashSfx.play();
  }, 7000); // delay in ms (7 seconds)
  setTimeout(() => {
    window.location.href = targetHref;
  }, 8000); // delay in ms (7 seconds)
});

audio.addEventListener('ended', () => {
  button.textContent = "thank you for keeping me company, here is a cookie!";
  button.classList.add("finished");
  document.documentElement.classList.add("cookie-cursor");
});
