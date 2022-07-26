"use strict";

import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";

import {
  initialCards,
  settings,
  buttonEdit,
  buttonAdd,
  nameInput,
  jobInput,
  formEdit,
  formAdd,
} from "../utils/constants.js";


const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-46",
  headers: {
    authorization: "7f0a4e86-e84d-44bd-b3f3-cc21b6ec49e1",
    "Content-Type": "application/json",
  },
});


  


//Создание карточек


function createCard(data) {
  const card = new Card(data, "#card-template", () => {
    popupImage.open(data);
  });
  const cardElement = card.generateCard();
  return cardElement;
}


const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      cardList.addItem(card);
    },
  },
  ".cards"
);

cardList.renderItems();

// popupImage

const popupImage = new PopupWithImage(".popup-image");
popupImage.setEventListeners();

// popupCreate

const popupCreate = new PopupWithForm(".popup-create", handleFormSubmit);

function handleFormSubmit(formData) {
  const cardItem = {
    name: formData["place-name"],
    link: formData['link'],
  };
  const card = createCard(cardItem);
  cardList.addItem(card);
  popupCreate.close();
}

buttonAdd.addEventListener("click", () => {
  popupCreate.open();
});

popupCreate.setEventListeners();


// userInfo / popupEdit

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userJobSelector: '.profile__job',
});

api
  .getUserInfoFromServer()
  .then((userData) => {
    userInfo.setUserInfo(userData);
  })
  .catch((err) => {
    console.log(err);
  });

const popupEdit = new PopupWithForm(".popup-edit", (formData) => {
  userInfo.setUserInfo(formData);
  popupEdit.close();
});

buttonEdit.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  popupEdit.open();
});

popupEdit.setEventListeners();

// Валидация
const validatorEdit = new FormValidator(settings, formEdit);
validatorEdit.enableValidation();
buttonEdit.addEventListener("click", () => validatorEdit.validatePopup());

const validatorAdd = new FormValidator(settings, formAdd);
validatorAdd.enableValidation();
buttonAdd.addEventListener("click", () => validatorAdd.validatePopup());


