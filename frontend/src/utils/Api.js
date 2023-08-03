import { initialInfo } from "./constants.js";
class Api {
    constructor(options) {
        this._apiUrl = options.apiUrl;
        this._token = options.token;
        this._pathToCards = options.pathToCards;
        this._pathToMyCard = options.pathToMyCard;
        this._pathToMyAvatar = options.pathToMyAvatar;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка ${res.status}`);
        }
    }

    _getApiData(requestUrl) {
        return fetch(requestUrl, {
            headers: {
                authorization: this._token,
            }
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            });
    }

    _setApiData(requestUrl, options, method) {
        return fetch(requestUrl, {
            method: method,
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(options)
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            });
    }

    getInitialCards() {
        return this._getApiData(`${this._apiUrl}${this._pathToCards}`);
    }

    getUserInfo() {
        return this._getApiData(`${this._apiUrl}${this._pathToMyCard}`);
    }

    setUserInfo(options) {
        return this._setApiData(`${this._apiUrl}${this._pathToMyCard}`, options, 'PATCH');
    }

    setNewCard(options) {
        return this._setApiData(`${this._apiUrl}${this._pathToCards}`, options, 'POST');
    }

    changeAvatar(options) {
        return this._setApiData(`${this._apiUrl}${this._pathToMyCard}${this._pathToMyAvatar}`, options, 'PATCH');
    }

    deleteCard(cardId) {
        return fetch(`${this._apiUrl}${this._pathToCards}/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            }
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            });
    }


    toggleLike(id, method) {
        return fetch(`https://mesto.nomoreparties.co/v1/${this._pathToCards}/${id}/likes`, {
            method: method,
            headers: {
                authorization: this._token
            }
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            });
    }

}

export const apiClass = new Api(initialInfo);