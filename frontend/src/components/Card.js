import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);
    
    const isOwn = props.card.owner === currentUser._id;
    const cardDeleteButtonClassName = (
    `button button_type_delete ${isOwn ? 'button_type_delete-active' : ''}`
    ); 
    
    const isLiked = props.card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = `button place__like ${isLiked ? 'place__like_active' : ''}`; 

    const notLiked = props.card.likes.length === 0;
    const noLikesCountClassName = `place__like-count ${notLiked ? '' : 'place__like-count_active'}`; 
    
    function handleClick() {
        props.onCardClick(props.card);
      };

    function handleLikeClick() {
        props.onCardLike(props.card);
      };

    function handleDeleteClick() {
        props.onCardDelete(props.card);
      };

    return (
        <li className="place">
            <button className={cardDeleteButtonClassName} type="button" aria-label="delete" onClick={handleDeleteClick}/>
            <img className="place__image" src={props.card.link} alt={`На фото изображено ${props.name}`} onClick={handleClick} />
            <div className="place__info">
                <h2 className="place__title">{props.card.name}</h2>
                <div className="place__likes">
                    <button className={cardLikeButtonClassName} type="button" aria-label="like" onClick={handleLikeClick}/>
                    <p className={noLikesCountClassName}>{props.card.likes.length}</p>
                </div>
            </div>
      </li>
    )
};

export default Card;