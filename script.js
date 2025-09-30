let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");

let currentTimeDisplay = document.getElementById("currentTime");
let durationDisplay = document.getElementById("duration");

const playlist = [
  {
    title: "Bulong",
    artist: "December Avenue",
    src: "Media/Bulong.mp3",
    img: "Media/bulong.png"
  },
  {
    title: "Magkunwari",
    artist: "December Avenue",
    src: "Media/Magkunwari.mp3",
    img: "Media/magkunwari.png"
  },
  {
    title: "Kung 'Di Rin Lang Ikaw",
    artist: "December Avenue ft. Moira",
    src: "Media/Kungdirinlangikaw.mp3",
    img: "Media/kungdirinlangikaw.png"
  }
];

let currentSongIndex = 0;

function loadSong(index) {
  const songData = playlist[index];
  song.src = songData.src;
  document.querySelector("h1").textContent = songData.title;
  document.querySelector("p").textContent = songData.artist;
  document.querySelector(".song-img").src = songData.img;

  song.load();

  song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
    durationDisplay.textContent = formatTime(song.duration);
    currentTimeDisplay.textContent = formatTime(song.currentTime);
  };

  song.play();
  ctrlIcon.classList.add("fa-pause");
  ctrlIcon.classList.remove("fa-play");
}


function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds % 60);
  if (sec < 10) sec = "0" + sec;
  return `${min}:${sec}`;
}


function playPause() {
  if (ctrlIcon.classList.contains("fa-pause")) {
    song.pause();
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
  } else {
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
  }
}

setInterval(() => {
  progress.value = song.currentTime;
  currentTimeDisplay.textContent = formatTime(song.currentTime);
}, 500);

progress.onchange = function () {
  song.currentTime = progress.value;
  song.play();
  ctrlIcon.classList.add("fa-pause");
  ctrlIcon.classList.remove("fa-play");
};

document.getElementById("backward").addEventListener("click", () => {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = playlist.length - 1;
  }
  loadSong(currentSongIndex);
});

document.getElementById("forward").addEventListener("click", () => {
  currentSongIndex++;
  if (currentSongIndex >= playlist.length) {
    currentSongIndex = 0;
  }
  loadSong(currentSongIndex);
});

// Initial load
loadSong(currentSongIndex);
