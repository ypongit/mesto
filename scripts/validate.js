//<<<<<<<<<<<<<<<<<<<<< Валидация форм >>>>>>>>>>>>>>>>>>>>>>>>>>>>
/*
  mainEditForm - форма редактирования
  inputProfileName - поле ввода формы редактирования
  inputProfileDescription - поле описания формы редактирования
  ------------------------------------------
  mainAddForm - форма добавления

*/
/* const form = document.querySelector('.popup__main-container'); // выбор форм
const formInput = form.querySelector('.popup__field');  // поля ввода форм
const formError = form.querySelector(`.${formInput.id}-error`); // уникальное значение поля ввода */

// присвоение, сброс класса ошибки полю ввода
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  //inputElement.classList.add('popup__field_type_error');
  // Показываем сообщение об ошибке
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__field_error_active');
}
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  //inputElement.classList.remove('popup__field_type_error');
  // Скрываем сообщение об ошибке
  errorElement.classList.remove('popup__field_error_active');
  errorElement.textContent = '';
}
// проверка корректности введенных данных
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid){
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }else{
    hideInputError(formElement, inputElement);
  }
}
// утановка слушателей на поля ввода формы
const setEventListeners = (formElement) => {
  const buttonElement = formElement.querySelector('.popup__submit');
  const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};
// функция запуска проверки
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__main-container'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  setEventListeners(formElement);
});
};

// функция проверяет форму на наличие поля, непрошедшего проверку
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add('popup__submit_inactive');
  } else {
    buttonElement.classList.remove('popup__submit_inactive');
  }
};
enableValidation();
