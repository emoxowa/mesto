"use strict";

export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._name = document.querySelector(userNameSelector);
    this._job = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._job.textContent,
    };
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._job.textContent = userData.about;
  }
}

