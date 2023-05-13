import { Popup } from './Popup.js';

// принимает в конструктор колбэк сабмита формы (который наследует от Popup)
class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._form = document.querySelector(popupSelector).querySelector('.form'); // все формы
    this._inputList = Array.from(this._form.querySelectorAll('.form__item')); // все поля формы
    this._submitButton = this._form.querySelector('.form__submit-button'); // кнопка на формах
  }

  // приватный метод _getInputValues, который собирает данные всех полей формы
  _getInputValues() {
    this._formInputValues = {}; // пустой объект
    this._inputList.forEach((input) => { // заполнили все поля через forEach
      this._formInputValues[input.name] = input.value;
    });
    return this._formInputValues;
  }

  // Перезаписывает родительский метод close (при закрытии попапа форма должна ещё и сбрасываться)
  close() {
    super.close();
    this._form.reset();
  }
  // перезаписывает родительский метод
  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => { // обработчик сабмита форме
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues()); //передали объект c помощью  _getInputValues
    });
  }

  // ход загрузки/сохранения
  renderLoading(isLoading, submitButtonText) {
    if (isLoading) {
      this._submitButton.textContent = submitButtonText;
      this._submitButton.disabled = true;
    } else {
      this._submitButton.textContent = submitButtonText;
      this._submitButton.disabled = false;
    }
  }
}

export { PopupWithForm };