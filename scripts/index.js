"use strict";

import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./cards.js";


const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const buttonEdit = document.querySelector(".button_type_edit");
const buttonAdd = document.querySelector(".button_type_add");
const popupEdit = document.querySelector(".popup-edit");
const popupCreate = document.querySelector(".popup-create");
const popupImage = document.querySelector(".popup-image");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const nameInput = document.querySelector("#name-input");
const jobInput = document.querySelector("#job-input");
const cardsContainer = document.querySelector(".cards");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const urlInput = document.querySelector(".popup__input_type_url");
const popups = document.querySelectorAll('.popup');
const formEdit = document.querySelector("#form-edit");
const formAdd = document.querySelector("#form-add");


// Закрытие попапа нажатием на Esc
function pressEscape(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
  document.removeEventListener("keydown", pressEscape);
}

function openPopup(popupName) {
  popupName.classList.add("popup_opened");
  document.addEventListener("keydown", pressEscape);
}

function openPopupEdit() {
    openPopup(popupEdit);
    nameInput.value = profileName.innerText;
    jobInput.value = profileJob.innerText;
}

function saveProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

//1. Создание карточек


function createCard(data) {
  const card = new Card(data, "#card-template", openPopupImage);
  const cardElement = card.generateCard();

  return cardElement;
}


function renderCard(data) {
  cardsContainer.prepend(createCard(data));
}

function renderInitialCards() {
  initialCards.forEach(renderCard);
}

renderInitialCards();


//2. Форма добавления карточки

buttonAdd.addEventListener("click", () => {
  cardNameInput.value = "";
  urlInput.value = "";
  openPopup(popupCreate);
});


//3.Добавление новой карточки карточки

function handleAddCard(evt) {
  evt.preventDefault();
  const name = cardNameInput.value;
  const link = urlInput.value;
  addCard({ name, link });
}

function addCard({ name, link }) {
  renderCard({ name, link });
  closePopup(popupCreate);
}

//4. Открытие popup c картинкой

function openPopupImage({ name, link }) {
  const img = popupImage.querySelector(".popup__image");
  const caption = popupImage.querySelector(".popup__caption");
  img.setAttribute("src", link);
  img.setAttribute("alt", name);
  caption.textContent = name;
  openPopup(popupImage);
}

// --------------------------------------------------//

formEdit.addEventListener("submit", saveProfile);
buttonEdit.addEventListener("click", openPopupEdit);
formAdd.addEventListener("submit", handleAddCard);

// Закрытие попапа кликом на оверлей + Закрытие попапа кликом на крестик 
popups.forEach( (popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-icon")) {
      closePopup(popup);
    }
   })
});

// Валидация
const validatorEdit = new FormValidator(settings, formEdit);
validatorEdit.enableValidation();
buttonEdit.addEventListener("click", () => validatorEdit.validatePopup());

const validatorAdd = new FormValidator(settings, formAdd);
validatorAdd.enableValidation();
buttonAdd.addEventListener("click", () => validatorAdd.validatePopup());


