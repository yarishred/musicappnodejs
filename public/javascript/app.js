//Songs Form
//Variables DOM
const songFormButton = document.querySelector(".songFormBtn");
const addSongContainer = document.querySelector(".container-addSong");
const playListContainer = document.querySelector(".playlist-container");
const welcomeTitle = document.querySelector(".welcome-user-text");

//Switch for display form
let swSongFormButton = true;

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
