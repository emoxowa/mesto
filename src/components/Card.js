"use strict";

export default class Card {
  constructor(
    { name, link, likes, _id, owner },
    cardSelector,
    handleCardClick,
    handleDeleteBtnCardClick,
    handleLikeIconClick,
    ownerId,
  ) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._cardId = _id; //id карточки
    this._owner = owner; // владелец карточки
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteBtnCardClick = handleDeleteBtnCardClick;
    this._handleLikeIconClick = handleLikeIconClick;
    this._ownerId = ownerId; // мой id
   }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();

    this._cardTitle = this._element.querySelector(".card__title");
    this._cardImage = this._element.querySelector(".card__image");

    this._buttonLike = this._element.querySelector(".card__button-like");
    this._cardLikeCounter = this._element.querySelector(".card__like-counter");

    this._buttonRemove = this._element.querySelector(".card__button-remove");

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._cardTitle.textContent;
    this._cardLikeCounter.textContent = this._likes.length;

    this._Liked = this._isLiked();
    this._renderLikes();
    this._setEventListeners();
    this._hideNotMyCardDeleteBtn();

   
    return this._element;
  }

 _isLiked() {
    return this._likes.some((item) => {
      return item._id === this._ownerId;
    });
  }

  toggleLike(data) {
    this._Liked = !this._Liked;
    this._buttonLike.classList.toggle("card__button-like_added");
    this._cardLikeCounter.textContent = data.likes.length;
  }

  _renderLikes() {
    if (this._isLiked()) {
      this._buttonLike.classList.add("card__button-like_added");
    }
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _hideNotMyCardDeleteBtn() {
    if (this._owner._id !== this._ownerId) {
      this._buttonRemove.remove();
    }
  }

  _setEventListeners() {
    this._buttonLike.addEventListener("click", () => {
      this._handleLikeIconClick(this._Liked, this._cardId);
    });
    this._buttonRemove.addEventListener("click", () => {
      this._handleDeleteBtnCardClick();
    });
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });
  }
}
