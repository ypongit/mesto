// класс Section, отвечает за отрисовку элементов на странице, которые возвращает класс "Card".
// Этот класс:
// Первым параметром конструктора принимает объект с двумя свойствами: items и renderer.
export default class Section {
// Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса.
// Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
// Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.
  constructor ({items, renderer}, containerSelector){
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector); // .elements
  }

// Содержит публичный метод, который отвечает за отрисовку всех элементов.
// Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
renderItems(){
  this._renderedItems.forEach((item) => {
    this._renderer(item, this._container);
  })
}
// Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
  addItem(element){
    this._container.prepend(element);
  }
}
// У класса Section нет своей разметки. Он получает разметку через функцию-колбэк (class Card) и вставляет её в контейнер.
// new Section( { items: [{name: '', link: '' }, {name: '', link: '' } ], renderer: () => { wrap.prepend (...)}}, '.list' )
