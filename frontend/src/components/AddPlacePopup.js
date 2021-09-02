import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

    const [cardName, setCardName] = React.useState('');
    const [cardLink, setCardLink] = React.useState('');

    function handleCardNameChange(evt) {
        setCardName(evt.target.value)
    }

    function handleCardLink(evt) {
        setCardLink(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onAddPlace({
            name: cardName,
            link: cardLink,
          });
        }

    React.useEffect(() => {
        if (!props.isOpen) {
            setCardName('');
            setCardLink('');
        }
    },[props.isOpen]);

    return (
        <PopupWithForm 
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            name="add">
            <h2 className="popup__title">Новое место</h2>
            <input 
                type="text" 
                className="popup__input popup__input_type_place-title" 
                id="place-title"
                name="name" 
                value={cardName || ""}
                onChange={handleCardNameChange}
                placeholder="Название" 
                title="Вы пропустили это поле" 
                minLength="2"
                maxLength="30" 
                required />
            <span 
                className="input-error" 
                id="place-title-error">
            </span>
            <input 
                type="url" 
                className="popup__input popup__input_type_place-image" 
                id="place-image"
                name="link"
                value={cardLink || ""}
                onChange={handleCardLink} 
                placeholder="Ссылка на картинку" 
                title="Введите адрес сайта" 
                required 
            />
            <span 
                className="input-error" 
                id="place-image-error">
            </span>
            <button 
                type="submit" 
                className="button button_type_submit">
                Создать
            </button>
        </PopupWithForm>
    )
};

export default AddPlacePopup;