"use strict";

export default class UserInfo {
  constructor({ userNameSelector, userJobSelector, userAvatarSelector }) {
    this._name = document.querySelector(userNameSelector);
    this._job = document.querySelector(userJobSelector);
    this._avatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._job.textContent,
      avatar: this._avatar.src,
    };
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._job.textContent = userData.about;
    this._avatar.src = userData.avatar;
    this.userId = userData._id;
  }
}

