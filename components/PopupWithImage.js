import Popup from './Popup.js';

// класс PopupWithImage, который наследует от Popup.
export default class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupCaption = this._popup.querySelector('.popup__caption');

  }
  // Содержит публичные методы open и close, которые отвечают за открытие
  // и закрытие попапа.
open(name, link){
  this._popupCaption.textContent = name;
  this._popupImage.src = link;
  this._popupImage.alt = name;
  super.open();
}
}
// Этот класс должен перезаписывать родительский метод open.
// В методе open класса PopupWithImage нужно вставлять в попап картинку
// с src изображения и подписью к картинке.
