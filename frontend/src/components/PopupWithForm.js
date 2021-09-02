function PopupWithForm(props) {

    function handleOverlayClose(evt) {
        if (evt.target.classList.contains('popup')) {
            props.onClose()
        }
    }

    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`} onMouseDown={handleOverlayClose}>
            <div className="popup__container">
                <button type="button" className="button button_type_close" onClick={props.onClose} aria-label="close"> 
                </button>
                <form className={`popup__input-container popup__input-container_type_${props.name}`} name={props.name} onSubmit={props.onSubmit} noValidate>
                    {props.children}
                </form>
            </div>
        </div> 
    )
};

export default PopupWithForm;