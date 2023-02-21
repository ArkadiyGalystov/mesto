// Выгружаем карточки из коробки (начало)
const galleryItemTemplate = document.querySelector('#template').content; // контент карточек (резерв)
const gallery = document.querySelector('.gallery__item'); // общий список карточек (сайт)


// Создание копий карточек
const renderItemCard = ({ name, link }) => {
  const item = galleryItemTemplate.querySelector('.gallery__item-card').cloneNode(true); // сама карточка (содержимое)
  const img = item.querySelector('.gallery__item-image'); // картинка
  const trash = item.querySelector('.gallery__item-trash'); // корзина удаления
  const cardTitle = item.querySelector('.gallery__item-title'); // название
  const like = item.querySelector('.gallery__item-like'); // лайк

  const slider = document.querySelector('.slider');
  const sliderClose = document.querySelector('.slider__close');

  const sliderImg = document.querySelector('.slider__image-popup');
  const sliderText = document.querySelector('.slider__text');

  img.src = link;
  img.alt = name;
  cardTitle.textContent = name;

  // Появление карточки
  gallery.prepend(item);

  img.addEventListener('click', () => {
    slider.classList.add('slider_open');
    sliderImg.src = link;
    sliderImg.alt = name;
    sliderText.textContent = name;
  });

  function slideroff() {
    slider.classList.remove('slider_open');
  }

  // ставим и убираем лайк
  like.addEventListener('click', () => {
    like.classList.toggle('gallery__item-like_active');
  });

  // удаление карточки с сайта
  trash.addEventListener('click', (evt) => {
    evt.target.closest('.gallery__item-card').remove();
  });

  sliderClose.addEventListener('click', slideroff);

}

function createItemCard() {
  const cardContainer = document.createElement('li');
  cardContainer.classList.add('gallery__item-card');

  const cardImage = document.createElement('img');
  cardImage.classList.add('gallery__item-image');
  cardImage.src = inputImage.value;
  cardImage.alt = inputTitle.value;

  const buttonTrash = document.createElement('button');
  buttonTrash.classList.add('gallery__item-trash');
  buttonTrash.type = ('submit');

  const titleNameCard = document.createElement('h2');
  titleNameCard.classList.add('gallery__item-title');
  titleNameCard.textContent = inputTitle.value;

  const cardLike = document.createElement('button');
  cardLike.classList.add('gallery__item-like');
  cardLike.type = ('submit');

  
  cardContainer.createItemCard(cardImage, buttonTrash, titleNameCard, cardLike);
}

// Обход коробки с карточками для выгрузки на сайт
const addInitialItems = initialCards.forEach((name, link) => {
  renderItemCard(name, link);
});
// ----------------------------------------------------


// Profile
const popupForm = document.querySelector('#profile');
const openPopup = document.querySelector('.profile__edit');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const closePopupProfile = document.querySelector('#close-profile');

const inputName = document.querySelector('.popup__input_type_name');
const inputSubname = document.querySelector('.popup__input_type_about');

// открытие Profile
function profileOn() {
  inputName.value = profileTitle.textContent;
  inputSubname.value = profileSubtitle.textContent;
  popupForm.classList.add('popup_opened');
};

// закрытие Profile
function profileOff() {
  popupForm.classList.remove('popup_opened');
};

// сохрание содержимого
function saveProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputSubname.value;
  profileOff();

};

openPopup.addEventListener('click', profileOn);// отслеживание клика profile (открыть)
closePopupProfile.addEventListener('click', profileOff);// отслеживание клика profile (закрыть)
popupForm.addEventListener('submit', saveProfileForm);
// -----------------------------------------------------


// NewCard
const newCard = document.querySelector('#newcard');
const openCard = document.querySelector('.profile__add');
const closePopupNewCard = document.querySelector('#close-newcard');
const createCardForm = newCard.querySelector('.popup__form');

const buttonCreate = document.querySelector('.popup__input-button');
const titleCard = document.querySelector('.popup__input_type_title');
const imageTitle = document.querySelector('.popup__input_type_image');


// открытие NewCard
function newCardOn() {
  newCard.classList.add('popup_opened');
};

// закрытие NewCard
function newCardOff() {
  newCard.classList.remove('popup_opened');
};

// сохрание содержимого
function saveItem(evt) {
  evt.preventDefault();

  const newCardFoto = {
    name: titleCard.value,
    link: imageTitle.value
  };

  renderItemCard(newCardFoto);
  newCardOff();
  createCardForm.reset();

};

openCard.addEventListener('click', newCardOn);// отслеживание клика newCard (открыть)
closePopupNewCard.addEventListener('click', newCardOff);// отслеживание клика newCard (закрыть)
newCard.addEventListener('submit', saveItem);