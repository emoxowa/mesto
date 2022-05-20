const openButton = document.querySelector(".button_type_edit");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-icon");
const saveButton = document.querySelector(".button_type_save");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");
let nameInput = document.querySelector("#name");
let jobInput = document.querySelector("#job");
const likes = document.querySelectorAll(".card__button-like");


function saveProfile(evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup(); 
}

function togglePopup() {
  popup.classList.toggle("popup_opened");
  if (popup.classList.contains("popup_opened")) {
    nameInput.value = profileName.innerText;
    jobInput.value = profileJob.innerText;
  }
}

// Лайк карточки
const toggleLike = () => {
  likes.forEach(like => {
    like.addEventListener('click', event => event.target.classList.toggle("card__button-like_added"))
  })
}

toggleLike();
saveButton.addEventListener("click", saveProfile);
openButton.addEventListener("click", togglePopup);
closeButton.addEventListener("click", togglePopup);
