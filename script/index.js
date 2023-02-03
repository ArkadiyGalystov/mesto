// открытие и закрытие popup
const popupForm = document.querySelector('.popup');
const openPopup = document.querySelector('.profile__edit');
const closePopup = document.querySelector('.popup__close');
const buttonSave = document.querySelector('.popup__input-button');

// содержимое popup
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const inputName = document.querySelector('.popup__input-name');
const inputSubname = document.querySelector('.popup__input-about');



// открытие popup
function popupOn() {
  inputName.value = profileTitle.textContent;
  inputSubname.value = profileSubtitle.textContent;
  popupForm.classList.add('popup__opened');
};

// закрытие popup
function popupOff() {
  popupForm.classList.remove('popup__opened');
};

// сохрание содержимого
function saveForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputSubname.value;
  popupOff();

};

// обход по сайту
openPopup.addEventListener('click', popupOn);
closePopup.addEventListener('click', popupOff);
buttonSave.addEventListener('click', saveForm);
