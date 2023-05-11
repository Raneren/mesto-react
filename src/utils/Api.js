class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._authorization = options.headers["authorization"];
  }
  //Метод для проверки ответа
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  //Метод для получения данных пользователя с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => this._checkResponse(res));
  }
  //Метод для отправки данных пользователя на сервер
  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._checkResponse(res));
  }
  //Метод для отправки аватара пользователя на сервер
  setUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._checkResponse(res));
  }
  //Метод для получения карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => this._checkResponse(res));
  }
  //Метод для отправки карточки на сервер
  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._checkResponse(res));
  }
  //Метод удаления карточки с сервера
  deleteCardOnServer(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => this._checkResponse(res));
  }
  //Метод удаления/отправки лайка на сервер
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: {
          authorization: this._authorization,
        },
      }).then((res) => this._checkResponse(res));
    } else {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: {
          authorization: this._authorization,
          "Content-Type": "application/json",
        },
      }).then((res) => this._checkResponse(res));
    }
  }
}

//Класс для работы с Api
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-63",
  headers: {
    authorization: "7edc4154-b999-4c4d-8ba9-f78a6b32f685",
  },
});

export default api;
