// Открытие модального окна
export const openModal = (modal) => {
  modal.classList.add('popup_opened');
  document.addEventListener('keydown', escHandler); // слушатель ESC
}
// Закрытие модального окна
export const closeModal = (modal) => {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', escHandler);  // Удаление слушателя ESC
}
/* Функция закрытия модального окна по клавише "Escape" */
export const escHandler = (evt) => {
  const currentForm = document.querySelector('.popup_opened');
  if (evt.key === 'Escape'){
    closeModal(currentForm);
  };
}
