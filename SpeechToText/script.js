const textDisplay = document.getElementById('overlay');
const wordCountTextDisplay = document.getElementById('words')
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const audio = document.getElementById("player");
const counterDisplay = document.getElementById('counter');
let finalTranscript = "";

//array that holds a list of all of the song filenames
const playlist = [
  "01Surprise Me.mp3",
  "02TheFirstSnow.mp3",
  "03Strange.mp3",
  "04I'm So Sick.mp3",
  "05MESS U MADE.mp3",
  "06affection.mp3",
  "07Meet Me In Montauk.mp3",
  "08Always The Same.mp3",
  "09Blissing.mp3",
  "10To Share A Pocket.mp3",
  "11Table for Two.mp3",
  "12Twinkle.mp3",
  "13MVP.mp3",
  "14Cannock Chase.mp3",
  "15Can You Hear The Sound.mp3",
  "16Until I Know.mp3",
  "17Carlisle.mp3",
  "18Care.mp3",
  "19Kiss_Kill.mp3",
  "20Cut My Hair.mp3",
  "21Strings That Tie To You.mp3",
  "22Meadow.mp3",
  "23Bianco.mp3",
  "24Bora!.mp3",
  "25Differently.mp3",
  "26Pleasure delayer.mp3",
  "27Excalibur.mp3",
  "28All Flowers In Time Bend Towards The Sun.mp3",
  "29Things to Ponder While Falling - 2021 Re-Record.mp3",
  "30Caroline.mp3"
];

//FUNCTION THAT PLAYS THE RIGHT SONG
function playSongFromWordCount(wordCount) {
    //limits wordCount so it never is greater than the size of my playlist, so it doesn't break
  const capped = Math.min(wordCount, playlist.length);
  if (capped === 0) return; 
  const index = capped - 1;
  const src = `onRepeatSongs/${playlist[index]}`;
  if (audio.dataset.current !== src) { //!== checks if a value is not equal
    audio.src = src;
    audio.play();
    audio.dataset.current = src;
  }
}

//SPEECH TO TEXT STUFF
recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.continuous = true;
recognition.onresult = (event) => {
  let interimTranscript = "";
  for (let i = event.resultIndex; i < event.results.length; i++) {
    const transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      finalTranscript += transcript + " ";
    } else {
      interimTranscript += transcript;
    }
  }
  const fullText = finalTranscript + interimTranscript;
  const wordCount = fullText
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  textDisplay.textContent = fullText;
  wordCountTextDisplay.textContent = wordCount;
  playSongFromWordCount(wordCount);
};
recognition.onerror = function(event) {
    console.error('Speech recognition error:', event.error);
};

document.getElementById("start").onclick = () => recognition.start();
document.getElementById("stop").onclick = () => recognition.stop();