//<<<<<<<<<<<<<<<<<<<<< Валидация форм >>>>>>>>>>>>>>>>>>>>>>>>>>>>

// присвоение, сброс класса ошибки полю ввода
const showInputError = (formElement, inputElement, errorMessage, validSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Показываем сообщение об ошибке
  inputElement.classList.add(validSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validSettings.errorClass);
};

const hideInputError = (formElement, inputElement, validSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  //inputElement.classList.remove('popup__field_type_error');
  // Скрываем сообщение об ошибке
  inputElement.classList.remove(validSettings.inputErrorClass);
  errorElement.classList.remove(validSettings.errorClass);
  errorElement.textContent = '';
};

// проверка корректности введенных данных
const checkInputValidity = (formElement, inputElement, validSettings) => {
  if (!inputElement.validity.valid){
    showInputError(formElement, inputElement, inputElement.validationMessage, validSettings);
  }else{
    hideInputError(formElement, inputElement, validSettings);
  }
};

// деактивация кнопки
const buttonDeactive = (btn, btnDeact) => {
  btn.classList.add(btnDeact);
};

// проверяем форму на наличие поля, не прошедшего проверку
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// смена состояния кнопки активная|неактивная
const toggleButtonState = (inputList, buttonElement, validSettings) => {
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add(validSettings.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(validSettings.inactiveButtonClass);
  }
};

// уcтановка слушателей на поля ввода формы
const setEventListeners = (formElement, validSettings) => {
  const buttonElement = formElement.querySelector(validSettings.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(validSettings.inputSelector));
  toggleButtonState(inputList, buttonElement, validSettings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement, validSettings);
      toggleButtonState(inputList, buttonElement, validSettings);
    });
  });
};

// функция запуска проверки
const enableValidation = (validSettings) => {
  const formList = Array.from(document.querySelectorAll(validSettings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const btnSubmit = formElement.querySelector(validSettings.submitButtonSelector);
    buttonDeactive(btnSubmit, validSettings.inactiveButtonClass);
  });
  setEventListeners(formElement, validSettings);
});
};

enableValidation({
  formSelector: '.popup__main-container',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field_error_active'
});
