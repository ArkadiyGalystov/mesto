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


// Выгружаем карточки из коробки (начало)
const gallery = document.querySelector('#template').content; // контент карточек (резерв)
const galleryItemCard = document.querySelector('.gallery__item'); // общий список карточек (сайт)


// Создание копий карточек
const itemCard = ({ name, link }) => {
  const item = gallery.querySelector('.gallery__item-card').cloneNode(true); // сама карточка (содержимое)
  const img = item.querySelector('.gallery__item-image'); // картинка
  const trash = item.querySelector('.gallery__item-trash'); // корзина удаления
  const h2 = item.querySelector('.gallery__item-title'); // название
  const like = item.querySelector('.gallery__item-like'); // лайк

  const slider = document.querySelector('.slider');
  const sliderClose = document.querySelector('.slider__close');

  const sliderImg = document.querySelector('.slider__image_popup');
  const sliderText = document.querySelector('.slider__text');

  img.src = link;
  img.alt = name;
  h2.textContent = name;
  
  // Появление карточки
  galleryItemCard.prepend(item);

  img.addEventListener('click', () => {
    slider.classList.add('slider_open');
    sliderImg.src = link;
    sliderImg.alt = name;
    sliderText.textContent = name;
  });

  sliderClose.addEventListener('click', () => {
    slider.classList.remove('slider_open');
  })

  // ставим и убираем лайк
  like.addEventListener('click', () => {
    like.classList.toggle('gallery__item-like_active');
  });

  // удаление карточки с сайта
  trash.addEventListener('click', (evt) => {
    evt.target.closest('.gallery__item-card').remove();
  });

}


// Обход коробки с карточками для выгрузки на сайт
const addItem = initialCards.forEach((name, link) => {
  itemCard(name, link);
});
// ----------------------------------------------------

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
// -------------------------------------------------


// открытие и закрытие card
const cardForm = document.querySelector('.card');// обложка
const openCard = document.querySelector('.profile__add');// крока откр
const closeCart = document.querySelector('.card__close');// крестик закр
const buttonCreate = document.querySelector('.card__input-button');// кнопка создать
const createCardForm = cardForm.querySelector('.card__form');// сброс формы

const titleCard = document.querySelector('.card__input_type_title');
const imageTitle = document.querySelector('.card__input_type_image');

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

  let newCardFoto = {  
    name: titleCard.value,
    link: imageTitle.value
  };

  itemCard(newCardFoto);
  cardOff();
  createCardForm.reset();

};

// обход по сайту card
openCard.addEventListener('click', cardOn);
closeCart.addEventListener('click', cardOff);
cardForm.addEventListener('submit', saveItem);
// -----------------------------------------------------