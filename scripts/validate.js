//<<<<<<<<<<<<<<<<<<<<< Валидация форм >>>>>>>>>>>>>>>>>>>>>>>>>>>>

// присвоение, сброс класса ошибки полю ввода
const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Показываем сообщение об ошибке
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Скрываем сообщение об ошибке
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

// проверка корректности введенных данных
const checkInputValidity = (formElement, inputElement, classes) => {
  if (!inputElement.validity.valid){
    showInputError(formElement, inputElement, inputElement.validationMessage, classes);
  }else{
    hideInputError(formElement, inputElement, classes);
  }
};

// деактивация кнопки
const buttonDeactive = (btn, btnDeact) => {
  btn.classList.add(btnDeact);
  btn.disabled = true;
};

// проверяем форму на наличие поля, не прошедшего проверку
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// смена состояния кнопки активная|неактивная
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if(hasInvalidInput(inputList)){
    buttonDeactive(buttonElement, inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

// уcтановка слушателей на поля ввода формы
const setEventListeners = (formElement, buttonElement, inactiveButtonClass, classes) => {
  const inputList = Array.from(formElement.querySelectorAll(classes.inputSelector));
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement, classes);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

// функция запуска проверки
const enableValidation = ({formSelector, submitButtonSelector, inactiveButtonClass, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    const buttonElement = formElement.querySelector(submitButtonSelector);
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      buttonDeactive(buttonElement, inactiveButtonClass);
  });
  setEventListeners(formElement, buttonElement, inactiveButtonClass, rest);
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
