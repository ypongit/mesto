// класс Card создаёт карточку с текстом и ссылкой на изображение:
export class Card {
  // принимает в конструктор её данные и селектор её template-элемента ()
  constructor(cardData, cardSelector, handleCardClick, handleDeleteClick, handleLikeClick){
    this._name = cardData.name;
    // this._name = cardData.card_name;
    this._link = cardData.link;
    // this._link = cardData.image_link;
    this._likes = cardData.likes;
    // console.log('this._likes ->', this._likes.length)
    this._id = cardData.id;
    this._userId = cardData.userId;
    this._ownerId = cardData.ownerId;
    // console.log('this._id ->', this._id)
    this._cardSelector = cardSelector;
    this._template = document.querySelector(this._cardSelector)
      .content.querySelector('.element');
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;

  }
  _getTemplate(){
    this._cardElement = this._template.cloneNode(true);
    this._likeButton = this._cardElement.querySelector('.element__like-button');
    this._deleteButton = this._cardElement.querySelector('.element__delete-button');
    this._cardImage = this._cardElement.querySelector('.element__image');
    this._cardTitle =  this._cardElement.querySelector('.element__heading-text');
    return this._cardElement;
  }
// подсчет количества лайков
  setLikes(newLikes){
    this._likes = newLikes;
    const likeCountElement = this._element.querySelector('.card__like-count');
    likeCountElement.textContent = this._likes.length; //

    // const userHasLikedCard = this._likes.find(user => user._id == this._userId);
    if (this.isLiked()){
      this._fillLike();
    } else {
      this._eraseLike();
    }

  }
// содержит приватные методы для каждого обработчика;
  // Обработчик переключения лайка
  _fillLike(){
    this._likeButton.classList.add('element__like-button_active');
  }
  _eraseLike(){
    this._likeButton.classList.remove('element__like-button_active');
  }
  // Функция создания карточки
  getView(){
    this._element = this._getTemplate();
    this._cardImage.style.backgroundImage = `url(${this._link})`;
    this._cardTitle.textContent = this._name;
    this._setEventListeners();
    this.setLikes(this._likes);

    if(this._ownerId != this._userId) {
      this._deleteButton.style.display = 'none';
    }

      /**/
    return this._element;
  }

  // устанавливают слушателей событий;
  _setEventListeners(){
    // переключение лайка
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._id);
    });
    // удаление карточки
    this._deleteButton.addEventListener('click', () =>
      this._handleDeleteClick(this._id)
      //this._handleDelete()
    );
    // открытие изображения
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  isLiked(){
    const userHasLikedCard = this._likes.find(user => user._id == this._userId);

    return userHasLikedCard
  }

  // Обработчик удаления карточки
  deleteCard(){
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

