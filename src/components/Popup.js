// класс Popup, который отвечает за открытие и закрытие попапа
class Popup {
  constructor(popupSelector) { //принимает параметром - селектор класса
    this._popup = document.querySelector(popupSelector);
  }

  // публичные методы, которые отвечают за открытие попапа
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // публичные методы, которые отвечают за закрытие попапа
  close() {
    this._popup.classList.remove('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // публичные методы, которые отвечают за закрытие попапа клавишей Esc
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close(this._popup);
    }
  };

  // публичные методы, которые отвечают за закрытие попапа иконке закрытия и при клике на затемнённую область
  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
            this.close(this._popup);
        }
    });
  }
}

export { Popup };
