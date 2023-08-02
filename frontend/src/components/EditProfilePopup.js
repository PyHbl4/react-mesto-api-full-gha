import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    function handleNameInput(evt) {
        setName(evt.target.value);
    }
    function handleDescriptionInput(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    React.useEffect(() => {
        if (currentUser) {
            setName(currentUser.name ?? '');
            setDescription(currentUser.about ?? '');
        }
    }, [currentUser, props.isOpen]);

    return (
        <PopupWithForm
            name="edit"
            onClose={props.onClose}
            isOpen={props.isOpen}
            handleSubmit={handleSubmit}
            title="Редактировать профиль"
            buttonName='Сохранить'
            children={
                <>
                    <label className="form__label" htmlFor="edit-name">
                        <input id="edit-name" value={name} onChange={handleNameInput} type="text" className="form__input" name="name" placeholder="Имя" required minLength={2} maxLength={40} />
                        <span className="error-message edit-name-error">текст ошибки</span>
                    </label>
                    <label className="form__label" htmlFor="edit-profession">
                        <input id="edit-profession" value={description} onChange={handleDescriptionInput} type="text" className="form__input" name="description" placeholder="Профессия" required minLength={2} maxLength={200} />
                        <span className="error-message edit-profession-error">текст ошибки</span>
                    </label>
                </>
            } />
    )
}

export default EditProfilePopup;