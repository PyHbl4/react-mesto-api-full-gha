import React from 'react';
import editIcon from '../images/edit_icon.svg';
import addIcon from '../images/add_icon.svg';
import changeAvatarIcon from '../images/change_avatar.svg';
// import avatarLoaderImage from '../images/avatar.jpg';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { CardsContext } from '../contexts/CardsContext.js';
function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const cards = React.useContext(CardsContext);
    console.log(currentUser);
    console.log(cards);

    return (
        <main>
            <section className="profile">
                <div className="profile__avatar">
                    <button type="button" className="profile__avatar-button" onClick={props.onEditAvatar}>
                        <img src={changeAvatarIcon} alt="изменить аватар" />
                    </button>
                    <img className="profile__avatar-image" src={currentUser.avatar} alt="аватар" />
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <p className="profile__subtitle">{currentUser.about}</p>
                    <button type="button" className="profile__edit-button" onClick={props.onEditProfile}>
                        <img className="profile__edit-button-icon" src={editIcon} alt="кнопка изменения информации" />
                    </button>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}>
                    <img className="profile__add-button-icon" src={addIcon} alt="кнопка добавления карточки" />
                </button>
            </section>
            <ul className="elements" id="elements-container">
                {cards.map((card) => (
                    <Card key={card._id} id={card.id} link={card.link} name={card.name} owner={card.owner} likes={card.likes} handleCardClick={props.onCardClick} handleLikeClick={props.onCardLike} card={card} handleDeleteClick={props.onCardDelete}/>
                ))}
            </ul>
        </main>
    )
}
export default Main;