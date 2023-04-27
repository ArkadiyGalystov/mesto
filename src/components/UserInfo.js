// Класс UserInfo отвечает за управление отображением информации о пользователе на странице
class UserInfo {
  constructor({ nameSelector, subtitleSelector }) {
    this._profileTitle = document.querySelector(nameSelector);
    this._profileSubtitle = document.querySelector(subtitleSelector);
  }

  // публичный метод getUserInfo, который возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._profileTitle.textContent,
      subtitle: this._profileSubtitle.textContent,
    };
  }

  // публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ name, about }) {
    this._profileTitle.textContent = name;
    this._profileSubtitle.textContent = about;
  }
}

export { UserInfo };
