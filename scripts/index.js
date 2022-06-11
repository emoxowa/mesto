"use strict";

import { initialCards } from "./cards.js";

const buttonEdit = document.querySelector(".button_type_edit");
const popupEdit = document.querySelector(".popup-edit");
const popupCreate = document.querySelector(".popup-create");
const popupImage = document.querySelector(".popup-image");
const buttonSaveEdit = document.querySelector(".button_type_save");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const nameInput = document.querySelector("#name__input");
const jobInput = document.querySelector("#job__input");
const cardsContainer = document.querySelector(".cards");
const buttonAdd = document.querySelector(".button_type_add");
const buttonCreate = document.querySelector(".button_type_create");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const urlInput = document.querySelector(".popup__input_type_url");
const iconClosePopupEdit = document.querySelector(".popup-icon-close-edit");
const iconClosePopupCreate = document.querySelector(".popup-icon-close-create");
const iconClosePopupImage = document.querySelector(".popup-icon-close-image");
const templateCard = document.querySelector("#card-template").content;



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
    openPopup(popupEdit);
    nameInput.value = profileName.innerText;
    jobInput.value = profileJob.innerText;
}

//1. Создание карточек

function renderCards(data) {
  const cardElement = createCard(data);
  cardsContainer.prepend(cardElement);
}

const cardInfos = initialCards.map((item) => {
  return {
    name: item.name,
    link: item.link,
  };
});

function renderInitialCards() {
  cardInfos.forEach((data) => renderCards(data));
}

renderInitialCards();


function createCard({ name, link }) {
  const cardElement = templateCard.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.setAttribute("alt", cardTitle.textContent);

  //Слушатель на корзину
  const buttonRemove = cardElement.querySelector(".card__button-remove");
  buttonRemove.addEventListener("click", removeCard);
  
  //Слушатель на лайк
  const buttonLike = cardElement.querySelector(".card__button-like");
  buttonLike.addEventListener("click", toggleLike);

  // Слушатель на картинку
  const img = popupImage.querySelector(".popup__image");
  const caption = popupImage.querySelector(".popup__caption");
  cardImage.addEventListener('click', () => {
    img.setAttribute('src', link);
    img.setAttribute("alt", name);
    caption.textContent = name;
    openPopup(popupImage);
  });

  return cardElement;
} 


//2. Форма добавления карточки

buttonAdd.addEventListener("click", () => {
  openPopup(popupCreate);
  cardNameInput.value = "";
  urlInput.value = "";
});


//3.Добавление новой карточки карточки

function handleAddCard(e) {
  e.preventDefault();
  const name = cardNameInput.value;
  const link = urlInput.value;
  addCard({ name, link });
}

function addCard({ name, link }) {
  renderCards({ name, link });
  closePopup(popupCreate);
}

// 4. Лайк карточки
function toggleLike(evt) {
  evt.target.classList.toggle("card__button-like_added");
}

// 5. Удаление карточки
function removeCard(evt) {
  evt.target.closest(".card").remove();
}

// function hideInputError() {
//     document.querySelector(".popup__input-error").textContent = "";
//     document
//       .querySelector(".popup__input")
//       .classList.remove("popup__input_type_error");
// }

// --------------------------------------------------//

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

buttonCreate.addEventListener("click", handleAddCard);

// --------------------------------------------------//

