export const validationConfig = {
  formSelector: '.popup__main-container', // форма
  inputSelector: '.popup__field', // поля ввода
  submitButtonSelector: '.popup__submit', // кнопка отправки данных
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field_error_active'
}
// Массив информации для карточек
export const initialCards = [
  /* {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  } */
];

// Модальные окна
export const popupElement = document.querySelector('.popup');
export const editFormSelector = document.querySelector('.popup_type_edit');  // Выбор формы редактирования

// Формы
export const addForm = document.querySelector('.popup_type_add-card'); // Выбор формы добавления
export const mainEditForm = editFormSelector.querySelector('.popup__main-container');
export const mainAddForm = addForm.querySelector('.popup__main-container');
// поля ввода
export const inputProfileName = document.querySelector('.popup__field_el_name');
export const inputProfileDescription = document.querySelector('.popup__field_el_description');

export const imageModal = document.querySelector('.popup_type_image');  // Окно картинки
export const modalPicture = imageModal.querySelector('.popup__image');  // Фото в попапе (popupImage)
export const modalCaption = imageModal.querySelector('.popup__caption');
export const cardListSelector = document.querySelector('.elements'); // контейнер для добавления карточек


// Кнопки
export const imageModalCloseButton = imageModal.querySelector('.popup__close');
export const addCardButton = document.querySelector('.profile__add-button'); // Кнопка добавления карточки
export const editFormButton = document.querySelector('.profile__edit-button'); //Кнопка открытия формы редактирования
export const submitButton = document.querySelector('.popup__submit');
export const avatarImg = document.querySelector('.profile__avatar');

