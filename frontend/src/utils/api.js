export class Api {
    constructor({address, headers}) {
        this._address = address;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }

        return Promise.reject(`Error ${res.status}`)
    }

    getInitialCards(token) {
        return fetch(`${this._address}/cards`, {
            // method: 'GET',
            headers: this._headers
        })
        .then((res) => {
            return this._checkResponse(res)
        })
    }

    getUserData(token) {
        return fetch(`${this._address}/users/me`, {
            // method: 'GET',
            headers: this._headers
        })
        .then(res => {
            return this._checkResponse(res)
        })
    }

    changeUserData(data) {
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then((res) => {
            return this._checkResponse(res)
        })
    }

    addCard(data) {
        return fetch(`${this._address}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then((res) => {
            return this._checkResponse(res)
        })
    }

    addLikeCard(card) {
        return fetch(`${this._address}/cards/${card}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
        .then((res) => {
            return this._checkResponse(res)
        })
    }

    removeLikeCard(card) {
        return fetch(`${this._address}/cards/${card}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then((res) => {
            return this._checkResponse(res)
        })
    }

    deleteCard(card) {
        return fetch(`${this._address}/cards/${card}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then((res) => {
            return this._checkResponse(res)
        })
    }

    editAvatar(data) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then((res) => {
            return this._checkResponse(res)
        })
    }

}

const api = new Api({
    // address: "https://api.mesto.nomoredomains.club",
    address: "http://localhost:3005",
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      "Content-Type": "application/json"
    }
});

export default api;