"use strict";

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  };

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  };

  close() {
    document.removeEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
    this._popup.classList.remove("popup_opened");
  };

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  };
    
  _handleClose(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      this.close();
    };
    if (evt.target.classList.contains("popup__close-icon")) {
      this.close();
    }
  }
  
    setEventListeners() {
      this._popup.addEventListener("mousedown", (evt) => {
        this._handleClose(evt);
      });
  };
}