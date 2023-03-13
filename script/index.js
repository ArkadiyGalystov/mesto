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
  
// slider
const sliderImg = document.querySelector('.popup__slider-image');// картинка на весь экран
const sliderText = document.querySelector('.popup__slider-text');// название под картинкой
const sliderClose = document.querySelector('#slider__close');

galleryImage.addEventListener("click", function () {
  openPopup(slider);
  sliderImg.src = cardData.link;
  sliderImg.alt = cardData.name;
  sliderText.textContent = cardData.name;
});

  galleryImage.src = cardData.link;
  galleryImage.alt = cardData.name;
  galleryTitle.textContent = cardData.name;

  // закрытие по клику profile
  sliderClose.addEventListener("click", function () {
  closePopup(slider);
});

  // ставим и убираем лайк
  galleryLike.addEventListener('click', () => {
    galleryLike.classList.toggle('gallery__item-like_active');
  });

  // удаление карточки с сайта
  galleryTrash.addEventListener('click', (evt) => {
    evt.target.closest('.gallery__item-card').remove();
  });

  return galleryItem;

};

const renderItemCard = (cardData) => {
  const newItem = createItemCard(cardData);
  gallery.prepend(newItem);
};

// Обход коробки с карточками для выгрузки на сайт
initialCards.forEach((cardData) => {
  renderItemCard(cardData);
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

//функция открытия popup`of
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupEsc);
  document.addEventListener('click', closePopupNowindows);
  inputName.value = profileTitle.textContent;
  inputSubname.value = profileSubtitle.textContent;
  popup.querySelector('.popup__form').reset(); // не могу ни как сообразить сброс кнопки
};

//функция закрытия popup`of
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupEsc);
  document.removeEventListener('click', closePopupNowindows);
};

// открытие по клику profile
openProfile.addEventListener("click", function () {
  openPopup(popupForm);
});

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
// сохранения profile
popupForm.addEventListener('submit', saveProfileForm);
// ----------------------------------------------------


// NewCard
const newCard = document.querySelector('#newcard');
const openCard = document.querySelector('.profile__add');
const closePopupNewCard = document.querySelector('#close-newcard');
const createCardForm = newCard.querySelector('.popup__form');

const buttonCreate = document.querySelector('.popup__input-button');
const titleCard = document.querySelector('.popup__input_type_title');
const imageTitle = document.querySelector('.popup__input_type_image');

// открытие по клику newcard
openCard.addEventListener("click", function () {
  openPopup(newCard);
});

// закрытие по клику newcard
closePopupNewCard.addEventListener("click", function () {
  closePopup(newCard);
});

// сохрание содержимого NewCard
function saveNewCard(evt) {
  evt.preventDefault();

  const newCardFoto = {
    name: titleCard.value,
    link: imageTitle.value
  };

  renderItemCard(newCardFoto);
  closePopup(newCard);
  createCardForm.reset();
};

newCard.addEventListener('submit', saveNewCard);

// закрытие popup на оверлей
const closePopupNowindows = (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  };
};

const closePopupEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupAll = document.querySelector(".popup_opened");
    closePopup(popupAll);
  };
};
