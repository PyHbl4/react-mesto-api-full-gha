import { Navigate } from "react-router-dom";
import { useState } from "react";
function Login(props) {
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
        props.onLogin({
            'password': registerPassword,
            'email': registerEmail,
        });
    }
    return (
        <>
            {!props.loggedIn ?
                <main>
                    <h1 className="page-title">Вход</h1>
                    <form onSubmit={handleSubmit} action="post" className="form authorization-form" name={`login-form`} noValidate>
                        <input onChange={handleEmailInput} value={registerEmail} type='email' className="authorization-form__input" placeholder="Email"></input>
                        <input onChange={handlePasswordInput} value={registerPassword} type='password' className="authorization-form__input" placeholder="Пароль"></input>
                        <button type="submit" className="authorization-form__button">Войти</button>
                    </form>
                </main> : <Navigate to={'/'} />}
        </>
    )
}
export default Login;