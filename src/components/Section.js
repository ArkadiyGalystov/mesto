// класс Section, который отвечает за отрисовку элементов на странице
class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer; //создание и отрисовка данных на странице
    this._container = container; //добавляем созданные элементы
  }

  // публичный метод, который отвечает за отрисовку всех элементов
  renderItems(items) {
    items.forEach(item => { this._renderer(item) });
  };

  // метод addItem, который принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}

export { Section };