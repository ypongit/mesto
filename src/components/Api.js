class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
    // тело конструктора
  }
// загрузка данных профиля
  getProfile(){
    return fetch(`${this._baseUrl}/users/me `, {
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))

  }
// загрузка карточек
  getCards() {
    // ...
    return fetch(`${this._baseUrl}/cards `, {
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }
// изменение данных профиля на сервере
  editProfile(name, about) {
    // ...
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }
// Добавление новой карточки
addCard(name, link) {
  // ...
  return fetch(`${this._baseUrl}/cards`, {
    method: "POST",
    headers: this._headers,
    body: JSON.stringify({
      name,
      link
    })
  })
  .then(res => res.ok ? res.json() : Promise.reject(res.status))
}
// удаление новой карточки
deleteCard(id) {
  // ...
  return fetch(`${this._baseUrl}/cards/${id} `, {
    method: "DELETE",
    headers: this._headers
  })
  .then(res => res.ok ? res.json() : Promise.reject(res.status))
}
// удаление лайка
deleteLike(id) {
  // ...
  return fetch(`${this._baseUrl}/cards/${id}/likes `, {
    method: "DELETE",
    headers: this._headers
  })
  .then(res => res.ok ? res.json() : Promise.reject(res.status))
}
// добавление лайка
addLike(id) {
  // ...
  return fetch(`${this._baseUrl}/cards/${id}/likes `, {
    method: "PUT",
    headers: this._headers
  })
  .then(res => res.ok ? res.json() : Promise.reject(res.status))
}
// установка аватара
setAvatar(avatar) {
  // ...
  return fetch(`${this._baseUrl}/users/me/avatar `, {
    method: "PATCH",
    headers: this._headers,
    body: JSON.stringify({
      avatar
    })
  })
  .then(res => res.ok ? res.json() : Promise.reject(res.status))
}
  // другие методы работы с API
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-37',
  headers: {
    authorization: '3e042cce-8939-40c2-9f95-48414868d982',
    'Content-Type': 'application/json'
  }
});
