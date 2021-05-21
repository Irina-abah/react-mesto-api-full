import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup(props) {

    function handleSubmit(evt) {
        evt.preventDefault();
      
        props.onConfirmDetete();
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            name="confirm">
            <h2 className="popup__title">Вы уверены?</h2>
            <button 
                type="submit" 
                className="button button_type_submit">
                Да
            </button>
        </PopupWithForm>
    )
};

export default ConfirmPopup;