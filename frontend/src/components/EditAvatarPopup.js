import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

    const avatarRef = React.useRef();

    function handleSubmit(evt) {
        evt.preventDefault();
      
        props.onUpdateAvatar({
          avatar: avatarRef.current.value
        });
      } 

    return (
        <PopupWithForm 
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            name="avatar">
            <h2 className="popup__title">Обновить аватар</h2>
            <input 
                type="url" 
                className="popup__input popup__input_type_profile-avatar" 
                id="profile-avatar"
                name="avatar" 
                placeholder="Ссылка на фото" 
                title="Введите URL адрес фото" 
                ref={avatarRef}
                required 
            />
            <span 
                className="input-error" 
                id="profile-avatar-error">
            </span>
            <button 
                type="submit" 
                className="button button_type_submit">
                Сохранить
            </button>
        </PopupWithForm>
    )
};

export default EditAvatarPopup;