import closeIcon from '../images/close_icon.svg';
function ImagePupup(props) {
    return (
        <div className={`popup image-popup ${props.card?'popup_opened':''}`}>
            <div className="popup__image-wrapper">
                <button type="button" className="popup__close-button image-popup__close-icon" onClick={props.onClose}>
                    <img src={closeIcon} alt="закрыть" className="popup__close-icon" />
                </button>
                <img src={props.card?props.card.src:''} alt={props.card?props.card.alt:''} className="image-popup__image" />
                <p className="image-popup__description">{props.card?props.card.alt:''}</p>
            </div>
        </div>
    )
}
export default ImagePupup;