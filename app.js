// HTML'E ULAŞARAK NESNE TANIMLARI YAPTIM.

const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const play = document.querySelector("#controls #play");
const prev = document.querySelector("#controls #prev");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const ul = document.querySelector("ul");

// MUSIC PLAYER CLASSINA ULAŞARAK PLAYER TANIMLAMASI YAPTIM
const player = new MusicPlayer(musicList);

// SAYFA YUKLENDİĞİNDE ÇALIŞACAK FONKSİYONLARI TANIMLADIM.
window.addEventListener("load", () => {
  let music = player.getMusic();
  displayMusic(music);
  displayMusicList(player.musicList);
  isPlayingNow();
});
// HTML'YE ULAŞARAK TANIMLADIĞIM NESNELERİN İÇİNE, MUSIC CLASSINDAKİ VERİLERİ ATTIM. ŞARKILARIN BAŞLIK, SŞARKICI, RESİM, SES BİLGİLERİ GELECEK
function displayMusic(music) {
  title.innerText = music.getName();
  singer.innerText = music.singer;
  image.src = "img/" + music.img;
  audio.src = "mp3/" + music.file;
}

play.addEventListener("click", () => {
  const isMusicPlay = container.classList.contains("playing");
  isMusicPlay ? pauseMusic() : playMusic();
});
//  PREV TUŞUNA BASILDIĞINDA ÇALIŞACAK OLAN FONKSİYONLAR
prev.addEventListener("click", () => {
  prevMusic();
  isPlayingNow();
});
//  NEXT TUŞUNA BASILDIĞINDA ÇALIŞACAK OLAN FONKSİYONLAR
next.addEventListener("click", () => {
  nextMusic();
  isPlayingNow();
});
// GERİYE GİTME FONKSİYONU
const prevMusic = () => {
  player.prev();
  let music = player.getMusic();
  displayMusic(music);
  playMusic();
};
// İLERİYE GİTME FONKSİYONU
const nextMusic = () => {
  player.next();
  let music = player.getMusic();
  displayMusic(music);
  playMusic();
};
// MUZİĞİ DURDURMA FONKSİYONU
const pauseMusic = () => {
  container.classList.remove("playing");
  play.querySelector("i").classList = "fa-solid fa-play";
  audio.pause();
};
// MUZİĞİ BAŞLATMA FONKSİYONU
const playMusic = () => {
  container.classList.add("playing");
  play.querySelector("i").classList = "fa-solid fa-pause";
  audio.play();
};
// SÜREYİ DÖNÜŞTÜRME FONKSİYONU
const calculateTime = (toplamSaniye) => {
  const dakika = Math.floor(toplamSaniye / 60);
  const saniye = Math.floor(toplamSaniye % 60);
  const guncellenenSaniye = saniye < 10 ? `0${saniye}` : `${saniye}`;
  const sonuc = `${dakika}:${guncellenenSaniye}`;
  return sonuc;
};
// SAYFA YUKLENDİĞİNDE ŞARKI SÜRESİNİN GÖSTERİLMESİ FONKSİYONU
audio.addEventListener("loadedmetadata", () => {
  duration.textContent = calculateTime(audio.duration);
  progressBar.max = Math.floor(audio.duration);
});
// SARKI İLERLERKEN SÜRESİNİN GÖSTERİLMESİ FONKSİYONU
audio.addEventListener("timeupdate", () => {
  progressBar.value = Math.floor(audio.currentTime);
  currentTime.textContent = calculateTime(progressBar.value);
});
// INPUTA DOKUNUNCA O NOKTADAKİ SÜREYİ GÖSTERME FONKSİYONU
progressBar.addEventListener("input", () => {
  currentTime.textContent = calculateTime(progressBar.value);
  audio.currentTime = progressBar.value;
});

// SES AYARLARI
let sesDurumu = "sesli";
// SES AYARI EN BAŞA ÇEKİLİRSE SESSİZ İKONU GÖZÜKMESİ
volumeBar.addEventListener("input", (e) => {
  const value = e.target.value;
  audio.volume = value / 100;
  if (value == 0) {
    audio.muted = true;
    sesDurumu = "sessiz";
    volume.classList = "fa-solid fa-volume-xmark";
  } else {
    audio.muted = false;
    sesDurumu = "sesli";
    volume.classList = "fa-solid fa-volume-high";
  }
});
// VOLUME'E TIKLANINCA SESİN AÇILIP KAPANMASI
volume.addEventListener("click", () => {
  if (sesDurumu === "sesli") {
    audio.muted = true;
    sesDurumu = "sessiz";
    volume.classList = "fa-solid fa-volume-xmark";
    volumeBar.value = 0;
  } else {
    audio.muted = false;
    sesDurumu = "sesli";
    volume.classList = "fa-solid fa-volume-high";
    volumeBar.value = 100;
  }
});
// TOOGLE TIKLAYINCA LİSTENİN GELMESİ
const displayMusicList = (list) => {
  for (let i = 0; i < list.length; i++) {
    let liTag = `
  <li li-index='${i}' onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
    <span> ${list[i].getName()}</span>
    <span id="music-${i}"
     class="badge rounded-pill"></span>
    <audio class= "music-${i}" src="mp3/${list[i].file}"></audio>
  </li>`;
    ul.insertAdjacentHTML("beforeend", liTag);
    let liAudioDuration = ul.querySelector(`#music-${i}`);
    let liAudioTag = ul.querySelector(`.music-${i}`);

    liAudioTag.addEventListener("loadeddata", () => {
      liAudioDuration.innerText = calculateTime(liAudioTag.duration);
    });
  }
};
// Lİ'YE TIKLANDIĞINDA O ŞARKININ BAŞLATILMASI
const selectedMusic = (li) => {
  player.index = li.getAttribute("li-index");
  displayMusic(player.getMusic());
  playMusic();
  isPlayingNow();
};
// Lİ ELEMANI EĞER ÇALIYORSA ARKAPLAN RENGİNİN DEĞİŞMESİ
const isPlayingNow = () => {
  for (let li of ul.querySelectorAll("li")) {
    if (li.classList.contains("playing")) {
      li.classList.remove("playing");
    }
    if (li.getAttribute("li-index") == player.index) {
      li.classList.add("playing");
    }
  }
};
audio.addEventListener("ended", () => {
  nextMusic();
});
