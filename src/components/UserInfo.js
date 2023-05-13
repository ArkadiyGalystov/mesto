// Класс UserInfo отвечает за управление отображением информации о пользователе на странице
class UserInfo {
  constructor({ nameSelector, subtitleSelector, avatarSelector }) {
    this._userName = document.querySelector(nameSelector);
    this._userSubtitle = document.querySelector(subtitleSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  // публичный метод getUserInfo, который возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._userName.textContent,
      subtitle: this._userSubtitle.textContent,
      avatar: this._avatar.src
    };
  }

  // публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userSubtitle.textContent = data.about;
    this._avatar.src = data.avatar;
    this._avatar.alt = data.name;
    this._id = data._id;
  }

  getUserId() {
    return this._id;
  }
  
  setUserAvatar ({avatar}) {
    this._avatar.src = avatar;
  }
}

export { UserInfo };