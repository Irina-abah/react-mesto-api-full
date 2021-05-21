import React from 'react';
import { Link } from "react-router-dom";

function Register(props) {
    const [userData, setUserData] = React.useState({
      email: '',
      password: ''
    });

    
    const handleChange = (evt) => {
      const { name, value } = evt.target;
      setUserData({
        ...userData,
        [name]: value
      })
    }

    const handleSubmit = (evt) => {
      evt.preventDefault();
      props.onRegister(userData)
    }

    return (
        <section className="popup__container popup__container_type_sign">
            <form className="popup__input-container" onSubmit={handleSubmit} noValidate>
                <h2 className="popup__title popup__title_type_sign">Регистрация</h2>
                <input 
                    type="email" 
                    className="popup__input popup__input_type_sign" 
                    id="email"
                    name="email" 
                    value={userData.email}
                    onChange={handleChange}
                    placeholder="Email" 
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    title="Введите Ваш email" 
                    required />
                <span 
                    className="input-error" 
                    id="email-error">
                </span>
                <input 
                    type="password" 
                    className="popup__input popup__input_type_sign" 
                    id="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange} 
                    placeholder="Пароль" 
                    minLength="10"
                    title="Введите Ваш пароль" 
                    required 
                />
                <span 
                    className="input-error" 
                    id="password-error">
                </span>
                <button type="submit" className="button button_type_sign">Зарегистрироваться
                </button>
                 <p className="popup__message">Уже зарегистрированы? <Link to="/sign-in" className="header__link popup__link">Войти</Link>
                 </p>
            </form>
        </section>
    )  
      
}

export default Register; 