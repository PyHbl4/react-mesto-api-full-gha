import React from 'react';
import appLogo from '../images/logo.svg';
import { NavLink } from 'react-router-dom';
function Header(props) {
  return (
    <header className="header">
      <img src={appLogo} alt="логотип" className="header__logo" />
      {props.loggedIn ?
        <div className='header__user-info'>
          <span>{props.userEmail}</span>
          <button onClick={props.onLogout} type='button' className='header__logout-button'>Выйти</button>
        </div> :
        <nav className="header__nav-links">
          <NavLink to="/sign-in" className={({ isActive }) => `header__link ${isActive ? "header__link_hide" : ""}`}>Войти</NavLink>
          <NavLink to="/sign-up" className={({ isActive }) => `header__link ${isActive ? "header__link_hide" : ""}`}>Регистрация</NavLink>
        </nav>
      }
    </header>
  )
}
export default Header;