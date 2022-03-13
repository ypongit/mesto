// класс Popup, который отвечает за открытие и закрытие попапа.
export default class Popup {
// Этот класс:
// Принимает в конструктор единственный параметр — селектор попапа.
constructor (popupSelector){
  this._popup = document.querySelector(popupSelector);
  this._handleEscClose = this._handleEscClose.bind(this);

}
// Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
open(){
  this._popup.classList.add('popup_opened');
  document.addEventListener('keydown', this._handleEscClose);
}
close(){
  this._popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', this._handleEscClose);
}
// Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
 _handleEscClose(evt){
   if(evt.key === 'Escape'){
     this.close();
   }
 }
// Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.

setEventListeners(){
  this._popup.querySelector('.popup__close').addEventListener('click',
    () => this.close());
  this._popup.closest('.popup').addEventListener('click',
    (evt) => {this._handleOverlayClose(evt);})

}
// Модальное окно также закрывается при клике на затемнённую область вокруг формы.
_handleOverlayClose(evt){
  if (evt.target  === evt.currentTarget){
    this.close();
  }
}
}
