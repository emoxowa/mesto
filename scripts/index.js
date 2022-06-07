"use strict";

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
const cardInfos = initialCards.map((item) => {
  return {
    name: item.name,
    link: item.link,
  };
})

function renderCards() {
  cardInfos.forEach((data) => {
    const cardElement = createCard(data);
    cardsContainer.prepend(cardElement);
  });
}

function createCard({ name, link }) {
  const templateCard = document.querySelector("#card-template").content;
  const cardElement = templateCard.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.setAttribute("alt", cardTitle.textContent);
  return cardElement;
} 

renderCards();

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

function addCard({name, link}) {
  const cardElement = createCard({ name, link });
  cardsContainer.prepend(cardElement);
  closePopup(popupCreate);
}


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
buttonCreate.addEventListener("click", closePopup(popupCreate));



document.addEventListener('click', function (e) {
  const element = e.target;
  // открытие popup с изображением
  if (element && element.className == "card__image") {
    openPopup(popupImage);
    const img = document.querySelector(".popup__image");
    const caption = document.querySelector(".popup__caption");
    img.src = element.src;
    caption.textContent = element.parentElement
      .querySelector(".card__body")
      .querySelector(".card__title").textContent;
    img.setAttribute("alt", caption.textContent);
  }
  // добавление лайка
  if (element && element.classList.contains("card__button-like")) {
    element.classList.toggle("card__button-like_added");
  }

  // удаление карточки
  if (element && element.className == "card__button-remove") {
    const card = element.closest(".card");
    card.remove();
  }
});