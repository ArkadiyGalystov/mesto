class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
  }

  // добавляем классу метод _getTemplate
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector) // найдёт template-элемент (используем селектор, который передаем их index.js при создании карточки.
      .content.querySelector('#card') // извлечет его содержимое и в содержимом найдёт элемент с классом card
      .cloneNode(true); // клонируем

    return cardElement; // вызываем клонированный элемент
  }

  // добавляем классу метод, который вставит данные в разметку и подготовит карточку к публикации
  generateCard() {
    this._element = this._getTemplate(); // запишем в разметку приватное поле _cardElement (у др.элементов появится доступ к ней)

    /** добавим данные */
    this._elementImage = this._element.querySelector('.gallery__item-image');
    this._elementName = this._element.querySelector('.gallery__item-title');
    this._elementLike = this._element.querySelector('.gallery__item-like');
    this._elementTrash = this._element.querySelector('.gallery__item-trash');

    this._setEventListeners();

    this._elementImage.src = this._link;
    this._elementImage.alt = this._link;
    this._elementName.textContent = this._name;

    return this._element; // вызываем
  }

  // ставим и убираем лайк
  _toggleLike() {
    this._elementLike.classList.toggle('gallery__item-like_active');
  }

  // удаление карточки
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // метод добавления всех обработчиков в одном месте
  _setEventListeners() {
    this._elementImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    this._elementLike.addEventListener("click", () => this._toggleLike());
    this._elementTrash.addEventListener("click", () => this._deleteCard());
  }
}

export { Card };