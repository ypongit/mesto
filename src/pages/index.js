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
        editFormButton,
        avatarImg,
        submitButton
      } from '../utils/constants.js';
import { Card } from '../components/Card.js';
// import { /* openModal, closeModal, */ escHandler } from '../scripts/utils.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';
import { api } from '../components/Api.js';
// поля ввода
const inputProfileName = document.querySelector('.popup__field_el_name');
const inputProfileDescription = document.querySelector('.popup__field_el_description');
// информация о пользователе
const user = new UserInfo ({userNameSelector: '.profile__title', userInfoSelector: '.profile__text', userAvatarSelector: '.profile__avatar'});
// Загрузка информации о пользователе с сервера
let userId;
api.getProfile()
  .then(res => {
    // console.log('Ответ getProfile res: ', res);
    user.setUserInfo(res.name, res.about);
    user.setUserAvatar(res.avatar); // установка аватара загрузкой с сервера
    userId = res._id;
  })
  .catch((err) => {
    console.log(`${err}`);
    }
  )

api.getCards()
  .then(cardList => {
    // console.log('cardList -> ', cardList);
    cardList.forEach(data => {
      const card = createCard({
        name: data.name,
        link: data.link,
        likes: data.likes,
        id: data._id,
        userId: userId,
        ownerId: data.owner._id
      })
      // console.log('card ->', card)
      defaultCardList.addItem(card)
    })
  })
  .catch((err) => {
    console.log(`${err}`);
    }
  )
// экземпляр карточки
const createCard = (data) => {
  const card = new Card(
    data,
    '.element-template',
    handleCardClick,
    (id) => {
      // console.log('id', id)
      confirmPopup.open();
      confirmPopup.changeSubmitHandler(() => {
        // console.log(id)
        api.deleteCard(id)
          .then(res => {
            card.deleteCard();
            // console.log(res);
            confirmPopup.close();
          })
          .catch((err) => {
            console.log(`${err}`);
            }
          )
      })
    },
    (id) => {
      if(card.isLiked()){
         api.deleteLike(id)
        .then(res =>{
          card.setLikes(res.likes)
      })
      } else {
        api.addLike(id)
        .then(res =>{
          card.setLikes(res.likes)
      })
      .catch((err) => {
        console.log(`${err}`);
        }
      )
      }
    },
    );
  return card.getView();
}
function handleCardClick(name, link){
  imageModalPopup.open(name, link);
}
// вставка карточки на страницу
const renderCard = (data, wrap) => {
  const card = createCard(data);
  wrap.prepend(card);
}

// Создание карточек для начального заполнения страницы
const defaultCardList = new Section({items: initialCards, renderer: renderCard
}, '.elements');  // cardListSelector = document.querySelector('.elements')
// Заполняем страницу
defaultCardList.renderItems();

// экземпляры классов
// Форма редактирования профиля:  editFormSelector = document.querySelector('.popup_type_edit')
const editFormPopup = new PopupWithForm({popupSelector: '.popup_type_edit',
 //  handleFormSubmit: (item) => {
  handleFormSubmit: (evt, item) => {
     // console.log ('item', item);
    renderLoading(true, evt);
    const {name, description} = item;
    api.editProfile(name, description)
    .then(res => {
      user.setUserInfo(name, description);
      editFormPopup.close();
    })
    .catch((err) => {
      console.log(`${err}`);
      }
    )
    .finally(() => {
      renderLoading(false, evt);
    })
  }
});
// Форма редактирования аватара
const avatarFormPopup = new PopupWithForm({popupSelector: '.popup_type_avatar',
  handleFormSubmit: (evt, item) => {
    renderLoading(true, evt);
    api.setAvatar(item.link)
    // console.log('Avatar item => ', item.link)
    .then((res) => {
      // console.log('res index.js -> ', res)
     //avatarImg.src = `${res.avatar}`;
     // avatarImg.style.backgroundImage = `url(${res.avatar})`;
     user.setUserAvatar(res.avatar);  // установка URL аватара через форму
     avatarFormPopup.close();
    })
    .catch((err) => {
      console.log(`${err}`);
      }
    )
    .finally(() => {
      renderLoading(false, evt);
    })
  }
})
avatarFormPopup.setEventListeners();
avatarImg.addEventListener('click', () => {
  avatarFormPopup.open();
})
// Форма добавления карточки addForm = document.querySelector('.popup_type_add-card');
const addFormPopup = new PopupWithForm({popupSelector: '.popup_type_add-card',
  handleFormSubmit: (evt, item) => {
   renderLoading(true, evt);
    api.addCard(item['name'], item.link)
      .then(res => {
        const cardElement = createCard(
          {
          name: res.name,
          link: res.link,
          likes: res.likes,
          id: res._id,
          userId: userId,
          ownerId: res.owner._id
        })
        defaultCardList.addItem(cardElement);
        addFormPopup.close();
      })
      .catch((err) => {
        console.log(`${err}`);
        }
      )
      .finally(() => {
        renderLoading(false, evt);
      })
  }
});
addFormPopup.setEventListeners();
// Форма подтверждения удаления карточки
const confirmPopup = new PopupWithForm({popupSelector: '.popup_type_delete-confirm'}) // {popupSelector: '.popup_type_delete-confirm'}

confirmPopup.setEventListeners();

// Открытие формы добавления
addCardButton.addEventListener('click', () => {
  addFormPopup.open();
});


// Показ, скрытие формы редактирования
editFormButton.addEventListener('click', () => {
  const userData = user.getUserInfo();
  inputProfileName.value = userData.name; // profileTitle.textContent
  inputProfileDescription.value = userData.info; // profileDescription.textContent ;
  // Popup.open();
  editFormPopup.open();
  // console.log("renderEvt", renderEvt)
} );

editFormPopup.setEventListeners();
// показ изображения
const imageModalPopup = new PopupWithImage('.popup_type_image');
imageModalPopup.setEventListeners();
// отображение загрузки
function renderLoading(isLoading, evt){
  if (isLoading){
    console.log('renderLoading submitter ->', evt);
    evt.submitter.textContent = "Сохранение..."
    // Array.from(submitButton).forEach((submit) => {
    //   submit.value = "Сохранение..."
    // })
 } else {
    // console.log(evt);
    evt.submitter.textContent = "Сохранить";
    //  Array.from(submitButton).forEach((submit) => {
    //   submit.value = "Сохранить";
    // })
  }
}

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
    if (formName !== 'card_delete'){
    formValidators[formName] = validator;
    validator.enableValidation();}
  });
}
enableValidation(validationConfig);
// formValidators['card_delete'].resetValidation();

/* const editFormValidator = new FormValidator(validationConfig, mainEditForm);
const addFormValidator = new FormValidator(validationConfig, mainAddForm);
// const avatarFormValidator = new FormValidator(validationConfig, avatarFormPopup)
// Запуск функции валидации для каждой из форм.
editFormValidator.enableValidation();
addFormValidator.enableValidation(); */


