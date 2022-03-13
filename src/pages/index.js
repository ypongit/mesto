import { FormValidator } from '../components/FormValidator.js';
import { validationConfig,
          initialCards,
          imageModal,
          imageModalCloseButton } from '../utils/constants.js';
import {mainEditForm,
        mainAddForm,
        addForm,
        addCardButton,
        editFormSelector,
        editFormButton} from '../utils/constants.js';
import { Card } from '../components/Card.js';
// import { /* openModal, closeModal, */ escHandler } from '../scripts/utils.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';
// поля ввода
const inputProfileName = document.querySelector('.popup__field_el_name');
const inputProfileDescription = document.querySelector('.popup__field_el_description');
// экземпляр карточки
const createCard = (data) => {
  const card = new Card(data, '.element-template', handleCardClick)
  return card.getView();
}
// вставка карточки на страницу
const renderCard = (data, wrap) => {
  const card = createCard(data);
  wrap.prepend(card);
}

// Создание карточек для начального заполнения страницы
const defaultCardList = new Section({items: initialCards, renderer: renderCard
}, '.elements');  // cardListSelector = document.querySelector('.elements')

// экземпляры классов
// Форма редактирования профиля:  editFormSelector = document.querySelector('.popup_type_edit')
const editFormPopup = new PopupWithForm({popupSelector: '.popup_type_edit',
  handleFormSubmit: (item) => {
    user.setUserInfo(item);
  }
});
// Заполняем страницу
defaultCardList.renderItems();

// Форма добавления карточки addForm = document.querySelector('.popup_type_add-card');
const addFormPopup = new PopupWithForm({popupSelector: '.popup_type_add-card',
  handleFormSubmit: (item) => {
  const cardElement = createCard(item, '.element-template', handleCardClick);
  defaultCardList.addItem(cardElement);
  }
});
addFormPopup.setEventListeners();

// Открытие формы добавления
addCardButton.addEventListener('click', () => {
  addFormPopup.open();
});

// информация о пользователе
const user = new UserInfo ({userNameSelector: '.profile__title', userInfoSelector: '.profile__text'});
// Показ, скрытие формы редактирования
editFormButton.addEventListener('click', () => {
  const userData = user.getUserInfo();
  inputProfileName.value = userData.name; // profileTitle.textContent
  inputProfileDescription.value = userData.info; // profileDescription.textContent ;
  // Popup.open();
  editFormPopup.open();
} );

editFormPopup.setEventListeners();
// показ изображения
const imageModalPopup = new PopupWithImage('.popup_type_image');
function handleCardClick(name, link){
  imageModalPopup.open(name, link);
}
imageModalPopup.setEventListeners();

// Поля ввода
// const inputCardName = document.querySelector('.popup__field_card_name');
// const inputCardLink = document.querySelector('.popup__field_card_link');

// Для каждой проверяемой формы создайте экземпляр класса FormValidator.
const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name');
    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}
enableValidation(validationConfig);

// const editFormValidator = new FormValidator(validationConfig, mainEditForm);
// const addFormValidator = new FormValidator(validationConfig, mainAddForm);
// Запуск функции валидации для каждой из форм.
//  editFormValidator.enableValidation();
//  addFormValidator.enableValidation();


