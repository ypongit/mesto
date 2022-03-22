// Класс UserInfo отвечает за управление отображением информации о пользователе на странице.
export default class UserInfo {
  // Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
  constructor({userNameSelector, userInfoSelector}){
    this._userName = document.querySelector(userNameSelector);
    this._userInfo =  document.querySelector(userInfoSelector);
  }
// Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя.
// Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo(){
    return {
      name: this._userName.textContent,
      info: this._userInfo.textContent
    };

  }
// Содержит публичный метод setUserInfo, который принимает новые данные пользователя
// и добавляет их на страницу.
  setUserInfo(title, job){
    // console.log('setUserInfo title', title)
    this._userName.textContent = title;
    this._userInfo.textContent = job;
  }
}
