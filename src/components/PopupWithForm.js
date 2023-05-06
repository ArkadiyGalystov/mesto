import { Popup } from './Popup.js';

// принимает в конструктор колбэк сабмита формы (который наследует от Popup)
class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._form = document.querySelector(popupSelector).querySelector('.form'); // все формы
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input')); // все поля формы
    this._submitButton = this._form.querySelector('.popup__input-button'); // кнопка на формах
    this._submitButtonText = this._submitButton.textContent; // текст на кнопках
  }

  _getInputValues() { // приватный метод _getInputValues, который собирает данные всех полей формы
    this._formInputValues = {};
    this._inputList.forEach((input) => {
      this._formInputValues[input.name] = input.value;
    });
    return this._formInputValues;
  }

  // перезаписывает родительский метод
  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => { //добавляет обработчик сабмита форме
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
  
  // Перезаписывает родительский метод close (при закрытии попапа форма должна ещё и сбрасываться)
  close() {
    super.close();
    this._form.reset();
  }

    // ход загрузки/сохранения
    renderLoading(isLoading, submitButtonText) {
      if(isLoading) {
        this._submitButton.textContent = submitButtonText;
        this._submitButton.disabled = true;
      } else {
        this._submitButton.textContent = submitButtonText;
        this._submitButton.disabled = false;
      }
   }
}

export { PopupWithForm };
