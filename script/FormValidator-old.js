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
const setInputError = (validForm, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // находим одинаковый класс с id (id + span)
  inputElement.classList.add(validForm.inputErrorClass); // добавляем класс ошибки
  errorElement.textContent = errorMessage; // сообщение span
  errorElement.classList.add(validForm.errorClass); // меняем span
};

// удаляем ошибку
const deleteInputError = (validForm, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // находим одинаковый класс с id (id + span)
  inputElement.classList.remove(validForm.inputErrorClass);
  errorElement.classList.add(validForm.errorClass);
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
const setButtonActive = (validForm, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    disabledSubmitBtm(validForm, buttonElement);
  } else {
    activeSubmitBtm(validForm, buttonElement);
  }
};

// неактивная кнопка popup
const disabledSubmitBtm = (validForm, buttonElement) => {
  buttonElement.classList.add(validForm.inactiveButtonClass);
  buttonElement.disabled = true;
};

// активная кнопка popup
const activeSubmitBtm = (validForm, buttonElement) => {
  buttonElement.classList.remove(validForm.inactiveButtonClass);
  buttonElement.disabled = false;
};
// ----------------------------------------------------------------


// Отключаем отправку форм.
function disabledSubmit(evt) {
  evt.preventDefault();
};

// Функция isValid теперь принимает formElement и inputElement
const isValid = (validForm, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    setInputError(validForm, formElement, inputElement, inputElement.validationMessage);
  } else {
    deleteInputError(validForm, formElement, inputElement);
  }
};

// добавляем обработчик для всех полей формы
const setEventListeners = (validForm, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validForm.inputSelector)); //Находим все поля внутри формы, делаем из них массив через Array.from
  const buttonElement = formElement.querySelector(validForm.submitButtonSelector); // Находим в текущей форме кнопку отправки
  setButtonActive(validForm, inputList, buttonElement); //Вызываем setButtonActive, чтобы не ждать ввода данных в поля

  inputList.forEach((inputElement) => { //Обходим все элементы массива, полученного выше
    inputElement.addEventListener('input', function () { //Каждому полю добавляем обработчик события input
      isValid(validForm, formElement, inputElement); //Внутри колбэка вызываем isVslid, передав форму и инпут
      setButtonActive(validForm, inputList, buttonElement); //Вызываем setButtonActive и передача ей массива полей и кнопки
    });
  });
// Сбрасываем кнопку до неактивной
  formElement.addEventListener('reset', () => {
    disabledSubmitBtm(validForm, buttonElement);
  })
};


// перебераем все формы на странице
const enableValidation = (validForm) => {
  const formList = Array.from(document.querySelectorAll(validForm.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', disabledSubmit);
    setEventListeners(validForm, formElement);
  });
};

enableValidation(validForm);