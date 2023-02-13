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