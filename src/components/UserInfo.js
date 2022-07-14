"use strict";

export default class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._name = document.querySelector(userNameSelector);
    this._job = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    };
  }

  setUserInfo({ name, job }) {
    this._name.textContent = name;
    this._job.textContent = job;
  }
}

