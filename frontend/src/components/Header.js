import React from 'react';
import logoPath from '../images/logo.svg';
import { Route, Link, useHistory } from "react-router-dom";

function Header(props) {

    const history = useHistory();

    function signOut() {
        localStorage.removeItem('jwt');
        history.push('/sign-in');
    }
    return (
      <header className="header">
            <a className="header__link" href="#" target="_blank">
            <img className="header__logo" src={logoPath} alt="Логотип портала Mesto" />
            </a>
            <Route path="/sign-in">
                <Link className="header__link header__menu-link" to="/sign-up">Регистрация</Link>
            </Route>
            <Route path="/sign-up">
                <Link className="header__link header__menu-link" to="/sign-in">Войти</Link>
            </Route>
            <Route exact path="/">
            <ul className="header__navigation">
                <li><p className="header__email">{props.email}</p></li>
                <li><button className="button button_type_logout" onClick={signOut}>Выйти</button></li>
            </ul>
            </Route>
            
        </header>
    )
};

export default Header; 