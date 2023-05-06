class Card {
  constructor(
    {
      data,
      userId,
      popupViewImage,
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

    this._popupViewImage = popupViewImage;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    this._handleRemoveLike = handleRemoveLike;

    this._templateSelector = templateSelector;
  }

  /** берем разметку из HTML, клонируем элемент и  везвращаем DOM-элемент карточки */
  /** добавляем классу метод _getTemplate, который: */
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector) // найдёт template-элемент (используем селектор, который передаем их index.js при создании карточки. Конструктор становится универсальным для разных template-элементов)
      .content.querySelector('#card') // извлечет его содержимое и в содержимом найдёт элемент с классом card
      .cloneNode(true); // клонирует его

    return cardElement; // вернёт клонированный элемент
  }

  getId() {
    return this._id;
  }

  /** лайк карточки */
  cardLiked(data) {
    this._likes = data.likes;
    this._elementLike.classList.toggle('.gallery__item-like_active');
    this._likesCounter.textContent = this._likes.length;
  }

  /** удаление карточки */
  removeCard() {
    this._element.remove();
    this._element = null;
  }

  /** состояние лайка в зависимости от того активна его иконка или нет */
  _changeLikeState() {
    if (this._elementLike.classList.contains('.gallery__item-like_active')) {
      this._handleRemoveLike(this._id);
    } else {
      this._handleCardLike(this._id);
    }
  }

  /** проверяем юзера, чтобы отобразить/или нет кнопку кдаления карточки */
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
      this._elementLike.classList.add('.gallery__item-like_active');
    }
  }

  /** метод добавления всех обработчиков в одном месте*/
  _setEventListeners() {
    this._elementImage.addEventListener("click", () => {
      this._popupViewImage();
    });

    this._elementLike.addEventListener("click", () => {
      this._changeLikeState();
    });

    this._elementTrash.addEventListener("click", () => {
      this._handleCardDelete();
    });
  }

  /** добавляем классу метод, который вставит данные в разметку и подготовит карточку к публикации */
  generateCard() {
    this._element = this._getTemplate(); // запишем в разметку приватное поле _cardElement (у др.элементов появится доступ к ней)

    /** добавим данные */
    this._elementImage = this._element.querySelector('.gallery__item-image');
    this._elementName = this._element.querySelector('.gallery__item-title');
    this._elementLike = this._element.querySelector('.gallery__item-like');
    this._elementTrash = this._element.querySelector('.gallery__item-trash');
    this._likesCounter = this._element.querySelector('.gallery__item-like');

    /** навешиваем обработчики */
    this._setEventListeners();
    this._checkUserDeleteState();
    this._isCardLiked();

    /** передаем данные в карточку */
    this._elementImage.src = this._link;
    this._elementImage.alt = this._link;
    this._elementName.textContent = this._name;
    this._likesCounter.textContent = this._likes.length;

    return this._element; // вернем наружу
  }
}

export { Card };
