import Popup from './Popup.js';

// класс PopupWithForm, который наследует от Popup.
export default class PopupWithForm extends Popup {
// класс: Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
constructor ({popupSelector, handleFormSubmit}){
  super(popupSelector);
 this._handleFormSubmit = handleFormSubmit;
   // this._handleFormSubmit(evt, this._getInputValues) = handleFormSubmit;
  this._form = this._popup.querySelector('.popup__main-container');
  this._inputList = Array.from(this._form.querySelectorAll('.popup__field'));
}
// Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
_getInputValues(){
  // this._inputList = Array.from(this._form.querySelectorAll('.popup__field'));
  this._formValues = {};
  this._inputList.forEach(input => {
    this._formValues[input.name] = input.value;
  });
  return this._formValues;
}
renderLoading(isLoading, evt){
  if (isLoading){
    console.log('renderLoading submitter ->', evt);
    evt.submitter.textContent = "Сохранение..."
    // Array.from(submitButton).forEach((submit) => {
    //   submit.value = "Сохранение..."
    // })
 } else {
    console.log(evt);
    evt.submitter.textContent = "Сохранить";
    //  Array.from(submitButton).forEach((submit) => {
    //   submit.value = "Сохранить";
    // })
  }
}
changeSubmitHandler(newSubmitHandler){
  this._handleFormSubmit = newSubmitHandler;
}
// Перезаписывает родительский метод setEventListeners.
// Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия,
// но и добавлять обработчик сабмита формы.
setEventListeners(){
  super.setEventListeners();
  this._form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    //this.renderLoading(true, evt);
    /* const renderEvt = evt;
    return renderEvt; */
    // console.log('Submit event ->', evt.submitter)

    // console.log('getInputValues result: ', this._getInputValues());
    this._handleFormSubmit(evt, this._getInputValues());
    // this.close();
    // this.renderLoading(false, evt);
    }

  );
}

// Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
close(){
  super.close();
  this._form.reset();
}
// Для каждого попапа создавайте свой экземпляр класса PopupWithForm. */
}
