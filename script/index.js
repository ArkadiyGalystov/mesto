// Выгружаем карточки из коробки (начало)
const gallery = document.querySelector('.gallery__item'); // общий список карточек (сайт)
const galleryTemplate = document.querySelector('#template').content; // контент карточек


// Создание копий карточек
const createItemCard = (cardData) => {
  const galleryItem = galleryTemplate.querySelector('.gallery__item-card').cloneNode(true); // сама карточка (содержимое)
  const galleryImage = galleryItem.querySelector('.gallery__item-image'); // картинка
  const galleryTrash = galleryItem.querySelector('.gallery__item-trash'); // корзина удаления
  const galleryTitle = galleryItem.querySelector('.gallery__item-title'); // название
  const galleryLike = galleryItem.querySelector('.gallery__item-like'); // лайк

  const sliderImg = document.querySelector('.popup__slider-image');// картинка на весь экран
  const sliderText = document.querySelector('.popup__slider-text');// название под картинкой

  galleryImage.addEventListener('click', () => {
    slider.classList.add('slider_open');
    sliderImg.src = cardData.link;
    sliderImg.alt = cardData.name;
    sliderText.textContent = cardData.name;
  });

  galleryImage.src = cardData.link;
  galleryImage.alt = cardData.name;
  galleryTitle.textContent = cardData.name;

  // ставим и убираем лайк
  galleryLike.addEventListener('click', () => {
    galleryLike.classList.toggle('gallery__item-like_active');
  });

  // удаление карточки с сайта
  galleryTrash.addEventListener('click', (evt) => {
    evt.target.closest('.gallery__item-card').remove();
  });
  gallery.prepend(galleryItem);
}

const renderItemCard = (cardData) => {
  const galleryTemplate = createItemCard(cardData);
  gallery.prepend(galleryTemplate);
}

// Обход коробки с карточками для выгрузки на сайт
const addInitialItems = initialCards.forEach((cardData) => {
  createItemCard(cardData);
});

// ----------------------------------------------------

// Profile
const popupForm = document.querySelector('#profile');
const openProfile = document.querySelector('.profile__edit');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const closePopupProfile = document.querySelector('#close-profile');

const inputName = document.querySelector('.popup__input_type_name');
const inputSubname = document.querySelector('.popup__input_type_about');

// открытие Profile
function profileUp() {
  popupForm.classList.add('popup_opened');
  inputName.value = profileTitle.textContent;
  inputSubname.value = profileSubtitle.textContent;
};

// закрытие Profile
function profileOff() {
  popupForm.classList.remove('popup_opened');
};

// сохрание содержимого Profile
function saveProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputSubname.value;
  profileOff();

};

openProfile.addEventListener('click', profileUp);// отслеживание клика profile (открыть)
closePopupProfile.addEventListener('click', profileOff);// отслеживание клика profile (закрыть)
popupForm.addEventListener('submit', saveProfileForm);
// ----------------------------------------------------------------------------------------------

// NewCard
const newCard = document.querySelector('#newcard');
const openCard = document.querySelector('.profile__add');
const closePopupNewCard = document.querySelector('#close-newcard');
const createCardForm = newCard.querySelector('.popup__form');

const buttonCreate = document.querySelector('.popup__input-button');
const titleCard = document.querySelector('.popup__input_type_title');
const imageTitle = document.querySelector('.popup__input_type_image');

// открытие NewCard
function newCardUp() {
  newCard.classList.add('popup_opened');
};

// закрытие NewCard
function newCardOff() {
  newCard.classList.remove('popup_opened');
};

// сохрание содержимого NewCard
function saveNewCard(evt) {
  evt.preventDefault();

  const newCardFoto = {
    name: titleCard.value,
    link: imageTitle.value
  };

  createItemCard(newCardFoto);
  newCardOff();
  createCardForm.reset();

};

openCard.addEventListener('click', newCardUp);// отслеживание клика newCard (открыть)
closePopupNewCard.addEventListener('click', newCardOff);// отслеживание клика newCard (закрыть)
newCard.addEventListener('submit', saveNewCard);
// ----------------------------------------------------------------------------------------------

const sliderClose = document.querySelector('#slider__close');

// закрытие slider
function slideroff() {
  slider.classList.remove('slider_open');
}

sliderClose.addEventListener('click', slideroff);// отслеживание клика slider (закрыть)