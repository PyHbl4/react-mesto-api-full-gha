export const initialInfo = {
    // apiUrl: 'http://api.maxim-runkov.nomoreparties.co',
    apiUrl: 'http://127.0.0.1:3000',
    pathToCards: '/cards',
    pathToMyCard: '/users/me',
    pathToMyAvatar: '/avatar'
};
export const authApiInfo = {
    // baseUrl: 'http://api.maxim-runkov.nomoreparties.co',
    baseUrl: 'http://127.0.0.1:3000',
    authUrl: '/signin',
    pathToMyCard: '/users/me',
    registerUrl: '/signup',
    checkUrl: ''
}
export const validSettings = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form-submit',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'error-message_visible',
}