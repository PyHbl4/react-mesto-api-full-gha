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
        const jwt = localStorage.getItem('jwt');
        return fetch(requestUrl, {
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            });
    }

    _setApiData(requestUrl, options, method) {
        const jwt = localStorage.getItem('jwt');
        return fetch(requestUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
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
        const jwt = localStorage.getItem('jwt');
        return fetch(`${this._apiUrl}${this._pathToCards}/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${jwt}`
            }
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            });
    }


    toggleLike(id, method) {
        const jwt = localStorage.getItem('jwt');
        return fetch(`${this._apiUrl}${this._pathToCards}/${id}/likes`, {
            method: method,
            headers: {
                authorization: `Bearer ${jwt}`
            }
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            });
    }

}

export const apiClass = new Api(initialInfo);