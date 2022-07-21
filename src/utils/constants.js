export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
]; 

export const btnEdit = document.querySelector('.profile__edit');
export const btnAdd = document.querySelector('.profile__button');
export const imgPopup = document.querySelector('.image-popup');
export const cardSelector = '.item-template';
export const formValidators = {};

export const config = ({
  formSelector: 'popup__form',
  inputSelector: 'popup__input',
  submitButtonSelector: 'popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 

export const formConfiguration = {
  inputSelector: '.popup__input',
  submitBtnSelector: '.popup__button',
}

export const popupConfiguration = {
  activeModifier: 'popup_opened',
  closeBtnName: 'popup__close',
}

export const profileConfiguration = {
  titleSelector: '.profile__title',
  jobSelector: '.profile__subtitle',
}

export const viewPopupConfiguration = {
  imageSelector: '.image-popup__pic',
  captionSelector: '.image-popup__title',
};

export const cardsContainerSelector = '.gallery__items';
export const newPlacePopupSelector = '.adding-popup';
export const profilePopopSelector = '.edit-popup';
export const imagePopupSelector = '.image-popup';
export const newPlaceFormName = 'adding-form';
export const profileFormName = 'edit-form';
export const newPlaceFormSelector = 'adding-popup__form';
export const profileFormSelector = 'edit-popup__form';