const openButton = document.querySelector(".button_type_edit");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-icon");
const saveButton = document.querySelector(".button_type_save");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");
let nameInput = document.querySelector("#name");
let jobInput = document.querySelector("#job");

function saveProfile(evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

function togglePopup() {
  if (!popup.classList.contains("popup_opened")) {
    popup.classList.add("popup_opened");
    nameInput.value = profileName.innerText;
    jobInput.value = profileJob.innerText;
  }
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

saveButton.addEventListener("click", saveProfile);
openButton.addEventListener("click", togglePopup);
closeButton.addEventListener("click", closePopup);
