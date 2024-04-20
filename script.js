const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((navItem, i) => {
  navItem.addEventListener("click", () => {
    navItems.forEach((item, j) => {
      item.className = "nav-item";
    });
    navItem.className = "nav-item active";
  });
});

const containers = document.querySelectorAll(".containers");

containers.forEach((container) => {
  let isDragging = false;
  let startX;
  let scrollLeft;

  container.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const x = e.pageX - container.offsetLeft;
    const step = (x - startX) * 0.6;
    container.scrollLeft = scrollLeft - step;
  });

  container.addEventListener("mouseup", () => {
    isDragging = false;
  });

  container.addEventListener("mouseleave", () => {
    isDragging = false;
  });
});

const progress = document.getElementById("progress");
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");
const playPauseButton = document.querySelector(".play-pause-btn");
const forwardButton = document.querySelector(".controls button.forward");
const backwardButton = document.querySelector(".controls button.backward");
const rotatingImage = document.getElementById("rotatingImage");
const songName = document.querySelector(".music-player h2");
const artistName = document.querySelector(".music-player p");

let rotating = false;
let currentRotation = 0;
let rotationInterval;



const songs = [
  {
    title: "Sweet Venom",
    name: "Enhypen",
    source:
      "ENHYPEN (엔하이픈) 'Sweet Venom' Official MV.mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/398875d0-9b9e-494a-8906-210aa3f777e0",
  },
  {
    title: "Orange Flower",
    name: "Enhypen",
    source:
      "ENHYPEN (엔하이픈) 'Orange Flower (You Complete Me)' Official Track Video (Memories of youth).mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/810d1ddc-1168-4990-8d43-a0ffee21fb8c",
  },
  {
    title: "Blind",
    name: "Enhypen",
    source:
      "Blind.mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "Still Monster",
    name: "Enhypen",
    source:
      "Still Monster.mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "Criminal Love",
    name: "Enhypen",
    source:
      "CRIMINAL LOVE.mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "Blossom",
    name: "Enhypen",
    source:
      "ENHYPEN 'BLOSSOM' Lyrics [Color Coded KanRomEng]  ShadowByYoongi.mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "Bite Me",
    name: "Enhypen",
    source:
      "ENHYPEN - Bite Me [Audio].mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "Fever",
    name: "Enhypen",
    source:
      "ENHYPEN (엔하이픈) - FEVER [Audio].mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "Paradoxxx Invasion",
    name: "Enhypen",
    source:
      "ENHYPEN (엔하이픈) - Paradoxxx Invasion Lyrics (Color Coded Lyrics).mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "Polaroid Love",
    name: "Enhypen",
    source:
      "ENHYPEN 엔하이픈  Polaroid Love  Lyrics (ColorCodedENGHANROM가사) [OFFICIAL].mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "Drunk-Dazed",
    name: "Enhypen",
    source:
      "ENHYPEN- Drunk-Dazed (Audio).mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "Tamed-Dashed",
    name: "Enhypen",
    source:
      "ENHYPEN- Tamed-Dashed (Audio).mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "One In A Billion",
    name: "Enhypen",
    source:
      "One In A Billion.mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "Go Big or Go Home",
    name: "Enhypen",
    source:
      "모 아니면 도 (Go Big or Go Home).mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "One and Only",
    name: "Enhypen",
    source:
      "Pokémon & ENHYPEN 'One and Only' Official Audio.mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "Shout Out",
    name: "Enhypen",
    source:
      "ENHYPEN (엔하이픈) - Shout Out (Color Coded Lyrics EngRomHan가사).mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "Future Perfect (Pass the Mic)",
    name: "Enhypen",
    source:
      "ENHYPEN (엔하이픈) 'Future Perfect (Pass the MIC)' Official MV.mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "Given-Taken",
    name: "Enhypen",
    source:
      "ENHYPEN 'Given-Taken' Lyrics (엔하이픈 Given-Taken 가사) (Color Coded Lyrics).mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "Sacrifice (Eat Me Up)",
    name: "Enhypen",
    source:
      "ENHYPEN (엔하이픈) - Sacrifice (Eat Me Up) (Color Coded Lyrics EngRomHan가사).mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "Let Me In (20 Cube)",
    name: "Enhypen",
    source:
      "ENHYPEN 'Let Me In (20 Cube)' Lyrics (엔하이픈 Let Me In 가사) (Color Coded Lyrics).mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "Bills",
    name: "Enhypen",
    source:
      "ENHYPEN Bills Lyrics (엔하이픈 Bills 가사) (Color Coded Lyrics).mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "Upper Side Dreamin'",
    name: "Enhypen",
    source:
      "ENHYPEN - 'Upper Side Dreamin'' Lyrics [Color CodedHanRomEng].mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "Blessed-Cursed",
    name: "Enhypen",
    source:
      "ENHYPEN Blessed-Cursed Lyrics (엔하이픈 Blessed-Cursed 가사) (Color Coded Lyrics).mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "Not For Sale",
    name: "Enhypen",
    source:
      "ENHYPEN Not For Sale Lyrics (엔하이픈 Not For Sale 가사) (Color Coded Lyrics).mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "Chaconne",
    name: "Enhypen",
    source:
      "Chaconne.mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "TFW (That Feeling When)",
    name: "Enhypen",
    source:
      "[CORRECT] ENHYPEN (엔하이픈) - 'TFW (That Feeling When) Lyrics [Color CodedHanRomEng].mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "Mixed Up",
    name: "Enhypen",
    source:
      "ENHYPEN   'MIXED UP' (별안간) Lyrics [Color CodedHanRomEng].mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "Blockbuster",
    name: "Enhypen with Yeonjun of TXT",
    source:
      "ENHYPEN - 'BLOCKBUSTER' [Feat YEONJUN of TXT] Lyrics [Color CodedHanRomEng].mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "Karma",
    name: "Enhypen",
    source:
      "[CORRECT] ENHYPEN (엔하이픈) - 'Karma' Lyrics [Color CodedHanRomEng].mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "Make the Change",
    name: "Enhypen",
    source:
      "ENHYPEN (エンハイフン) - Make the Change Lyrics [Color Coded KanRomEng].mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "I Need the Light",
    name: "Enhypen",
    source:
      "ENHYPEN (엔하이픈)   'I Need The Light (구해줘) [Mimicus OST] Lyrics [Color CodedHanRomEng].mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "Attention, Please!",
    name: "Enhypen",
    source:
      "ENHYPEN - 'Attention, Please!' Lyrics [Color CodedHanRomEng].mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "Flicker",
    name: "Enhypen",
    source:
      "ENHYPEN (엔하이픈) - 'FLICKER' Lyrics [Color CodedHanRomEng].mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "Forget Me Not",
    name: "Enhypen",
    source:
      "ENHYPEN (エンハイプン) - 'FORGET ME NOT' Lyrics [Color CodedKanRomEng].mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "Just A Little Bit",
    name: "Enhypen",
    source:
      "Enhypen Just A Little Bit Lyrics (Color Coded Lyrics).mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "Always",
    name: "Enhypen",
    source:
      "ENHYPEN  'Always' (Muchaburi! I am the President OST) Lyrics [Color CodedKanRomEng].mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "10 Months",
    name: "Enhypen",
    source:
      "ENHYPEN '10 Months' Lyrics (엔하이픈 10 Months 가사) (Color Coded Lyrics).mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "I Need U (Cover)",
    name: "Enhypen (Cover) | BTS (Original)",
    source:
      "ENHYPEN (엔하이픈) 'I NEED U (Original by BTS)' [Spotify Singles] Lyrics [Color Coded HanRomEng].mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
  {
    title: "What Makes You Beautiful (Cover)",
    name: "Enhypen (Cover) | One Direction (Original)",
    source:
      "ENHYPEN (엔하이픈) 'What Makes You Beautiful (Original by One Direction)' Lyrics [Color CodedEng].mp3",
    cover:
      "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
  },
];

let currentSongIndex = 0;

function startRotation() {
  if (!rotating) {
    rotating = true;
    rotationInterval = setInterval(rotateImage, 50);
  }
}

function pauseRotation() {
  clearInterval(rotationInterval);
  rotating = false;
}

function rotateImage() {
  currentRotation += 1;
  rotatingImage.style.transform = `rotate(${currentRotation}deg)`;
}

function updateSongInfo() {
  songName.textContent = songs[currentSongIndex].title;
  artistName.textContent = songs[currentSongIndex].name;
  song.src = songs[currentSongIndex].source;
  rotatingImage.src = songs[currentSongIndex].cover;

  song.addEventListener("loadeddata", function () {});
}

song.addEventListener("loadedmetadata", function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
});

song.addEventListener("ended", function () {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo();
  playPause();
});

song.addEventListener("timeupdate", function () {
  if (!song.paused) {
    progress.value = song.currentTime;
  }
});

function playPause() {
  if (song.paused) {
    song.play();
    controlIcon.classList.add("fa-pause");
    controlIcon.classList.remove("fa-play");
    startRotation();
  } else {
    song.pause();
    controlIcon.classList.remove("fa-pause");
    controlIcon.classList.add("fa-play");
    pauseRotation();
  }
}

playPauseButton.addEventListener("click", playPause);

progress.addEventListener("input", function () {
  song.currentTime = progress.value;
});

progress.addEventListener("change", function () {
  song.play();
  controlIcon.classList.add("fa-pause");
  controlIcon.classList.remove("fa-play");
  startRotation();
});

forwardButton.addEventListener("click", function () {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo();
  playPause();
});

backwardButton.addEventListener("click", function () {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateSongInfo();
  playPause();
});

updateSongInfo();

var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  speed: 600,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 10,
    stretch: 120,
    depth: 200,
    modifier: 1,
    slideShadows: false,
  },
   on: {
    click(event) {
      swiper.slideTo(this.clickedIndex);
    },
  },
  pagination: {
    el: ".swiper-pagination",
  },
});