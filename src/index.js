import { Api } from './components/Api.js';
import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js';
import { Section } from './components/Section.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { UserInfo } from './components/UserInfo.js';
import { PopupConfirmation } from './components/PopupConfirmation.js';

import '../src/pages/index.css';

import {
  initialCards,
  validForm,
  openProfile,
  openCard,
  profileForm,
  cardForm,
  profileInputName,
  profileInputSubname,
  gallery
} from './utils/constants.js';

// класс UserInfo, который отвечает за управление отображением информации о пользователе на странице
const user = new UserInfo({ nameSelector: '.profile__title', subtitleSelector: '.profile__subtitle'});
//-------------------------------------------------------------------------------------------------

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '66d4ecb9-cab0-4156-b439-f15da17be6f0',
    'Content-Type': 'application/json'
  }
})

Promise.all([api.getUserInfoApi(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    user.setUserInfo(userData);
    cardsList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err)
  });

// попап просмотра изображения
const popupViewImage = new PopupWithImage('.popup-image')
popupViewImage.setEventListeners();

function sliderImages(name, link) {
  popupViewImage.open(name, link);
}
//-------------------------------------------------------------------------------------------------

// попап подтверждения удаления карточки
const popupConfirm = new PopupConfirmation('#delete-card')
popupConfirm.setEventListeners();
//-------------------------------------------------------------------------------------------------

// для записи и нформации в инпуты профиля
function inputsProfileInfo({ name, about }) {
  profileInputName.value = name;
  profileInputSubname.value = about;
}
//-------------------------------------------------------------------------------------------------

// редкатирования профиля
const popupProfile = new PopupWithForm('#profile', (inputs) => {
  popupProfile.renderLoading(true, 'Сохраняем...')
  api.editUserInfo(inputs)
   .then((inputs) => {
     user.setUserInfo(inputs);
     popupProfile.close();
     console.log(inputs)
   })
   .catch((err) => {
     console.log(err)
   })
   .finally(() => {
     popupProfile.renderLoading(false, 'Сохранить')
   })
 });
 popupProfile.setEventListeners();

 openProfile.addEventListener('click', () => { //открытие попап профиля
  const userInfoProfile = user.getUserInfo();
  inputsProfileInfo({
    name: userInfoProfile.name,
    about: userInfoProfile.about
  });
  popupProfile.open();
  validProfileForm.disabledSubmit();
})
 //-------------------------------------------------------------------------------------------------

// создание новой карточки
const createCard = (data) => {
  const card = new Card({
    data: data,
    userId: user.getUserId(),
    viewPopupImage: () => {
      sliderImages(data);
    },
    handleCardDelete: () => {
      popupConfirm.open();
      popupConfirm.setSubmit(() => {
        api.removeCardApi(card.getId())
          .then(() => {
            card.removeCard();
            popupConfirm.close();
          })
          .catch((err) => {
            console.log(err)
          })
      })
    },
    handleCardLike: () => {
      api.addCardLike(card.getId())
        .then((data) => {
          card.cardLiked(data);
        })
        .catch((err) => {
          console.log(err)
        });
    },
    handleRemoveLike: () => {
      api.removeCardLike(card.getId())
        .then((data) => {
          card.cardLiked(data)
        })
        .catch((err) => {
          console.log(err)
        });
    }}, '#template');
  return card.generateCard();
}
//-------------------------------------------------------------------------------------------------

// класс Section, который отвечает за отрисовку элементов на странице
const cardsList = new Section({ renderer: (item) => {
  cardsList.addItem(createCard(item));
}}, gallery);
//-------------------------------------------------------------------------------------------------

// добавление карточки
const popupAdd = new PopupWithForm('#newcard', (data) => {
  popupAdd.renderLoading(true, 'Создаем...');
  api.addCards(data)
    .then((data) => {
      cardsList.addItem(createCard(data))
      popupAdd.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupAdd.renderLoading(false, 'Создать')
    })
})
popupAdd.setEventListeners();

openCard.addEventListener('click', () => {
  popupAdd.open();
  validNewCardForm.disabledSubmit();
})
//-------------------------------------------------------------------------------------------------

 // валидация форм
const validProfileForm = new FormValidator(validForm, profileForm);
validProfileForm.enableValidation();

const validNewCardForm = new FormValidator(validForm, cardForm);
validNewCardForm.enableValidation();