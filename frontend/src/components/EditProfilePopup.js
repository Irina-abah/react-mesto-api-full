import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleNameChange(evt) {
        setName(evt.target.value)
    }

    function handleDescriptionChange(evt) {
        setDescription(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onUpdateUser({
            name: name,
            about: description,
          });
    }

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser]); 
    
    return (
        <PopupWithForm 
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            name="edit">
                <h2 className="popup__title">Редактировать профиль</h2>
                <input 
                    type="text" 
                    className="popup__input popup__input_type_profile-name-name" 
                    id="profile-name"
                    name="name"
                    value={name || ""} 
                    onChange={handleNameChange}
                    placeholder="Ваше имя"
                    minLength="2" 
                    maxLength="40" 
                    required 
                />
                <span 
                    className="input-error" 
                    id="profile-name-error">
                </span>
                <input 
                    type="text" 
                    className="popup__input popup__input_type_profile-title" 
                    id="profile-title"
                    name="about" 
                    value={description || ""} 
                    onChange={handleDescriptionChange}
                    placeholder="Чем Вы занимаетесь"
                    minLength="2" 
                    maxLength="200" 
                    required 
                />
                <span 
                    className="input-error" 
                    id="profile-title-error">
                </span>
                <button 
                    type="submit" 
                    className="button button_type_submit">
                    Сохранить
                </button>
        </PopupWithForm>
    )
};

export default EditProfilePopup;
