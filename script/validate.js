// включение валидации всех форм
const validForm = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__input-button',
  inactiveButtonClass: 'popup__input-button_noactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__form-error',
};


// ошибки в формах popup
// добавляем ошибку 
const setInputError = (object, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // находим одинаковый класс с id (id + span)
  inputElement.classList.add(object.inputErrorClass); // добавляем класс ошибки
  errorElement.textContent = errorMessage; // сообщение span
  errorElement.classList.add(object.errorClass); // меняем span
};

// удаляем ошибку
const deleteInputError = (object, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // находим одинаковый класс с id (id + span)
  inputElement.classList.remove(object.inputErrorClass);
  errorElement.classList.add(object.errorClass);
  errorElement.textContent = '';
};

// ищем невалидные поля
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
// ----------------------------------------------------------------


// кнопки на формах popup
// проверка полей для кнопки (активная или нет)
const setButtonActive = (object, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    disabledSubmitBtm(object, buttonElement);
  } else {
    activeSubmitBtm(object, buttonElement);
  }
};

// неактивная кнопка popup
const disabledSubmitBtm = (object, buttonElement) => {
  buttonElement.classList.add(object.inactiveButtonClass);
  buttonElement.disabled = true;
};

// активная кнопка popup
const activeSubmitBtm = (object, buttonElement) => {
  buttonElement.classList.remove(object.inactiveButtonClass);
  buttonElement.disabled = false;
};
// ----------------------------------------------------------------


// Отключаем отправку форм.
function disabledSubmit(e) {
  e.preventDefault();
}

// Функция isValid теперь принимает formElement и inputElement
const isValid = (object, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    setInputError(object, formElement, inputElement, inputElement.validationMessage);
  } else {
    deleteInputError(object, formElement, inputElement);
  }
};

// добавляем обработчик для всех полей формы
const setEventListeners = (object, formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(object.inputSelector)
  );
  const buttonElement = formElement.querySelector(object.submitButtonSelector);
  setButtonActive(object, inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(object, formElement, inputElement);
      setButtonActive(object, inputList, buttonElement);
    });
  });
};

// перебераем все формы на странице
const enableValidation = (object) => {
  const formList = Array.from(document.querySelectorAll(object.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', disabledSubmit);
    setEventListeners(object, formElement);
  });
};

enableValidation(validForm);
