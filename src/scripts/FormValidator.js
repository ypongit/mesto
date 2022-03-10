// <<<<<<<<<<<<<<< Создайте класс FormValidator, который настраивает валидацию полей формы: >>>>>>>>>>>>>>>>

export class FormValidator {
// принимает в конструктор объект настроек с селекторами и классами формы;
// принимает вторым параметром элемент той формы, которая валидируется;
  constructor(settings, form){
    this._form = form;
    this._settings = settings;

    this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
  }
// имеет приватные методы, которые обрабатывают форму: проверяют валидность поля

_showInputError = (inputElement, errorMessage) => {
  const {errorClass, inputErrorClass} = this._settings;
  const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
  // Показываем сообщение об ошибке
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

_hideInputError = (inputElement) => {
  const {errorClass, inputErrorClass} = this._settings;

  const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
  // Скрываем сообщение об ошибке
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

_checkInputValidity = (inputElement) => {
  if (!inputElement.validity.valid){
    this._showInputError(inputElement, inputElement.validationMessage);
  }else{
    this._hideInputError(inputElement);
  }
};
// метод для очистки ошибок и управления кнопкой
resetValidation() {
  this._toggleButtonState();
  this._inputList.forEach((inputElement) => {
  this._hideInputError(inputElement);
  })
}
_hasInvalidInput = () => {
  return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
_disableSubmitButton = () => {
  const {inactiveButtonClass} = this._settings;
  this._buttonElement.classList.add(inactiveButtonClass);
  this._buttonElement.disabled = true;
}

_enableSubmitButton = () => {
  const {inactiveButtonClass} = this._settings;
  this._buttonElement.classList.remove(inactiveButtonClass);
  this._buttonElement.disabled = false;
}
// изменяют состояние кнопки сабмита, устанавливают все обработчики;
_toggleButtonState = () => {
  if(this._hasInvalidInput()){
    this._disableSubmitButton();
  } else {
    this._enableSubmitButton();
  }
};

_setEventListeners = () => {
  this._inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState();
    });
  });
};

// имеет публичный метод enableValidation, который включает валидацию формы.
enableValidation (){
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._disableSubmitButton();
  });
    this._disableSubmitButton();
    this._setEventListeners();
  }
}

