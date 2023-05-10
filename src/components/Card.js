class Card {
  constructor(
    {
      data,
      userId,
      viewPopupImage,
      handleCardDelete,
      handleCardLike,
      handleRemoveLike,
    }, templateSelector) {
      
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._userId = userId;
    this._owner = data.owner._id;
    this._likes = data.likes;

    this._viewPopupImage = viewPopupImage;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    this._handleRemoveLike = handleRemoveLike;

    this._templateSelector = templateSelector;
  }

  // берем разметку из HTML, клонируем элемент и  везвращаем DOM-элемент карточки
    _getTemplate() {// добавляем классу метод _getTemplate
    const cardElement = document
      .querySelector(this._templateSelector) //универсальным методом найдем template-элемент, который передаем их index.js при создании карточки
      .content.querySelector(".card") // извлечет его содержимое и в содержимом найдёт элемент с классом card
      .cloneNode(true); // клонируем карты (элементы)

    return cardElement; // вернём клонированный элемент на сайт
  }

  getId() {
    return this._id;
  }

  // ставим лайк на карточке
  cardLiked(data) {
    this._likes = data.likes;
    this._elementLike.classList.toggle("card__like_active");
    this._likesCounter.textContent = this._likes.length;
  }

 //удаляем лайк с карточки
  removeCard() {
    this._element.remove();
    this._element = null;
  }

  // состояние лайка (активный или нет)
  _changeLikeState() {
    if (this._elementLike.classList.contains("card__like_active")) {
      this._handleRemoveLike(this._id);
    } else {
      this._handleCardLike(this._id);
    }
  }

  // проверка пользователя на удаление карточки
  _checkUserDeleteState() {
    if (this._owner !== this._userId) {
      this._elementTrash.remove();
    }
  }

  _isCardLiked() {
    if (
      this._likes.some((user) => {
        return this._userId === user._id;
      })
    ) {
      this._elementLike.classList.add("card__like_active");
    }
  }

  // все обработчики
  _setEventListeners() {
    this._elementImage.addEventListener("click", () => {
      this._viewPopupImage();
    });

    this._elementLike.addEventListener("click", () => {
      this._changeLikeState();
    });

    this._elementTrash.addEventListener("click", () => {
      this._handleCardDelete();
    });
  }

  // добавляем классу метод, который подготовит карточку к публикации
  generateCard() {
    this._element = this._getTemplate(); // запишем в разметку приватное поле _cardElement (у др.элементов появится доступ к ней)

    /** добавим данные */
    this._elementImage = this._element.querySelector(".card__pic");
    this._elementName = this._element.querySelector(".card__name");
    this._elementLike = this._element.querySelector(".card__like");
    this._elementTrash = this._element.querySelector(".card__trash");
    this._likesCounter = this._element.querySelector(".card__like-number");

    // обработчики
    this._setEventListeners();
    this._checkUserDeleteState();
    this._isCardLiked();

    // данные в карточке
    this._elementImage.src = this._link;
    this._elementImage.alt = this._link;
    this._elementName.textContent = this._name;
    this._likesCounter.textContent = this._likes.length;

    return this._element; // выгружаем
  }
}

export { Card };
