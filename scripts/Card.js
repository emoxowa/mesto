"use strict";

class Card {
  constructor({ name, link }, cardSelector, openPopupImage) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._openPopupImage = openPopupImage;
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
    this._buttonRemove = this._element.querySelector(".card__button-remove");

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._cardTitle.textContent;

    this._setEventListeners();

    return this._element;
  }

  _toggleLike() {
    this._buttonLike.classList.toggle("card__button-like_added");
  }

  _removeCard() {
    this._element.remove();
    this._element = null;
  }

  _handleOpenImage() {
    this._openPopupImage({
      name: this._name,
      link: this._link,
    });
  }

  _setEventListeners() {
    this._buttonLike.addEventListener("click", () => {
      this._toggleLike();
    });
    this._buttonRemove.addEventListener("click", () => {
      this._removeCard();
    });
    this._cardImage.addEventListener("click", () => {
      this._handleOpenImage();
    });
  }
}

export { Card };
