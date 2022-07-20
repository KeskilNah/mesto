export class Card {
  constructor({item}, templateSelector, openPopupImage) {
    this._name = item.name;
    this._link = item.link;
    this._templateSelector = templateSelector
    this._templateElement = document.querySelector(this._templateSelector).content.querySelector('.item');
    this._openPopupImage = openPopupImage;
    
  }
  _getTemplate() {
    const itemCell = this._templateElement.cloneNode(true);
   return itemCell;
  }
  
  _handleLike = () => {
    this._like.classList.toggle('item__like_active');
  }

  _handleDeleteCard = () => {
    this._element.remove();
    this._element = null;
  }

  _handleCardClick = () => {
    this._openPopupImage({name: this._name, link: this._link});
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.item__image');
    this._text = this._element.querySelector('.item__text');
    this._delete = this._element.querySelector('.item__delete');
    this._like = this._element.querySelector('.item__like');
    this._setEventListeners();
    this._image.alt = this._name;
    this._image.src = this._link;
    this._text.textContent = this._name;
    return this._element;
  }
  _setEventListeners() {
    this._delete.addEventListener('click', this._handleDeleteCard);
    this._image.addEventListener('click', this._handleCardClick);
    this._like.addEventListener('click', this._handleLike);
  }

}

// Свяжите класс Card c попапом. Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick. Эта функция должна открывать попап с картинкой при клике на карточку.