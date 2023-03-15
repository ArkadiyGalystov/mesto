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

  // закрытие по клику slider
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
const forms = document.querySelector('.form');
const popupForm = document.querySelector('#profile');
const openProfile = document.querySelector('.profile__edit');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const closePopupProfile = document.querySelector('#close-profile');

const inputName = document.querySelector('.popup__input_type_name');
const inputSubname = document.querySelector('.popup__input_type_about');

// не понимаю кто из вас прав, но долго не получалось убирать сброс кнопок.
// почитав чат и увидел студентов, у которых тоже такие проблемы.
// наставники советовали делать похожую схему. очищать форму и кнопку именно в этом файле.
function resetButtonForm(form) {
  const buttonCreate = form.querySelector('.popup__input-button');
  if (buttonCreate.disabled === false) {
    buttonCreate.setAttribute('disabled', true);
    buttonCreate.classList.add('popup__input-button_noactive');
  };
}

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

inputName.value = profileTitle.textContent;
inputSubname.value = profileSubtitle.textContent;

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
forms.addEventListener('submit', saveProfileForm);
// ----------------------------------------------------


// NewCard
const newCard = document.querySelector('#newcard');
const openCard = document.querySelector('.profile__add');
const closePopupNewCard = document.querySelector('#close-newcard');
const createCardForm = newCard.querySelector('.popup__form');
const newForm = document.querySelector('#new-form')

const buttonCreate = document.querySelector('.popup__input-button');
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

createCardForm.addEventListener('submit', saveNewCard);

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

const closePopupEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupAll = document.querySelector(".popup_opened");
    closePopup(popupAll);
  };
};
