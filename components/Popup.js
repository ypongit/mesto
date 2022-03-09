// класс Popup, который отвечает за открытие и закрытие попапа.
export default class Popup {
// Этот класс:
// Принимает в конструктор единственный параметр — селектор попапа.
constructor (popupSelector){
  this._popup = popupSelector;
}
// Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
open(){
  this._popup.classList.add('popup_opened');
  this.setEventListeners();
}
close(){
  this._popup.classList.remove('popup_opened');
}
// Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
 _handleEscClose(evt){
   if(evt.key === 'Escape'){
     this.close();
   }
 }
// Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.

setEventListeners(){
  this._popup.querySelector('.popup__close').addEventListener('click', () => this.close());
  this._popup.closest('.popup').addEventListener('click', (evt) => {this._handleOverlayClose(evt);})
  document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
}
// Модальное окно также закрывается при клике на затемнённую область вокруг формы.
_handleOverlayClose(evt){
  if (evt.target  === evt.currentTarget){
    this.close();
  }
}
}
