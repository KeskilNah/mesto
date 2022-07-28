export class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    })
    .then(this._errorChecking);

  }

  getUserInfo(){
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers
    })
    .then(this._errorChecking);

  }

  setCard(data) {
    console.log(data);
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.palce,
        link: data.link,
      })
    }).then(this._errorChecking);
  }

  editProfile(data) {
    console.log(data.name);
    console.log(data.about);
    return fetch (`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    }).then(this._errorChecking);
  }

  editAvatar(link) {
    return fetch (`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      })
    }).then(this._errorChecking);
  }

  addingNewCard(card) {
    return fetch (`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      })
    }).then(this._errorChecking);
  }

  toggleLike(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    })
    .then(this._errorChecking);
  }

  deleteCard(id) {
    return fetch (`${this._url}/cards/cards${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._errorChecking);
  }

  _errorChecking(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`ОШИБКА: ${res.message}`);
  }
}



// fetch('https://mesto.nomoreparties.co/v1/cohort-45/users/me', {
//   headers: {
//     authorization: 'de4ccc24-3897-4b25-93ca-7c2376f1a4ac'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });