import { FormValidator } from './FormValidator.js';
import { validationConfig, initialCards } from './constants.js';
import {imageModal, modalPicture, modalCaption} from './constants.js';
import { Card } from './Card.js';
import { openModal, closeModal, escHandler } from './utils.js';

const list = document.querySelector('.elements'); // раздел карточек
// const cardTemplate = document.querySelector('.element-template').content;
// Профиль
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__text');
// Модальные окна
const popup = document.querySelector('.popup');
const editForm = document.querySelector('.popup_type_edit');  // Выбор формы редактирования
const addForm = document.querySelector('.popup_type_add-card');

// Формы
const mainEditForm = editForm.querySelector('.popup__main-container');
const mainAddForm = addForm.querySelector('.popup__main-container');
// Кнопки
const editFormButton = document.querySelector('.profile__edit-button'); //Кнопка открытия формы редактирования
const editFormCloseButton = editForm.querySelector('.popup__close');  // Кнопка закрытия формы редактирования
const addCardButton = document.querySelector('.profile__add-button'); // Кнопка добавления карточки
const addFormCloseButton = addForm.querySelector('.popup__close');
const imageModalCloseButton = imageModal.querySelector('.popup__close');
// Поля ввода
const inputCardName = document.querySelector('.popup__field_card_name');
const inputCardLink = document.querySelector('.popup__field_card_link');
const inputProfileName = document.querySelector('.popup__field_el_name');
const inputProfileDescription = document.querySelector('.popup__field_el_description');
// Для каждой проверяемой формы создайте экземпляр класса FormValidator.
const editFormValidator = new FormValidator(validationConfig, mainEditForm);
const addFormValidator = new FormValidator(validationConfig, mainAddForm);

// Запуск функции валидации для каждой из форм.
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Показ, скрытие формы редактирования
editFormButton.addEventListener('click', () => {
  openModal(editForm);
  inputProfileName.value = profileTitle.textContent;
  inputProfileDescription.value = profileDescription.textContent;
} );
editFormCloseButton.addEventListener('click', () => closeModal(editForm));
// Показ, скрытие формы добавления
addCardButton.addEventListener('click', () => {
  openModal(addForm);

});
addFormCloseButton.addEventListener ('click', () => closeModal(addForm));
// Закрытие формы показа картинок
imageModalCloseButton.addEventListener('click', () => {
  closeModal(imageModal);
})
// Закрытие формы по клику на свободном от формы месте
const closeModalOnOverlayClick = () => {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('click', (evt) => {
      if(evt.target === evt.currentTarget){
        closeModal(popupElement);
      }
    });
  });
};
closeModalOnOverlayClick ();

mainAddForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const item = {
    name: inputCardName.value,
    link: inputCardLink.value
  }
  const card = new Card(item, '.element-template');
  const cardElement = card.createCard();

  list.prepend(cardElement);

  closeModal(addForm);
  inputCardName.value = null;
  inputCardLink.value = null;

})

mainEditForm.addEventListener('submit', submitFormHandler);
// Обработчик «отправки» формы
function submitFormHandler (evt){
  evt.preventDefault();
  profileTitle.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;
  closeModal(editForm);
}
 initialCards.forEach((item) => {
  // Для каждой карточки создайте экземпляр класса Card.
  const card = new Card(item, '.element-template');
  const cardElement = card.createCard();
  list.prepend(cardElement); // list
})

