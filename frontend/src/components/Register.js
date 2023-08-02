import { Link } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { useState } from "react";
function Register(props) {
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    function handleEmailInput(evt) {
        setRegisterEmail(evt.target.value);
    }
    function handlePasswordInput(evt) {
        setRegisterPassword(evt.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister({
            'password': registerPassword,
            'email': registerEmail,
        });
    }
    return (
        <>
            {!props.loggedIn ? <main>
                <h1 className="page-title">Регистрация</h1>
                <form onSubmit={handleSubmit} action="post" className="form authorization-form" name={`login-form`} noValidate>
                    <input type='email' value={registerEmail} onChange={handleEmailInput} className="authorization-form__input" placeholder="Email"></input>
                    <input type='password' value={registerPassword} onChange={handlePasswordInput} className="authorization-form__input" placeholder="Пароль"></input>
                    <button type="submit" className="authorization-form__button">Зарегистрироваться</button>
                    <p className="authorization-disclaimer">Уже зарегистрированы? <Link to={"/sign-in"} className="authorization-disclaimer__link">Войти</Link></p>

                </form>
            </main> : <Navigate to={'/'} />}
        </>
    )
}
export default Register;