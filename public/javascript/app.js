//Songs Form
//Variables DOM
const songFormButton = document.querySelector(".songFormBtn");
const addSongContainer = document.querySelector(".container-addSong");
const playListContainer = document.querySelector(".playlist-container");
const welcomeTitle = document.querySelector(".welcome-user-text");

//Switch variables for display form and play audio
let swSongFormButton = true;
let actionAudioButton = false;

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
songFormButton.addEventListener("click", rotateButton);

//Reproduce Audio
//Variables DOM
const songAudio = document.querySelectorAll("#songs");
const audioButton = document.querySelectorAll("#playBtn");

//Variable count audio
let songCounter = 0;


//Event Button
audioButton.forEach((audioBtn, index) => {
  audioBtn.addEventListener("click", () => {
    songCounter = index;
    if (actionAudioButton) {
      actionAudioButton = false;
      songAudio[songCounter].pause();
      for (let audioBtn of audioButton) {
        audioBtn.innerHTML = '<i class="fa fa-play fa-2x"></i>';
      }
    } else {
      for (let audioBtn of audioButton) {
        audioBtn.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
      }
      songAudio[songCounter].play();
      actionAudioButton = true;

    }
  });
});
