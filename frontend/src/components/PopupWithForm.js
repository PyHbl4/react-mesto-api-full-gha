import closeIcon from '../images/close_icon.svg';
function PopupWithForm(props) {
    return (
        <div className={`popup popup-${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__close-button" type="button" onClick={props.onClose}>
                    <img src={closeIcon} alt="закрыть" className="popup__close-icon" />
                </button>
                <h2 className="popup__title">{props.title}</h2>
                <form onSubmit={props.handleSubmit} action="post" className="form edit-form" name={`${props.name}-form`} noValidate>
                    {props.children}
                    <button type="submit" className="form-submit form__submit-button">{props.buttonName}</button>
                </form>
            </div>
        </div>
    )
}
export default PopupWithForm;