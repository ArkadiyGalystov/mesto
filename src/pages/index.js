import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupConfirmation } from '../components/PopupConfirmation.js';
import { Api } from '../components/Api.js';

import './index.css';

import 
{
  initialCards,
  validForm,
  openProfile,
  openCard,
  formCards,
  formProfile,
  nameProfileInput,
  subtitleProfileInput,
  gallery,
  openAvatar,
  formAvatar
} from '../utils/constants.js';

// класс Section, который отвечает за отрисовку элементов на странице
const cardsList = new Section({ renderer: (item) => {
  cardsList.addItem(createCard(item));
}}, gallery);
//-------------------------------------------------------------------------------------------------

// класс UserInfo, который отвечает за управление отображением информации о пользователе на странице
const user = new UserInfo({ 
  nameSelector: '.profile__name', 
  subtitleSelector: '.profile__subtitle', 
  avatarSelector: '.profile__avatar'
});
//-------------------------------------------------------------------------------------------------

// редактирование аватара пользователя
const popupAvatar = new PopupWithForm('.popup-avatar', (data) => {
  popupAvatar.renderLoading(true, 'Сохраняем...');
  api.editUserAvatar(data)
    .then((res) => {
      user.setUserInfo(res);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupAvatar.renderLoading(false, 'Сохранить')
    })
})
popupAvatar.setEventListeners();

openAvatar.addEventListener('click', () => { //для открытия попап аватара
  popupAvatar.open();
})
//-------------------------------------------------------------------------------------------------

// редактирования профиля
const popupProfile = new PopupWithForm('.popup-profile', (inputs) => {
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

 // для записи и нформации в инпуты профиля
function inputsProfileInfo({ name, subtitle }) {
  nameProfileInput.value = name;
  subtitleProfileInput.value = subtitle;
}
 
 //открытие попап профиля
 openProfile.addEventListener('click', () => {
   const userInfoProfile = user.getUserInfo();
   inputsProfileInfo({
     name: userInfoProfile.name,
     subtitle: userInfoProfile.subtitle
   });
   popupProfile.open();
   profileValidation.disablesSubmitForm();
 })
 //-------------------------------------------------------------------------------------------------

// создание новой карточки
const createCard = (data) => {
  const card = new Card({
    data: data,
    userId: user.getUserId(),
    viewPopupImage: () => {
      viewPopupImagePic(data);
    },
    handleCardDelete: () => {
      popupConfirm.open();
      popupConfirm.setSubmit(() => {
        popupConfirm.renderLoading(true, 'Удаляем...');
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
    }}, '#card__template');
  return card.generateCard();
}
//-------------------------------------------------------------------------------------------------

// подтверждение удаления карточки
const popupConfirm = new PopupConfirmation('.popup-delete')
popupConfirm.setEventListeners();
//-------------------------------------------------------------------------------------------------

// попап добавления карточки
const popupAdd = new PopupWithForm('.popup-newcard', (data) => {
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

//для открытия попап добавления карточоки
openCard.addEventListener('click', () => {
  popupAdd.open();
  formCardValidation.disablesSubmitForm();
})
//-------------------------------------------------------------------------------------------------

// попап просмотра изображения
const popupViewImage = new PopupWithImage('.popup-image')
popupViewImage.setEventListeners();

function viewPopupImagePic(name, link) { //открытие попап просмотра изображения
  popupViewImage.open(name, link);
}
//-------------------------------------------------------------------------------------------------

// класс Api
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '66d4ecb9-cab0-4156-b439-f15da17be6f0',
    'Content-Type': 'application/json'
  }
})
//-------------------------------------------------------------------------------------------------

Promise.all([api.getUserInfoApi(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    user.setUserInfo(userData);
    cardsList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err)
  });
  //-------------------------------------------------------------------------------------------------

// валидация форм
const profileValidation = new FormValidator(validForm, formProfile);
profileValidation.enableValidation();

const formCardValidation = new FormValidator(validForm, formCards);
formCardValidation.enableValidation();

const formAvatarValidation = new FormValidator(validForm, formAvatar);
formAvatarValidation.enableValidation();