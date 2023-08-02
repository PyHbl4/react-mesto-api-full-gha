import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const placeName = React.useRef();
    const placeUrl = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            name: placeName.current.value,
            link: placeUrl.current.value
        });
    }

    function logging() {
        console.log(placeName.current.value);
        console.log(placeUrl.current.value);
    }

    return (
        <PopupWithForm
            name="add"
            handleSubmit={handleSubmit}
            onClose={props.onClose}
            isOpen={props.isOpen}
            title="Новое место"
            buttonName='Создать'
            children={
                <>
                    <label className="form__label" htmlFor="add-name">
                        <input onChange={logging} ref={placeName} id="add-name" type="text" className="form__input" name="name" placeholder="Название" required minLength={2} maxLength={30} />
                        <span className="error-message add-name-error">текст ошибки</span>
                    </label>
                    <label className="form__label" htmlFor="add-url">
                        <input onChange={logging} ref={placeUrl} id="add-url" type="url" className="form__input" name="link" placeholder="Ссылка на картинку" required />
                        <span className="error-message add-url-error">текст ошибки</span>
                    </label>
                </>
            } />
    )
}

export default AddPlacePopup;