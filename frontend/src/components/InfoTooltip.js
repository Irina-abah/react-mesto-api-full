import React from 'react';
import PopupWithForm from './PopupWithForm';
import successLogo from '../images/success-icon.svg';
import errorLogo from '../images/error-icon.svg';

function infoTooltip(props) {

    return (
        
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            name="infoTooltip">
                <div className="popup__reg">
                    <img className="popup__reg-status" src={props.isRegistered ? successLogo : errorLogo} alt="Статус регистрации" />
                    <h2 className="popup__title popup__title_type_reg">{props.isRegistered ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
                </div>
        </PopupWithForm>
    )
};

export default infoTooltip;