class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _handleResponse (res) {
      return res.ok
        ? res.json()
        : Promise.reject(`Ошибка в ${res.status}`);
    }
    
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
        .then((res) => {
          return this._handleResponse(res)
        });
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
        .then((res) => {
          return this._handleResponse(res)
        });
    }
    
    addCard({ placeName, placeLink }) {
        return fetch(`${this._url}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
            name: placeName,
            link: placeLink
          })
        })
        .then((res) => {
          return this._handleResponse(res)
        });
    }

    editUser({ nickname, about }) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
              name: nickname,
              about: about
            })
        })
        .then((res) => {
          return this._handleResponse(res)
        });
    }
    
    addLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
          method: 'PUT',
          headers: this._headers,
        })
        .then((res) => {
          return this._handleResponse(res)
        });
    }

    deleteLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
          method: 'DELETE',
          headers: this._headers,
        })
        .then((res) => {
          return this._handleResponse(res)
        });
  }
    
    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
          method: 'DELETE',
          headers: this._headers,
        })
        .then((res) => {
          return this._handleResponse(res)
        });
    }
    
    changeAvatar({ avatar }) {
        return fetch(`${this._url}/users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            avatar: avatar
          })
        })
        .then((res) => {
          return this._handleResponse(res)
        });
    }
} 

const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: 'dee17758-01f3-41db-81d2-b39918f89271',
    'Content-Type': 'application/json'
  }
})

export default api;