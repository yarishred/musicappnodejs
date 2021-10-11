//Songs Form
//Variables DOM
const songFormButton = document.querySelector(".songFormBtn");
const addSongContainer = document.querySelector(".container-addSong");
const playListContainer = document.querySelector(".playlist-container");
const welcomeTitle = document.querySelector(".welcome-user-text");
const songTime = document.querySelector(".counterPlayer h6");
const progressBar = document.querySelector(".progressBar");

//Switch variables for display form and play audio
let swSongFormButton = true;
let actionAudioButton = true;

//Variables
let tiemporestante, minutos, segundos;

//Functions
const displaySongForm = () => {
  if (swSongFormButton) {
    swSongFormButton = false;
    welcomeTitle.style.visibility = "hidden";
    addSongContainer.style.height = "750px";
    playListContainer.style.marginTop = "45rem";
    songFormButton.classList.add("rotation");
  } else {
    swSongFormButton = true;
    welcomeTitle.style.visibility = "initial";
    addSongContainer.style.height = "0";
    playListContainer.style.marginTop = "14rem";
    songFormButton.classList.remove("rotation");
  }
};

const rotateButton = () => {
  swSongFormButton
    ? songFormButton.classList.remove("rotation")
    : songFormButton.classList.add("rotation");
};

//Event Button
songFormButton.addEventListener("click", displaySongForm);

//Variables Player
const buttons = document.querySelectorAll("#playBtn");
const songs = document.querySelectorAll(".song");
const displayCover = document.querySelector(".img-wrapper img");
const artistName = document.querySelector(".song-info h5");
const songName = document.querySelector(".song-info h6");

const addToPlayer = (e) => {
  const songCover = e.target.parentElement.offsetParent.children[0].src;
  const artist = e.target.parentElement.offsetParent.children[3].innerHTML;
  const song = e.target.parentElement.offsetParent.children[4].innerHTML;

  displayCover.src = songCover;
  artistName.innerHTML = artist;
  songName.innerHTML = song;
};

buttons.forEach((btn) => btn.addEventListener("click", addToPlayer));

let actualSong = 0;

buttons.forEach((songBtn, index) => {
  songBtn.addEventListener("click", function (e) {
    songs[actualSong].classList.remove("current");
    songs[actualSong].pause();
    songs[actualSong].currentTime = 0;
    this.previousElementSibling.classList.add("current");
    this.previousElementSibling.play();

    actualSong = index;

    console.log(e);
  });
});

// //Variables Player
// const songsButton = document.querySelectorAll("#playBtn");
// const songs = document.querySelectorAll(".song");

// let switchSong = false;

// //Variable current song
// //Event Button
// audioButton.forEach((audioBtn, index) => {
//   audioBtn.addEventListener("click", (e) => {
//     if (actionAudioButton && songAudio[index].paused()) {
//       actionAudioButton = false;
//       songAudio[index].play();
//     }
//   });
// });

songs.forEach((sAudio) =>
  sAudio.addEventListener("timeupdate", () => {
    tiemporestante = Math.floor(parseInt(sAudio.duration - sAudio.currentTime));
    segundos = parseInt(tiemporestante % 60);
    minutos = parseInt(tiemporestante / 60);
    segundos < 10
      ? (songTime.innerHTML = `-${minutos}:0${segundos}`)
      : (songTime.innerHTML = `-${minutos}: ${segundos}`);
    let myWidth = (sAudio.currentTime / sAudio.duration) * 402;
    progressBar.style.width = `${myWidth}px`;
  })
);

//Playlist container
const displayPlaylist = document.querySelector(".display-playlist");
const playlist = document.querySelector(".playlist");

let switchPlaylist = false;

//Function
const openClose = () => {
  const appearPlaylist = {
    opacity: 1,
    height: "600px",
  };

  const { opacity, height } = appearPlaylist;

  if (switchPlaylist === false) {
    switchPlaylist = true;
    playlist.style.height = height;
    playlist.style.opacity = opacity;
  } else {
    switchPlaylist = false;
    playlist.style.height = 0;
    playlist.style.opacity = 0;
  }
};

//Event
displayPlaylist.addEventListener("click", openClose);

//Add to playlist
const addToPlaylistButtons = document.querySelectorAll(".addToPlaylist");
const mySongData = document.querySelectorAll(".card");

let myPlaylistSongs = [];

//Functions
// let songName =
// myPlaylistSongs.push(songName);

// let songList = document.createElement("div");
// let song = document.createElement("h6");
// song.innerHTML = songName
// songList.appendChild(song);
// playlist.appendChild(songList)

let songList, songTitle, bandName, songDuration, songLength;

addToPlaylistButtons.forEach((addToPlaylistBtn, index) => {
  mySongIndex = index;
  addToPlaylistBtn.addEventListener("click", () => {
    songDuration = {
      setMinutes: Math.floor(songs[index].duration / 60),
      setSeconds:
        Math.floor(songs[index].duration % 60) < 10
          ? `0${Math.floor(songs[index].duration % 60)}`
          : Math.floor(songs[index].duration % 60),
    };

    let songInfo = {
      songName: mySongData[index].childNodes[9].innerHTML,
      band: mySongData[index].childNodes[7].innerHTML,
      time: `${songDuration.setMinutes}:${songDuration.setSeconds}`,
    };

    songList = document.createElement("div");
    songTitle = document.createElement("h6");
    songTitle.textContent = songInfo.songName;
    bandName = document.createElement("h6");
    bandName.textContent = songInfo.band;
    songLength = document.createElement("h6");
    songLength.textContent = songInfo.time;
    songList.append(songTitle, bandName, songLength);

    playlist.appendChild(songList);
  });
});
