

// Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:
export class Card {
  // принимает в конструктор её данные и селектор её template-элемента;
  constructor(cardData, cardSelector){
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
  }
  _getTemplate(){
    const cardElement = document
    .querySelector(this._cardSelector)  // Шаблон карточки '.element-template'
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }
  // содержит приватные методы, которые работают с разметкой,
  createCard(){
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__image').style.backgroundImage =
    `url(${this._link})`;
    this._element.querySelector('.element__heading-text').textContent = this._name;

    return this._element;
  }
  // устанавливают слушателей событий;
  _setEventListeners(){
    // переключение лайка
    this._element.querySelector('.element__like-button')
      .addEventListener('click', () => {this._handleLike();
    });
    // удаление карточки
    this._element.querySelector('.element__delete-button')
      .addEventListener('click', () => {this._handleDelete();
    });
    // открытие изображения
    this._element.querySelector('.element__image')
      .addEventListener('click', () => {this._handleOpenModal(imageModal);
    });
  }
  // содержит приватные методы для каждого обработчика;
  // Обработчик переключения лайка
  _handleLike(){
    this._element.querySelector('.element__like-button')
      .classList.toggle('element__like-button_active');
  }
  // Обработчик удаления карточки
  _handleDelete(){
    this._element.querySelector('.element__delete-button')
      .closest('.element').remove();
  }
  // Обработчик открытия изображения
  _handleOpenModal(modal){
    modal.classList.add('popup_opened');
    modalPicture.src = this._link;
    modalCaption.textContent = this._name;
    document.addEventListener('keydown', escHandler); // слушатель ESC - добавление

  }
}

// содержит один публичный метод, который возвращает полностью работоспособный и
// наполненный данными элемент карточки.
/*  initialCards.forEach((item) => {
  // Для каждой карточки создайте экземпляр класса Card.
  const card = new Card(item, '.element-template');
  const cardElement = card.createCard();
  document.querySelector('.elements').prepend(cardElement); // list
}) */
