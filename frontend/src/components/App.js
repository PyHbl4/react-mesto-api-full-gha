import React from 'react';
import { useState, useEffect } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { CardsContext } from '../contexts/CardsContext.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import { apiClass } from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import ImagePopup from './ImagePopup.js';
import InfoTooltip from './InfoTooltip.js'
import { Route, Routes } from "react-router-dom";
import { authApiClass } from '../utils/AuthApi';
import ProtectedRouteElement from "./ProtectedRoute";
const userRequest = apiClass.getUserInfo()
  .then((data) => {
    return data;
  })
  .catch((err) => {
    console.log(`Ошибка запроса данных пользователя: ${err}`);
  })
const userData = Promise.resolve(userRequest);
const cardsRequest = apiClass.getInitialCards()
  .then((data) => {
    return data;
  })
  .catch((err) => {
    console.log(`Ошибка запроса данных карточек: ${err}`);
  })
const initialRequest = Promise.resolve(cardsRequest);
function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(userData.then((result) => { return result }).catch(() => {return {
    "name": "Изя",
    "about": "Шнипперсон",
    "avatar": "https://oir.mobi/uploads/posts/2020-01/1578161586_1-2.jpg",
    "_id": "a29965ee4a6c3634590e40bc",
    "cohort": "cohort-64"
};}));
  const [userEmail, setUserEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoPopupOpened, setIsInfoPopupOpened] = useState(false);
  const [isAuthOkay, setIsAuthOkay] = useState(false);
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    initialRequest
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    userData.then((result) => {
      setCurrentUser(result);
    })
    .catch((err) => {
      console.log(err);
    })
    checkToken();
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(evt) {
    setSelectedCard(evt.target);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoPopupOpened(false);
    setSelectedCard(null);
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    apiClass.toggleLike(card._id, isLiked ? 'DELETE' : 'PUT').then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    });
  }
  function handleCardDelete(card) {

    apiClass.deleteCard(card._id).then((res) => {
      if (res) {
        setCards((state) => state.filter((c) => c._id !== card._id));
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
  function handleUpdateUser(options) {
    apiClass.setUserInfo(options)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`ОШИБКА! ${err}`);
      });
  }
  function handleUpdateAvatar(options) {
    apiClass.changeAvatar(options)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`ОШИБКА! ${err}`);
      });
  }
  function handleAddPlace(options) {
    apiClass.setNewCard(options)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`ОШИБКА! ${err}`);
      });
  }

  //регистрация-авторизация
  function checkToken() {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      authApiClass.checkAuthorization(jwt)
        .then((result) => {
          setUserEmail(result.data.email);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
          setUserEmail('');
          setLoggedIn(false);
        })
    } else {
      setUserEmail('');
      setLoggedIn(false);
    }
  }
  function handleRegister(options) {
    authApiClass.registerUserRequest(options)
      .then(() => {
        handleLogin(options);
        setIsAuthOkay(true);
      })
      .catch((err) => {
        console.log(err);
        setIsAuthOkay(false);
      })
      .finally(() => {
        setIsInfoPopupOpened(true);
      })
  }

  function handleLogin(options) {
    authApiClass.authorizeUserRequest(options)
      .then((result) => {
        localStorage.setItem('jwt', result.token);
        setUserEmail(options.email);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleLogout() {
    localStorage.clear();
    checkToken();
  }

  //регистрация-авторизация

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page-wrapper">
        <Header loggedIn={loggedIn} userEmail={userEmail} onLogout={handleLogout}/>
        <CardsContext.Provider value={cards}>
          <Routes>
            <Route path='/' element={<ProtectedRouteElement element={Main}
              loggedIn={loggedIn}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              card={selectedCard}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete} />} />
            <Route path='/sign-in' element={<Login onLogin={handleLogin} loggedIn={loggedIn} />} />
            <Route path='/sign-up' element={<Register onRegister={handleRegister} loggedIn={loggedIn} />} />
          </Routes>
        </CardsContext.Provider>
        <Footer />
      </div>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser} />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace} />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar} />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups} />
      <InfoTooltip
        isOpen={isInfoPopupOpened}
        isOkay={isAuthOkay} 
        onClose={closeAllPopups}/>
    </CurrentUserContext.Provider>
  );
}

export default App;
