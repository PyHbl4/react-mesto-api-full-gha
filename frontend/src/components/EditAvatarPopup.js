import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();
    const currentUser = React.useContext(CurrentUserContext);

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            _id: currentUser._id,
            avatar: avatarRef.current.value
        });
        e.target.reset();
    }

    return (
        <PopupWithForm
            name="change-avatar"
            onClose={props.onClose}
            isOpen={props.isOpen}
            title="Обновить аватар"
            buttonName='Сохранить'
            handleSubmit={handleSubmit}
            children={
                <>
                    <label className="form__label" htmlFor="change-avatar-url">
                        <input ref={avatarRef} id="change-avatar-url" type="url" className="form__input" name="avatar" placeholder="Ссылка на картинку" required />
                        <span className="error-message change-avatar-url-error">текст ошибки</span>
                    </label>
                </>
            } />
    )
}

export default EditAvatarPopup;