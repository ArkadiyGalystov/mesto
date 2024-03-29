class FormValidator {
  constructor(validForm, formElement) {
    this._inputSelector = validForm.inputSelector;
    this._submitButtonSelector = validForm.submitButtonSelector;
    this._inactiveButtonClass = validForm.inactiveButtonClass;
    this._inputErrorClass = validForm.inputErrorClass;
    this._errorClass = validForm.errorClass;
    this._formElement = formElement;
  }

  // добавляет класс с ошибкой
  _showInputError() {
    const errorElement = this._formElement.querySelector(`.${this._inputElement.id}-error`); // находим элемент ошибки внутри самой функции
    this._inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = this._inputElement.validationMessage; // показываем сообщение об ошибке
    errorElement.classList.add(this._errorClass); // замена содержимого span с ошибкой на переданный параметр
  }

  // удаляет класс с ошибкой
  _hideInputError() {
    const errorElement = this._formElement.querySelector(`.${this._inputElement.id}-error`); // находим элемент ошибки
    this._inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.add(this._errorClass); //
    errorElement.textContent = ''; // cкрываем сообщение об ошибке
  }

  // проверяет валидность поля. Принимает inputElement
  _isValid(inputElement) {
    if (!this._inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // проверяет валидность полей и отключает или включает кнопку отправки
  __disabledSubmitBtm() {
    const isFormValid = this._formElement.checkValidity();
    this._buttonElement.disabled = !isFormValid;
    this._buttonElement.classList.toggle(
      this._inactiveButtonClass, // добавляем класс неактивной кнопки
      !isFormValid // если валидация не пройдена
    );
  }

  _setEventListeners() {
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector); // кнопка
    this._inputList = this._formElement.querySelectorAll(this._inputSelector);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._inputElement = inputElement;
        this._isValid();
        this.__disabledSubmitBtm();
      });
    });
  }

  // проверки формы. плюс деактивация кнопки и удаление текста ошибки
  disablesSubmitForm() {
    this._inputList.forEach((inputElement) => {
      this._inputElement = inputElement;
      this._hideInputError();
    });

    this.__disabledSubmitBtm();
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export { FormValidator };
