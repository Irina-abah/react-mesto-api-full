import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar-info">
                    <img className="profile__avatar" src={currentUser.avatar} alt="Фотография исследователя" />
                    <button className="button button_type_avatar-edit" onClick={props.onEditAvatar} type="button" aria-label="edit avatar photo" />
                </div>
                <div className="profile__info">
                    <div className="profile__bio">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="button button_type_edit" onClick={props.onEditProfile} type="button" aria-label="edit" />
                    </div>
                    <p className="profile__title">{currentUser.about}</p>
                </div>
                <button className="button button_type_add" onClick={props.onAddPlace} type="button" aria-label="add" />
            </section>
            <section className="places">
                <ul className="places__list">
                {
                props.cards.map((card, i) => (
                    <Card
                    key={card._id}
                    onCardLike={props.onCardLike}
                    onCardDelete={props.onCardDelete}
                    onCardClick={props.onCardClick}
                    card={card}
                    />
                )).reverse()
                }
                </ul>
            </section>
      </main>
    )
};
  
  export default Main; 

