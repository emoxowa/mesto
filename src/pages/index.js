"use strict";

import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";
import PopupWithConfirmation from "../components/PopupWithConfirmation";

import {
  settings,
  buttonEdit,
  buttonAdd,
  buttonUpdateAvatar,
  nameInput,
  jobInput,
  formEdit,
  formAdd,
  formUpdateAvatar,
} from "../utils/constants.js";

let ownerId = null;
let currentCard = null;

// Api
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-46",
  headers: {
    authorization: "7f0a4e86-e84d-44bd-b3f3-cc21b6ec49e1",
    "Content-Type": "application/json",
  },
});


//Создание карточек

function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    () => {
      popupImage.open(data);
    },
    () => {
      currentCard = card;
      popupDelete.open(data);
    },
    (isLiked, cardId) => {
      api
        .changeLikeStatus(isLiked, cardId)
        .then((res) => {
            
            card.toggleLike(res);
            
          })
          .catch((err) => {
            console.log(err);
          });
    },
    ownerId,
  );

  const cardElement = card.generateCard();
  return cardElement;
}


const cardList = new Section(
  {
    renderer: (item) => {
      const card = createCard(item);
      cardList.addItem(card);
    },
  },
  ".cards"
);


// popupImage

const popupImage = new PopupWithImage(".popup-image");
popupImage.setEventListeners();

// popupCreate

const popupCreate = new PopupWithForm(".popup-create", (formData) => {
  popupCreate.loadingData(true);
  api
    .setCardToServer(formData)
    .then((res) => {
      const card = createCard(res);
      cardList.addItem(card);
      popupCreate.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupCreate.loadingData(false);
    });
})

buttonAdd.addEventListener("click", () => {
  popupCreate.open();
});

popupCreate.setEventListeners();


// userInfo / popupEdit

const userInfo = new UserInfo({
  userNameSelector: ".profile__name",
  userJobSelector: ".profile__job",
  userAvatarSelector: ".profile__avatar",
});

api.getUserInfoAndCardFromServer()
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    ownerId = userData._id; // мой id
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

const popupEdit = new PopupWithForm(".popup-edit", (formData) => {
  popupEdit.loadingData(true);
  api.setUserInfoFromServer(formData)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupEdit.close();
    })
    .catch((err) => {
    console.log(err);
    })
    .finally(() => {
    popupEdit.loadingData(false);
  })
  
});

buttonEdit.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  popupEdit.open();
});

popupEdit.setEventListeners();


// popupDelete
const popupDelete = new PopupWithConfirmation(".popup-delete", (cardId) => {
  api
    .deleteCardFromServer(cardId)
    .then(() => {
      currentCard.removeCard();
      popupDelete.close();
    })
    .catch((err) => {
      console.log(err);
    })
});

popupDelete.setEventListeners();


// popupAvatar

const popupAvatar = new PopupWithForm(".popup-update-avatar", (formData) => {
  popupAvatar.loadingData(true);
  api
    .changeUserAvatar(formData)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.loadingData(false);
    });
});

popupAvatar.setEventListeners();

buttonUpdateAvatar.addEventListener('click', () => {
  popupAvatar.open();
})

// Валидация
const validatorEdit = new FormValidator(settings, formEdit);
validatorEdit.enableValidation();
buttonEdit.addEventListener("click", () => validatorEdit.validatePopup());

const validatorAdd = new FormValidator(settings, formAdd);
validatorAdd.enableValidation();
buttonAdd.addEventListener("click", () => validatorAdd.validatePopup());

const validatorUpdateAvatar = new FormValidator(settings, formUpdateAvatar);
validatorUpdateAvatar.enableValidation();
buttonUpdateAvatar.addEventListener('click', () => validatorUpdateAvatar.validatePopup());

