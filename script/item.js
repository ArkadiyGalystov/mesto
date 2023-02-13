const initialCards = [
  {
    name: 'Домбай',
    link: 'images/dombai.png'
  },
  {
    name: 'Карачаевск',
    link: 'images/karachevsk.png'
  },
  {
    name: 'Гора Эльбрус',
    link: 'images/elbrus.png'
  },
  {
    name: 'Карачаево-Черкеск',
    link: 'images/karachevsk.png'
  },
  {
    name: 'Гора Эльбрус',
    link: 'images/elbrus.png'
  },
  {
    name: 'Домбай',
    link: 'images/dombai.png'
  }
];


const galleryItem = document.querySelector('.gallery__item');
const template = document.querySelector('#template');
const inputTitle = document.querySelector('.card__input_type_title');
const inputImage = document.querySelector('.card__input_type_image');

function addCard() {
  const cardContainer = document.createElement('li');
  cardContainer.classList.add('gallery__item-card');

  const imageCard = document.createElement('img');
  imageCard.classList.add('gallery__item-image');
  imageCard.src = inputImage.value;
  imageCard.alt = inputTitle.value;

  const buttonTrash = document.createElement('button');
  buttonTrash.classList.add('gallery__item-trash');
  buttonTrash.type = ('submit');

  const titleCard = document.createElement('h2');
  titleCard.classList.add('gallery__item-title');
  titleCard.textContent = inputTitle.value;

  const buttonLike = document.createElement('button');
  buttonLike.classList.add('gallery__item-like');
  buttonLike.type = ('submit');


  galleryItem.prepend(cardContainer);
  
  cardContainer.append(imageCard, buttonTrash, titleCard, buttonLike);

};

buttonCreate.addEventListener('click', function () {
  const titleCard = document.querySelector('.gallery__item-title');
  const imageCard = document.querySelector('.gallery__item-image');

  addCard(imageCard, titleCard);
});