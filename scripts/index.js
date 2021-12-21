const formOpenButton = document.querySelector('.profile__edit-button'); //Кнопка открытия формы редактирования
const formCloseButton = document.querySelector('.popup__close');  // Кнопка закрытия формы
const form = document.querySelector('.popup');  // Выбор формы
const mainForm = document.querySelector('.popup__main-container');
let profileTitle = document.querySelector('.profile__title');
let profileText = document.querySelector('.profile__text');
let fieldName = document.querySelector('.popup__field_el_name');
let fieldDescription = document.querySelector('.popup__field_el_description');

function openForm(){
  form.classList.add('popup_opened');
  fieldName.value = profileTitle.textContent;
  fieldDescription.value = profileText.textContent;
}

function closeForm(){
  form.classList.remove('popup_opened');
}
/*
function toggleForm() {
  form.classList.toggle('form_opened');
}

function closeFormOnOverlayClick(event) {
  if (event.target === event.currentTarget){
    form.classList.remove('popup_opened');
  }
}*/
// Обработчик «отправки» формы
function formSubmitHandler (evt){
  evt.preventDefault();
  closeForm();
  profileTitle.textContent = fieldName.value;
  profileText.textContent = fieldDescription.value;
}
formOpenButton.addEventListener('click', openForm);
formCloseButton.addEventListener('click', closeForm);
mainForm.addEventListener('submit', formSubmitHandler);
//form.addEventListener('click', closeFormOnOverlayClick);




