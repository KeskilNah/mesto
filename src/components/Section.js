export default class Section {
  constructor( {renderer}, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = containerSelector;
    this._container = document.querySelector(this._containerSelector);
  }

  addItem(card) { // принимает DOM-элемент и добавляет его в контейнер.
    this._container.prepend(this._renderer(card));
  }
  
  renderItems(items) { // отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента 
    items.forEach(item => {
      this.addItem(item);
    })
  }
}

// Создайте класс Section, который отвечает за отрисовку элементов на странице. Этот класс:
// Первым параметром конструктора принимает объект с двумя свойствами: items и renderer. Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса. Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
// Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.
// Содержит публичный метод, который отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
// Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
// У класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.