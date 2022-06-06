// "use strict";

import { initialCards } from "./cards.js";

const buttonEdit = document.querySelector(".button_type_edit");
const popupEdit = document.querySelector(".popup-edit");
const popupCreate = document.querySelector(".popup-create");
const popupImage = document.querySelector(".popup-image");
const buttonSaveEdit = document.querySelector(".button_type_save");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#job");
const cardsContainer = document.querySelector(".cards");
const buttonAdd = document.querySelector(".button_type_add");
const buttonCreate = document.querySelector(".button_type_create");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const urlInput = document.querySelector(".popup__input_type_url");
const iconClosePopupEdit = document.querySelector(".popup-icon-close-edit");
const iconClosePopupCreate = document.querySelector(".popup-icon-close-create");
const iconClosePopupImage = document.querySelector(".popup-icon-close-image");

function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
}

function openPopup(popupName) {
  popupName.classList.add("popup_opened");
}

function saveProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}


function openPopupEdit() {
  if (!popupEdit.classList.contains("popup_opened")) {
    openPopup(popupEdit);
    nameInput.value = profileName.innerText;
    jobInput.value = profileJob.innerText;
  }
}

//1. Создание карточек

// Создание исходных карточек
function renderCards() {
  cardInfo.forEach(renderCard);
}

const cardInfo = initialCards.map((item) => {
  return {
    name: item.name,
    link: item.link,
  };
})

function renderCard({ name, link }) {
  const templateCard = document.querySelector("#card-template").content;
  const cardElement = templateCard.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  cardTitle.textContent = name;
  cardImage.src = link;
  cardsContainer.prepend(cardElement);
} 

renderCards();

//2. Форма добавления карточки

buttonAdd.addEventListener("click", () => {
  openPopup(popupCreate);
  cardNameInput.value = "";
  urlInput.value = "";
});



//3.Добавление карточки

// function createCard(evt) {
//   evt.preventDefault();
//   const templateCard = document.querySelector("#card-template").content;
//   const cardElement = templateCard.cloneNode(true);
//   const cardTitle = cardElement.querySelector(".card__title");
//   const cardImage = cardElement.querySelector(".card__image");
//   cardTitle.textContent = cardNameInput.value;
//   cardImage.src = urlInput.value;
//   cardImage.setAttribute("alt", cardTitle.textContent);
//   cardsContainer.prepend(cardElement);
//   removeCard();
//   toggleLike();
//   openPopupImage();
// }

// 4. Лайк карточки

const toggleLike = () => {
  const likes = document.querySelectorAll(".card__button-like");
  likes.forEach((like) => {
    like.addEventListener("click", (event) =>
      event.target.classList.toggle("card__button-like_added")
    );
  });
};

toggleLike();

//5. Удаление карточки
const removeCard = () => {
  const removeButtons = document.querySelectorAll(".card__button-remove");
  removeButtons.forEach((removeButton) => {
    const card = removeButton.closest(".card");
    removeButton.addEventListener("click", () => card.remove());
  });
};

removeCard();

//6. Открытие попапа с картинкой

function openPopupImage() {
  const images = document.querySelectorAll(".card__image");
  images.forEach((image) =>
    image.addEventListener("click", function () {
      openPopup(popupImage);
      const img = document.querySelector(".popup__image");
      const caption = document.querySelector(".popup__caption");
      img.src = image.src;
      caption.textContent = image.parentElement
        .querySelector(".card__body")
        .querySelector(".card__title").textContent;
      img.setAttribute("alt", caption.textContent);
    })
  );
}

openPopupImage();

buttonSaveEdit.addEventListener("click", saveProfile);
buttonEdit.addEventListener("click", openPopupEdit);
iconClosePopupEdit.addEventListener('click', () => {
  closePopup(popupEdit);
})
iconClosePopupCreate.addEventListener('click', () => {
  closePopup(popupCreate);
})
iconClosePopupImage.addEventListener('click', () => {
  closePopup(popupImage);
})

buttonCreate.addEventListener("click", createCard);
buttonCreate.addEventListener("click", closePopup(popupCreate));
