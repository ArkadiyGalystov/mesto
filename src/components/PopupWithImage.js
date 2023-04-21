import { Popup } from './Popup.js';

// Этот класс должен перезаписывать родительский метод open (наследует от Popup)
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._imageClicked = document.querySelector('.popup__slider-image');
    this._nameImageClicked = document.querySelector('.popup__slider-text');
  }

  open(name, link) {
    this._nameImageClicked.textcontent = name;

    this._imageClicked.src = link;
    this._imageClicked.alt = name;

    super.open();
  };
}

export { PopupWithImage };
