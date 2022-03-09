import { FormValidator } from '../scripts/FormValidator.js';
import { validationConfig,
          initialCards,
          imageModal,
          imageModalCloseButton } from '../utils/constants.js';
import {mainEditForm,
        mainAddForm,
        addForm,
        addCardButton,
        editFormSelector,
        editFormButton,
        /* inputProfileName,
        inputProfileDescription, */
        cardListSelector} from '../utils/constants.js';
import { Card } from '../scripts/Card.js';
// import { /* openModal, closeModal, */ escHandler } from '../scripts/utils.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
// поля ввода
const inputProfileName = document.querySelector('.popup__field_el_name');
const inputProfileDescription = document.querySelector('.popup__field_el_description');
// Создание карточек для начального заполнения страницы
const defaultCardList = new Section({items: initialCards, renderer: (item) => {
  const card = new Card(item, '.element-template', handleCardClick);
  const cardElement = card.createCard();
  defaultCardList.addItem(cardElement);
}}, cardListSelector);
// const list = document.querySelector('.elements'); // раздел карточек
// const cardTemplate = document.querySelector('.element-template').content;

// Профиль
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__text');

// экземпляры классов
// Форма редактирования профиля
const editFormPopup = new PopupWithForm({popupSelector: editFormSelector,
  handleFormSubmit: (item) => {
    user.setUserInfo(item);
}});
// Форма добавления карточки
const addFormPopup = new PopupWithForm({popupSelector: addForm, handleFormSubmit: (item) => {
  // console.log('addFormPopup result: ', item);
  const card = new Card(item, '.element-template', handleCardClick);

  const cardElement = card.createCard();
  // console.log('cardElement result: ', cardElement);
  defaultCardList.addItem(cardElement);
  }
});


// Открытие формы добавления
addCardButton.addEventListener('click', () => {
  addFormPopup.open();
});
// информация о пользователе
const user = new UserInfo ({userNameSelector: profileTitle, userInfoSelector: profileDescription});
// Показ, скрытие формы редактирования
editFormButton.addEventListener('click', () => {
  const userData = user.getUserInfo();
  inputProfileName.value = userData.name; // profileTitle.textContent
  inputProfileDescription.value = userData.info; // profileDescription.textContent ;
  editFormPopup.open();

  // editFormPopup.setEventListeners();
  editFormValidator.resetValidation();
  // formValidators['mainEditForm'].resetValidation();

} );
const imageModalPopup = new PopupWithImage(imageModal);
function handleCardClick(name, link){
  imageModalPopup.open(name, link);
}
// Поля ввода
const inputCardName = document.querySelector('.popup__field_card_name');
const inputCardLink = document.querySelector('.popup__field_card_link');

// Для каждой проверяемой формы создайте экземпляр класса FormValidator.
const editFormValidator = new FormValidator(validationConfig, mainEditForm);
const addFormValidator = new FormValidator(validationConfig, mainAddForm);
// Запуск функции валидации для каждой из форм.
 editFormValidator.enableValidation();
 addFormValidator.enableValidation();

 defaultCardList.renderItems();


// editFormCloseButton.addEventListener('click', () => editFormPopup.close());




/* addFormCloseButton.addEventListener ('click', () =>
//closeModal(addForm));
  addFormPopup.close());
// Закрытие формы показа картинок
imageModalCloseButton.addEventListener('click', () => {
  closeModal(imageModal);
})*/
// Закрытие формы по клику на свободном от формы месте
/*const closeModalOnOverlayClick = () => {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('click', (evt) => {
      console.log(evt.currentTarget);

       if(evt.target === evt.currentTarget){
        closeModal(popupElement);
      }
    });
  });
};
closeModalOnOverlayClick ();*/

// Функция создания карточки
/* function createCard(item) {
// Для каждой карточки создайте экземпляр класса Card.
  const card = new Card(item, '.element-template', handleCardClick);
  const cardElement = card.createCard();
  return cardElement;
} */

// Вставка карточки на страницу через форму добавления
/* const popupCardAdd = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (formData) => {

  }
}

)*/


// Форма редактирования профиля (class="profile")
// mainEditForm.addEventListener('submit', handleProfileFormSubmit);
// Обработчик «отправки» формы
/* function handleProfileFormSubmit (evt){
  evt.preventDefault();
  profileTitle.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;
  closeModal(editForm);
} */
//


