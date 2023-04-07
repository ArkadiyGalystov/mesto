import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards, validForm } from './cards.js';

//функция открытия popup`of
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupEsc);
};

//функция закрытия popup`of
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupEsc);
};

// ---------------------------------------------------------

// закрытие popup на оверлей
const popupList = Array.from(document.querySelectorAll('.popup')); // найдем все попапы на странице
popupList.forEach((popup) => { // итерируем массив. объявляя каждый попап в переменную popup
  popup.addEventListener('mouseup', (event) => { // на каждый попап устанавливаем слушателя события
    const targetClassList = event.target.classList; // запишем в переменную класс элемента, на котором произошло событие
    if (targetClassList.contains('popup') || targetClassList.contains('popup__close')) { // проверяем наличие класса попапа ИЛИ кнопки закрытия
      closePopup(popup); // если один из классов присутствует, то закрываем попап
    }
  })
});

// закрытие popup по клавише esc
const closePopupEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupAll = document.querySelector(".popup_opened");
    closePopup(popupAll);
  };
};

function resetButtonForm(form) {
  const buttonCreate = form.querySelector('.popup__input-button');
  if (buttonCreate.disabled === false) {
    buttonCreate.setAttribute('disabled', true);
    buttonCreate.classList.add('popup__input-button_noactive');
  };
}

// ---------------------------------------------------------

// редактирование блока Profile
const forms = document.querySelector('.form');
const popupForm = document.querySelector('#profile');
const openProfile = document.querySelector('.profile__edit');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const inputName = document.querySelector('.popup__input_type_name');
const inputSubname = document.querySelector('.popup__input_type_about');
const closePopupProfile = document.querySelector('#close-profile');

// открытие по клику profile
openProfile.addEventListener("click", function () {
  openPopup(popupForm);
});

inputName.value = profileTitle.textContent;
inputSubname.value = profileSubtitle.textContent;

// закрытие по клику profile
closePopupProfile.addEventListener("click", function () {
  closePopup(popupForm);
});

// сохрание содержимого Profile
function saveProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputSubname.value;
  closePopup(popupForm);
};

// сохранение формы profile
forms.addEventListener('submit', saveProfileForm);

// ---------------------------------------------------------

// добавление новых карточек NewCard
const newCard = document.querySelector('#newcard');
const openCard = document.querySelector('.profile__add');
const closePopupNewCard = document.querySelector('#close-newcard');
const createCardForm = newCard.querySelector('.popup__form');
const titleCard = document.querySelector('.popup__input_type_title');
const imageTitle = document.querySelector('.popup__input_type_image');

// открытие по клику newcard
openCard.addEventListener("click", function () {
  openPopup(newCard);
  newCard.querySelector('.popup__form').reset();
  resetButtonForm(newCard.querySelector('.popup__form'));

});

// закрытие по клику newcard
closePopupNewCard.addEventListener("click", function () {
  closePopup(newCard);
});

// добавление карточки на сайт и закрытие popup (сброс)
function saveNewCard(evt) {
  evt.preventDefault();

  const newCardFoto = {
    name: titleCard.value,
    link: imageTitle.value,
  };

  addNewCard(createCard(newCardFoto));
  closePopup(newCard);
}

createCardForm.addEventListener('submit', saveNewCard);

// ---------------------------------------------------------

// slider
const sliderImg = document.querySelector('.popup__slider-image');// картинка на весь экран
const sliderText = document.querySelector('.popup__slider-text');// название под картинкой

function sliderImages(name, link) {
  sliderImg.src = link;
  sliderText.alt = name;
  sliderText.textContent = name;

  openPopup(slider);
};

// ---------------------------------------------------------

const gallery = document.querySelector('.gallery__item'); // общий список карточек

// добавление новой карточки в начало блока
function addNewCard(item) {
  gallery.prepend(item);
}

// загрузка из массива
initialCards.forEach((item) => {
  addNewCard(createCard(item));
});

// создание новой карточки
function createCard(data) {
  const card = new Card(data, '#template', sliderImages);
  return card.generateCard();
}


// валидация форм
const validProfileForm = new FormValidator(validForm, forms);
validProfileForm.enableValidation();

const validNewCardForm = new FormValidator(validForm, createCardForm);
validNewCardForm.enableValidation();