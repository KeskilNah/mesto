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
export const avatarEdit = document.querySelector('.profile__avatar-edit');
export const avatarImg = document.querySelector('.profile__avatar-edit-image');
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

export const avatarConfiguration = {
  avatarSelector: '.profile__avatar'
}

export const profileConfiguration = {
  titleSelector: '.profile__title',
  jobSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar'
}

export const viewPopupImgConfiguration = {
  imageSelector: '.image-popup__pic',
  captionSelector: '.image-popup__title',
};

export const viewPopupDelConfiguration = {
  imageSelector: '.image-popup__pic',
  captionSelector: '.image-popup__title',
};

export const confirmButtonConfig = {
  captionNormal: 'Да',
  captionActive: 'Удаление...',
}

export const newCardButtonConfig = {
  captionNormal: 'Создать',
  captionActive: 'Сохранение...',
}

export const saveButtonConfig = {
  captionNormal: 'Сохранить',
  captionActive: 'Сохранение...',
}

export const cardsContainerSelector = '.gallery__items';
export const newPlacePopupSelector = '.adding-popup';
export const profilePopopSelector = '.edit-popup';
export const imagePopupSelector = '.image-popup';
export const avatarPopupSelector = '.avatar-popup';
export const deletePopupSelector = '.delete-popup';
export const newPlaceFormName = 'adding-form';
export const avatarFormName = 'avatar-form';
export const profileFormName = 'edit-form';
export const deleteFormName = 'delete-form';
export const deleteFormSelector = 'delete-popup__form';
export const newPlaceFormSelector = 'adding-popup__form';
export const profileFormSelector = 'edit-popup__form';

export const options = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-45',
  headers: {
    authorization: 'de4ccc24-3897-4b25-93ca-7c2376f1a4ac',
    'Content-Type': 'aplication/json',
  },
};

// export const getUserInfomation = {
//   url: 'https://mesto.nomoreparties.co/v1/cohort-45/users/me',
//   headers: {
//     'authorization': 'de4ccc24-3897-4b25-93ca-7c2376f1a4ac'
//   }
// };