// Класс UserInfo отвечает за управление отображением информации о пользователе на странице
class UserInfo {
  constructor({ nameSelector, subtitleSelector, avatarSelector }) {
    this._profileTitle = document.querySelector(nameSelector);
    this._profileSubtitle = document.querySelector(subtitleSelector);
    //this._avatar = document.querySelector(avatarSelector);
  }

  // публичный метод getUserInfo, который возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._profileTitle.textContent,
      about: this._profileSubtitle.textContent,
      //avatar: this._avatar.src
    };
  }

  // публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ data }) {
    this._profileTitle.textContent = data.name;
    this._profileSubtitle.textContent = data.about;
    //this._avatar.src = data.avatar;
    //this._avatar.alt = data.name;
    //this._id = data._id;
  }

  getUserId() {
    return this._id;
  }
}

export { UserInfo };
