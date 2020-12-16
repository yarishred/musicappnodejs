const signUpBtn = document.querySelector(".signUp-btn");
const signUpContainer = document.querySelector(".cont-signUp");
const signUpButtonContainer = document.querySelector(".signUp-button-container");
const signUp = document.querySelector('.signUp');
const signIn = document.querySelector('.signIn');

signUpBtn.addEventListener("click", () => {
  signUpContainer.classList.add("cont-signUpScale");
  signUpButtonContainer.style.opacity = 0;
  signUp.style.opacity = 1
  signIn.style.opacity = 0
  signIn.style.visibility = 'hidden';
});
