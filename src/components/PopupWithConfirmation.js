"use strict";
import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this.formElement = this._popup.querySelector(".popup__form");
  }

  open(cardId) {
    super.open();
    this._cardId = cardId._id;
  }

  setEventListeners() {
    super.setEventListeners();
    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._cardId);
    });
  }
}