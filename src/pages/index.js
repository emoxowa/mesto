"use strict";

import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import {
  initialCards,
  settings,
  buttonEdit,
  buttonAdd,
  nameInput,
  jobInput,
  cardNameInput,
  urlInput,
  formEdit,
  formAdd,
} from "../utils/constants.js";


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
//   () => {
//   const inputValues = popupCreate._getInputValues();
//   console.log(inputValues);
//   item = {
//     name: inputValues.['name'],
//     link: inputValues.['link'],
//   };
//   const card = createCard(item);
//   cardList.addItem(card);
//   popupCreate.close();
// });




// popupEdit

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userJobSelector: '.profile__job',
});

const popupEdit = new PopupWithForm(".popup-edit", (formData) => {
  userInfo.setUserInfo(formData);
  popupEdit.close();
});

buttonEdit.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
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


