// Коробка с картами сайта
const initialCards = [
  {
    name: 'Франция',
    link: 'images/france.jpg'
  },
  {
    name: 'Германия',
    link: 'images/germany.jpg'
  },
  {
    name: 'Казахстан',
    link: 'images/kazakhstan.jpg'
  },
  {
    name: 'Португалия',
    link: 'images/portugal.jpg'
  },
  {
    name: 'Индонезия',
    link: 'images/indonésie.jpg'
  },
  {
    name: 'Швейцария',
    link: 'images/switzerland.jpg'
  }
];

// включение валидации всех форм
const validForm = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__input-button',
  inactiveButtonClass: 'popup__input-button_noactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__form-error',
};

export { initialCards, validForm };