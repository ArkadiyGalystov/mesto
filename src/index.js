import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js';
import { Section } from './components/Section.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { UserInfo } from './components/UserInfo.js';

import '../src/pages/index.css';

import {
  initialCards,
  validForm,
  openProfile,
  openCard,
  profileForm,
  cardForm,
  profileInputName,
  profileInputSubname,
  gallery
} from './utils/constants.js';

// класс UserInfo, который отвечает за управление отображением информации о пользователе на странице
const user = new UserInfo({ nameSelector: '.profile__title', subtitleSelector: '.profile__subtitle'});
//-------------------------------------------------------------------------------------------------

// класс Section, который отвечает за отрисовку элементов на странице
const cardsList = new Section({ items: initialCards, renderer: (item) => {
  cardsList.addItem(createCard(item));
}}, gallery);

cardsList.renderItems();
//-------------------------------------------------------------------------------------------------

// редкатирования профиля
const popupProfile = new PopupWithForm('#profile', (inputs) => {
  user.setUserInfo(inputs);
  popupProfile.close();
});
popupProfile.setEventListeners();

function popupProfileOpen({ name, subtitle}) {
  profileInputName.value = name;
  profileInputSubname.value = subtitle;

  popupProfile.open();
};

openProfile.addEventListener('click', () => {
  popupProfileOpen(user.getUserInfo());
  validProfileForm.disabledSubmit(); // сброс кнопки Profile из FormValidator
});
//-------------------------------------------------------------------------------------------------

// добавление карточки
const popupAdd = new PopupWithForm('#newcard', ({ name, link }) => {
  cardsList.addItem(createCard({ name, link }));
  popupAdd.close();
})
popupAdd.setEventListeners();

openCard.addEventListener('click', () => {
  popupAdd.open();
  cardForm.reset(); // сброс формы без отправки при закрытии
  validNewCardForm.disabledSubmit(); // сброс кнопки NewCard из FormValidator
});
//-------------------------------------------------------------------------------------------------

// попап просмотра изображения
const popupViewImage = new PopupWithImage('.popup-image')
popupViewImage.setEventListeners();

function sliderImages(name, link) {
  popupViewImage.open(name, link);
}
//-------------------------------------------------------------------------------------------------

// создание новой карточки
function createCard(data) {
  const card = new Card(data, '#template', sliderImages);
  return card.generateCard();
}

// валидация форм
const validProfileForm = new FormValidator(validForm, profileForm);
validProfileForm.enableValidation();

const validNewCardForm = new FormValidator(validForm, cardForm);
validNewCardForm.enableValidation();
