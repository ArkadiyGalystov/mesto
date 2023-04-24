// класс Popup, который отвечает за открытие и закрытие попапа
class Popup {
  constructor(popupSelector) { // Принимает в конструктор единственный параметр — селектор попапа
    this._popup = document.querySelector(popupSelector);
  }

  // публичные методы, которые отвечают за открытие попапа
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this._handleOverlayClose);
  }

  // публичные методы, которые отвечают за закрытие попапа
  close() {
    this._popup.classList.remove('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this._handleOverlayClose);
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
      if (evt.target.classList.contains('popup_opened')) {
        this.close(this._popup);
      }
  });
    
    this._popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
            this.close(this._popup);
        }
    });
  }
}

export { Popup };
