//<<<<<<<<<<<<<<<<<<<<< Валидация форм >>>>>>>>>>>>>>>>>>>>>>>>>>>>

const validSettings = {
  formSelector: '.popup__main-container',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__field-error',
  errorClass: 'popup__field_error_active'

};

// присвоение, сброс класса ошибки полю ввода
const showInputError = (formElement, inputElement, errorMessage) => {
  // console.log('inputElement =>', inputElement.id);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Показываем сообщение об ошибке
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validSettings.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  //inputElement.classList.remove('popup__field_type_error');
  // Скрываем сообщение об ошибке
  errorElement.classList.remove(validSettings.errorClass);
  errorElement.textContent = '';
};

// проверка корректности введенных данных
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid){
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }else{
    hideInputError(formElement, inputElement);
  }
};

// утановка слушателей на поля ввода формы
const setEventListeners = (formElement, submitButton, fieldInput) => {
  const buttonElement = formElement.querySelector(submitButton);
  const inputList = Array.from(formElement.querySelectorAll(fieldInput));
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// функция запуска проверки
const enableValidation = (forms) => {
  console.log(forms);
  const formList = Array.from(document.querySelectorAll(forms));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  setEventListeners(formElement, validSettings.submitButtonSelector, validSettings.inputSelector);
});
};

// проверяем форму на наличие поля, непрошедшего проверку
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}
// смена состояния кнопки активная|неактивная
const toggleButtonState = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add('popup__submit_inactive');
  } else {
    buttonElement.classList.remove('popup__submit_inactive');
  }
};

enableValidation(validSettings.formSelector);
