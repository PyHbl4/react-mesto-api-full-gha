import { authApiInfo } from "./constants.js"

class AuthApi {
    constructor(options) {
        this._apiUrl = options.baseUrl;
        this._authUrl = options.authUrl;
        this._registerUrl = options.registerUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка ${res.status}`);
        }
    }

    _setApiData(requestUrl, options) {
        return fetch(requestUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(options)
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            });
    }

    checkAuthorization(token) {
        return fetch(`${this._apiUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(this._checkResponse)
            .then((result) => {
                return result;
            });
    }

    registerUserRequest(options) {
        return this._setApiData(`${this._apiUrl}${this._registerUrl}`, options);
    }

    authorizeUserRequest(options) {
        return this._setApiData(`${this._apiUrl}${this._authUrl}`, options);
    }
}

export const authApiClass = new AuthApi(authApiInfo);