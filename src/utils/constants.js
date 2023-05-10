// модальные окна
const popup = document.querySelector(".popup"); // найдем все попапы на странице
const popupImage = document.querySelector(".popup-image"); // модальное докно картинки

// конпки открытия формы
const openProfile = document.querySelector(".profile__edit-button"); // кнопка открытия редактирования профиля
const openCard = document.querySelector(".profile__add-button"); //кнопка открытия добавления карточки
const openAvatar = document.querySelector('.profile__avatar_edit'); //кнопка открытия редактирования аватара
const submitBtn = document.querySelector('.form__submit-button_profile');

// формы окон
const formCards = document.querySelector(".form-cards"); // форма добавления карточек
const formProfile = document.querySelector(".form-profile"); // форма редактиования профиля
const formAvatar = document.querySelector('.form-avatar'); //форма изменения аватара пользователя

// данные окна Профиль и его редактирование
const nameProfileInput = document.querySelector(".form__item_user_name"); //поле ввода имени пользователя
const subtitleProfileInput = document.querySelector(".form__item_user_subtitle"); //поле ввода описания пользователя
const nameProfile = document.querySelector(".profile__name"); // имя пользователя
const subtitleProfile = document.querySelector(".profile__subtitle"); //описание пользователя

// инпуты окна добавления карточек
const titleCard = document.querySelector(".form__item_image_name"); // название картинки
const linkImageCard = document.querySelector(".form__item_image_link"); // ссылка на картинку

// сетка карточек
const gallery = document.querySelector(".cards"); // секция всех карточек
const likeNumber = document.querySelector('.card__like-number'); //для счетчика лайков
const likeButton = document.querySelector('.card__like'); //кнопка лайка

// Коробка с картами сайта
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  }
];

// включение валидации всех форм
const validForm = {
  formSelector: ".form",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_inactive",
  inputErrorClass: "form__item_error",
  errorClass: "form__item-error",
};

export {
  initialCards,
  validForm,
  openProfile,
  openCard,
  formCards,
  formProfile,
  nameProfileInput,
  subtitleProfileInput,
  gallery,
  openAvatar,
  formAvatar
}