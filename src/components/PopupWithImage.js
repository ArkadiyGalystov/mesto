import { Popup } from './Popup.js';

// Этот класс должен перезаписывать родительский метод open (наследует от Popup)
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._imageSlider = this._popup.querySelector('.popup-image__pic');
    this._sliderText = this._popup.querySelector('.popup-image__title');
  }

  // вставляем текст в слайдер
  open({ name, link }) {
    this._imageSlider.src = link;
    this._imageSlider.alt = name;
    this._sliderText.textContent = name;
    super.open();
  };
}

export { PopupWithImage };
