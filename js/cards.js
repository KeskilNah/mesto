import { openPopup, imgPopup} from './index.js';

export class Card {
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
    this._image = this._element.querySelector('.item__image');
    this._text = this._element.querySelector('.item__text');
    this._delete = this._element.querySelector('.item__delete');
    this._like = this._element.querySelector('.item__like');
    this._pic = imgPopup.querySelector('.image-popup__pic');
    this._title = imgPopup.querySelector('.image-popup__title');
    this._setEventListeners();
    this._image.alt = this._name;
    this._image.src = this._link;
    this._text.textContent = this._name;
    return this._element;
  }

  _setEventListeners() {
    this._delete.addEventListener('click', () => {
      this._handleDeleteCard();
    });
    this._image.addEventListener('click', () => {
      this._openPopupImg();
    });
    this._like.addEventListener('click', () => {
      this._handleLike();
    });
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleLike() {
    this._like.classList.toggle('item__like_active');
  }

  _openPopupImg() {
    this._pic.src = this._link;
    this._pic.alt = this._name;
    this._title.textContent = this._name;
    openPopup(imgPopup);
  }
  
}