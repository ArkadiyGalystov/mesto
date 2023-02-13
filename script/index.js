// открытие и закрытие popup
const popupForm = document.querySelector('.popup');
const openPopup = document.querySelector('.profile__edit');
const closePopup = document.querySelector('.popup__close');
const buttonSave = document.querySelector('.popup__input-button');

// содержимое popup
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const inputName = document.querySelector('.popup__input_type_name');
const inputSubname = document.querySelector('.popup__input_type_about');

// открытие popup
function popupOn() {
  inputName.value = profileTitle.textContent;
  inputSubname.value = profileSubtitle.textContent;
  popupForm.classList.add('popup_opened');
};

// закрытие popup
function popupOff() {
  popupForm.classList.remove('popup_opened');
};

// сохрание содержимого
function saveForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputSubname.value;
  popupOff();

};

// обход по сайту popup
openPopup.addEventListener('click', popupOn);
closePopup.addEventListener('click', popupOff);
popupForm.addEventListener('submit', saveForm);

// открытие и закрытие card
const cardForm = document.querySelector('.card');
const openCard = document.querySelector('.profile__add');
const closeCart = document.querySelector('.card__close');
const buttonCreate = document.querySelector('.card__input-button');

// открытие card
function cardOn() {
  cardForm.classList.add('card_opened');
};

// закрытие card
function cardOff() {
  cardForm.classList.remove('card_opened');
};

// сохрание содержимого
function saveItem(evt) {
  evt.preventDefault();

  cardOff();
  /* cardForm.reset(); */

};

// обход по сайту card
openCard.addEventListener('click', cardOn);
closeCart.addEventListener('click', cardOff);
cardForm.addEventListener('submit', saveItem);