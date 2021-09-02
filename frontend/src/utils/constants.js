// поля попапов
const editFormElement = document.querySelector(".popup__input-container_type_edit");
const addFormElement = document.querySelector(".popup__input-container_type_add");
const editAvatarElement = document.querySelector(".popup__input-container_type_avatar");
const confirmDeleteElement = document.querySelector(".popup__input-container_type_confirm");
const placeInputTitle = addFormElement.querySelector(".popup__input_type_place-title");
const placeInputLink = addFormElement.querySelector(".popup__input_type_place-image");

const inputName = document.querySelector("#profile-name");
const inputTitle = document.querySelector("#profile-title");

const cards = document.querySelector(".places__list");

const popupSaveProfileButton = editFormElement.querySelector(".button_type_submit");
const popupSaveCardButton = addFormElement.querySelector(".button_type_submit");
const popupSaveAvatarButton = editAvatarElement.querySelector(".button_type_submit");
const popupConfirmDeleteButton = confirmDeleteElement.querySelector(".button_type_submit");

const ESCAPE_KEY = "Escape";

// валидация
const validationConfig = {
    formSelector: ".popup__input-container",
    inputSelector: ".popup__input",
    inputErrorClass: "popup__input_state_invalid",
    submitButtonSelector: ".button_type_submit",
    inactiveButtonClass: "button_type_submit-disabled",
    errorClass: ".input__error"
};

const cardTemplateData = {
    cardSelector: ".place",
    deleteButtonSelector: ".button_type_delete",
    cardImage: "place__image",
    cardName: ".place__title",
    cardLikeInactive: "place__like",
    cardLikeActive: ".place__like_active",
    cardLikeCounter: ".place__like-count"
}

export { editFormElement, addFormElement, editAvatarElement, placeInputTitle, placeInputLink, inputName, inputTitle, cards, ESCAPE_KEY, validationConfig, cardTemplateData, popupSaveProfileButton, popupSaveCardButton, popupSaveAvatarButton, confirmDeleteElement, popupConfirmDeleteButton }