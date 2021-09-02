import React from 'react';
import logoPath from '../images/logo.svg';
import { Route, Link, useHistory } from "react-router-dom";

function Header(props) {

    const history = useHistory();

    function signOut() {
        localStorage.removeItem('jwt');
        history.push('/signin');
    }
    return (
      <header className="header">
            <a className="header__link" href="/" target="_blank">
            <img className="header__logo" src={logoPath} alt="Логотип портала Mesto" />
            </a>
            <Route path="/signin">
                <Link className="header__link header__menu-link" to="/signup">Регистрация</Link>
            </Route>
            <Route path="/signup">
                <Link className="header__link header__menu-link" to="/signin">Войти</Link>
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