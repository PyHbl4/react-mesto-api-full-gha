import React from 'react';
import trash from '../images/trash.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {
    function handleLikeClick() {
        props.handleLikeClick(props.card)
    }
    function handleDeleteClick() {
        props.handleDeleteClick(props.card)
    }
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.owner === currentUser._id;
    const isLiked = (array, userID) => {
        return array.some((item) => {
            return item === userID;
        });
    }
    return (
        <li className="element">
            {isOwn && <button className="element__delete-button" type="button">
                <img src={trash} onClick={handleDeleteClick} alt="удалить" />
            </button>}
            <img src={props.link} alt={`фото: ${props.name}`} className="element__image" onClick={props.handleCardClick} />
            <h2 className="element__title">{props.name}</h2>
            <button type="button" onClick={handleLikeClick} className={`element__like${isLiked(props.likes, currentUser._id) ? ' element__like_active' : ''}`}></button>
            <p className="element__likes-count">{props.likes.length}</p>
        </li>
    )
}
export default Card;