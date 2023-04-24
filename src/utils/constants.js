const popup = document.querySelector('.popup'); // найдем все попапы на странице
const popupImage = document.querySelector(".popup-image"); // модальное докно картинки

// конпки открытия формы
const openProfile = document.querySelector('.profile__edit'); // кнопка открытия редактирования профиля
const openCard = document.querySelector('.profile__add'); //кнопка открытия добавления карточки

// формы окон
const profileForm = document.forms["profile-form"]; // получаем форму по уникальному атрибуту из тега form
const cardForm = document.forms["card-form"]; // получаем форму по уникальному атрибуту из тега form

// данные окна Профиль и его редактирование
const profileInputName = document.querySelector('.popup__input_type_name'); //поле ввода имени пользователя
const profileInputSubname = document.querySelector('.popup__input_type_about'); //поле ввода описания пользователя
const profileTitle = document.querySelector('.profile__title'); // имя пользователя
const profileSubtitle = document.querySelector('.profile__subtitle'); //описание пользователя

// инпуты окна добавления карточек
const linkImageCard = document.querySelector('.popup__input_type_image'); // ссылка на картинку
const titleCard = document.querySelector('.popup__input_type_title'); // название картинки

// слайдер на все окно
const sliderImg = document.querySelector('.popup__slider-image'); // картинка на весь экран
const sliderText = document.querySelector('.popup__slider-text'); // название под картинкой

// сетка карточек
const gallery = document.querySelector('.gallery__item'); // общий список карточек

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

export {
  initialCards,
  validForm,
  openProfile,
  openCard,
  profileForm,
  cardForm,
  profileInputName,
  profileInputSubname,
  gallery
}