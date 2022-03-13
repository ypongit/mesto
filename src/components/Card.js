// класс Card создаёт карточку с текстом и ссылкой на изображение:
export class Card {
  // принимает в конструктор её данные и селектор её template-элемента ()
  constructor(cardData, cardSelector, handleCardClick){
    // this._name = cardData.name;
    this._name = cardData.card_name;
    // this._link = cardData.link;
    this._link = cardData.image_link;
    this._cardSelector = cardSelector;
    this._template = document.querySelector(this._cardSelector)
      .content.querySelector('.element');
    this._handleCardClick = handleCardClick;
  }
  _getTemplate(){
    this._cardElement = this._template.cloneNode(true);
    this._likeButton = this._cardElement.querySelector('.element__like-button');
    this._deleteButton = this._cardElement.querySelector('.element__delete-button');
    this._cardImage = this._cardElement.querySelector('.element__image');
    this._cardTitle =  this._cardElement.querySelector('.element__heading-text');
    return this._cardElement;
  }
  // Функция создания карточки
  getView(){
    this._element = this._getTemplate();
    this._cardImage.style.backgroundImage = `url(${this._link})`;
    this._cardTitle.textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  // устанавливают слушателей событий;
  _setEventListeners(){
    // переключение лайка
    this._likeButton.addEventListener('click', () => {this._handleLike()
    });
    // удаление карточки
    this._deleteButton.addEventListener('click', () => {this._handleDelete();
    });
    // открытие изображения
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  // содержит приватные методы для каждого обработчика;
  // Обработчик переключения лайка
  _handleLike(){
    this._likeButton.classList.toggle('element__like-button_active');
  }
  // Обработчик удаления карточки
  _handleDelete(){
    this._cardElement.remove();
  }
  // Обработчик открытия изображения
  /* _handleOpenModal(modal){
    openModal(modal);
    modalPicture.src = this._link;
    modalPicture.alt = this._name;
    modalCaption.textContent = this._name;
  } */
}

