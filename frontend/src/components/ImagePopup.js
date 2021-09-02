function ImagePopup(props) {

    function handleOverlayClose(evt) {
        if (evt.target.classList.contains('popup')) {
            props.onClose()
        }
    }

    return (
        <div className={`popup popup_type_preview ${props.card ? "popup_opened" : ""}`} onMouseDown={handleOverlayClose}>
            <div className="popup__image-info">
                <button type="button" className="button button_type_close button_type_close-preview" aria-label="close" onClick={props.onClose}/>
                <img className="popup__image" src={props.card ? props.card.link : ""} alt={props.card ? props.card.name : ""} />
                <h2 className="popup__image-title">{props.card ? props.card.name : ""}</h2>
            </div>
        </div> 
    )
};

export default ImagePopup;