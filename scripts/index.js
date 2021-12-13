const formOpenButton = document.querySelector('.profile__edit-button');
const formCloseButton = document.querySelector('.form__close');
const form = document.querySelector('.form');
const formSubmitButton = document.querySelector('.form__submit');
let profileTitle = document.querySelector('.profile__title');
let profileText = document.querySelector('.profile__text');
let fieldName = document.querySelector('.form__field_el_name');
let fieldDescription = document.querySelector('.form__field_el_description');

function openForm(){
  form.classList.add('form_opened');
  fieldName.value = profileTitle.textContent;
  fieldDescription.value = profileText.textContent;
}

function closeForm(){
  form.classList.remove('form_opened');
}
/*
function toggleForm() {
  form.classList.toggle('form_opened');
}
*/
function closeFormOnOverlayClick(event) {
  if (event.target === event.currentTarget){
    form.classList.remove('form_opened');
  }
}
// Обработчик «отправки» формы
function formSubmitHandler (evt){
  evt.preventDefault();
  form.classList.remove('form_opened');
  profileTitle.textContent = fieldName.value;
  profileText.textContent = fieldDescription.value;

}
formOpenButton.addEventListener('click', openForm);
formCloseButton.addEventListener('click', closeForm);
formSubmitButton.addEventListener('click', formSubmitHandler);
form.addEventListener('click', closeFormOnOverlayClick);




