export class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    })
    .then(this._checkError);

  }

  getUserInfo(){
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers
    })
    .then(this._checkError);

  }

  setCard(card) {
    return fetch (`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: card.place,
        link: card.link,
      }),
    }).then(this._checkError);
  }

  editProfile(data) {
    return fetch (`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    }).then(this._checkError);
  }

  editAvatar(link) {
    return fetch (`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link.avatar,
      })
    }).then(this._checkError);
  }

  toggleLike(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    })
    .then(this._checkError);
  }

  deleteCard(id) {
    return fetch (`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkError);
  }

  _checkError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`ОШИБКА: ${res.message}`);
  }
}