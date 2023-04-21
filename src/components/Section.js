// класс Section, который отвечает за отрисовку элементов на странице
class Section {
  constructor({ items, renderer }, container) {
    this._items = items; // массив данных, которые нужно добавить на страницу при инициализации класса
    this._renderer = renderer; //функция, которая отвечает за создание и отрисовку данных на странице
    this._container = container; //сюда добавляются созданные элементы
  }

  renderItems() {
    // публичный метод, который отвечает за отрисовку всех элементов
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    // публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер
    this._container.prepend(element);
  }
}

export { Section };