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
  {
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
  }
];

export const imageModal = document.querySelector('.popup_type_image');  // Окно картинки
export const modalPicture = imageModal.querySelector('.popup__image');
export const modalCaption = imageModal.querySelector('.popup__caption');
export const cardListSelector = document.querySelector('.elements'); // контейнер для добавления карточек
