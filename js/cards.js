import { openPopup, imgPopup} from './script.js';

const initialCards = [
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

class Card {
  constructor(name, link, templateElement) {
    this._name = name;
    this._link = link;
    this._templateElement = templateElement;
  }
  _getTemplate() {
    const itemCell = document.querySelector(this._templateElement).content.querySelector('.item').cloneNode(true);
   return itemCell;
  }
  
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.item__image').alt = this._name;
    this._element.querySelector('.item__image').src = this._link;
    this._element.querySelector('.item__text').textContent = this._name;
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.item__delete').addEventListener('click', () => {
      this._handleDeleteCard();
    });
    this._element.querySelector('.item__image').addEventListener('click', () => {
      this._openPopupImg();
    });
    this._element.querySelector('.item__like').addEventListener('click', () => {
      this._handleLike();
    });
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleLike() {
    this._element.querySelector('.item__like').classList.toggle('item__like_active');
  }

  _openPopupImg() {
    imgPopup.querySelector('.image-popup__pic').src = this._link;
    imgPopup.querySelector('.image-popup__pic').alt = this._name;
    imgPopup.querySelector('.image-popup__title').textContent = this._name;
    openPopup(imgPopup);
  }
  
}

export { initialCards, Card};