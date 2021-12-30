// Массив информации для карточек
const initialCards = [
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
const list = document.querySelector('.elements');
const cardTemplate = document.querySelector('.element-template').content;
// Профиль
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__text');
// Модальные окна
const Modal = document.querySelector('.popup');
const editForm = document.querySelector('.popup__type_edit');  // Выбор формы редактирования
const addForm = document.querySelector('.popup__type_add-card');
const imageModal = document.querySelector('.popup__type_image');  // Окно картинки
// Формы
const mainEditForm = editForm.querySelector('.popup__main-container');
const mainAddForm = addForm.querySelector('.popup__main-container');
// Кнопки
const editFormButton = document.querySelector('.profile__edit-button'); //Кнопка открытия формы редактирования
const editFormCloseButton = editForm.querySelector('.popup__close');  // Кнопка закрытия формы редактирования
const addCardButton = document.querySelector('.profile__add-button'); // Кнопка добавления карточки
const addFormCloseButton = addForm.querySelector('.popup__close');
// Поля ввода
const inputCardName = document.querySelector('.popup__field_card_name');
const inputCardLink = document.querySelector('.popup__field_card_link');
const inputProfileName = document.querySelector('.popup__field_el_name');
const inputProfileDescription = document.querySelector('.popup__field_el_description');

function toggleForm(modal){
  modal.classList.toggle('popup_closed')
  modal.classList.toggle('popup_opened')
}
// Показ- скрытие формы редактирования
editFormButton.addEventListener('click', () => toggleForm(editForm));
editFormCloseButton.addEventListener('click', () => toggleForm(editForm));
// Показ- скрытие формы добавления
addCardButton.addEventListener('click', () => toggleForm(addForm));
addFormCloseButton.addEventListener ('click', () => toggleForm(addForm));

mainAddForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  createCard({
    name: inputCardName.value,
    link: inputCardLink.value
  })
  toggleForm(addForm);
})

mainEditForm.addEventListener('submit', formSubmitHandler);
// Обработчик «отправки» формы
function formSubmitHandler (evt){
  evt.preventDefault();
  toggleForm(editForm);
  profileTitle.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;
}

function deleteHandler(e){
  // console.log('e => ', e)
  e.target.closest('.element').remove()
}


function createCard(cardData){
  // склонировать шаблон
  const cardElement = cardTemplate.cloneNode(true)
  // заполнить данными

  const cardImage = cardElement.querySelector('.element__image')
  const cardTitle = cardElement.querySelector('.element__heading-text')
  const deleteButton = cardElement.querySelector('.element__delete-button')
  const likeButton = cardElement.querySelector('.element__like-button')
  const imageModalCloseButton = imageModal.querySelector('.popup__close')

  cardTitle.textContent = cardData.name
  cardImage.src = cardData.link
  deleteButton.addEventListener('click', deleteHandler)
  likeButton.addEventListener('click', () => toggleLike(likeButton))

  function toggleImageForm(imgModal){
    imgModal.classList.toggle('popup_closed')
    imgModal.classList.toggle('popup_opened')
  }
  cardImage.addEventListener('click', () => {toggleImageForm(imageModal)
    const modalPicture = imageModal.querySelector('.popup__image')
    const modalCaption = imageModal.querySelector('.popup__caption')
    modalPicture.src = cardData.link
    modalCaption.textContent = cardData.name
    console.log('imageModal => ', imageModal)
    currentImageModal = imageModal
  })  //imageModal
  imageModalCloseButton.addEventListener('click', () => {
    //toggleImageForm(imageModal)
    imageModal.classList.remove('popup_opened');
    imageModal.classList.add('popup_closed');
  })/**/

  function toggleLike(like){
    likeButton.classList.toggle('element__like-button_active')
  }

  // вставить на страницу
  list.prepend(cardElement)
}

// Заполнение страницы карточками
initialCards.forEach(createCard)



/*
function toggleForm() {
  form.classList.toggle('form_opened');
}

function closeFormOnOverlayClick(event) {
  if (event.target === event.currentTarget){
    form.classList.remove('popup_opened');
  }
}
form.addEventListener('click', closeFormOnOverlayClick);
*/
