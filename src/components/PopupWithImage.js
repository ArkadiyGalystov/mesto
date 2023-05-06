import { Popup } from './Popup.js';

// Этот класс должен перезаписывать родительский метод open (наследует от Popup)
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._sliderImg = document.querySelector('.popup__slider-image');
    this._sliderText = document.querySelector('.popup__slider-text');
  }

  open(name, link) {
    this._sliderImg.src = link;
    this._sliderImg.alt = name;
    this._sliderText.textContent = name;
    super.open();
  };
}

export { PopupWithImage };
