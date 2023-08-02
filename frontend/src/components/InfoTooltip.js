import closeIcon from '../images/close_icon.svg';
import okayImage from '../images/auth_ok.svg';
import fallImage from '../images/auth_false.svg';
function InfoTooltip(props) {
    return (
        <div className={`popup info-popup ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container info-popup__wrapper">
                <button type="button" className="popup__close-button image-popup__close-icon" onClick={props.onClose}>
                    <img src={closeIcon} alt="закрыть" className="popup__close-icon" />
                </button>
                <img src={props.isOkay ? okayImage : fallImage} alt="#" className="info-popup__image" />
                <p className="info-popup__description">{props.isOkay ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
            </div>
        </div>
    )
}
export default InfoTooltip;