export class Card {
  constructor(
    {name, link, _id, likes, owner},
    cardSelector,
    userId,
    {handleOpenCallback, handleLikeCallback, handleDeleteCallback }) {

    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector
    this._id = _id;
    this._userId = userId;
    this._isOwner = userId === owner._id;
    this._likes = likes;
    this._handleOpenCallback = handleOpenCallback;
    this._handleLikeCallback = handleLikeCallback;
    this._handleDeleteCallback = handleDeleteCallback;
    this.setLikes = this.setLikes.bind(this);
    this._templateElement = document.querySelector(this._cardSelector).content.querySelector('.item');


  }
  _getTemplate() {
    const itemCell = this._templateElement.cloneNode(true);
   return itemCell;
  }
  
  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.item__image');
    this._text = this._element.querySelector('.item__text');
    this._deleteButton = this._element.querySelector('.item__delete');
    this._likeButton = this._element.querySelector('.item__like');
    this._likeCount = this._element.querySelector('.item__number');
    this._setEventListeners();
    this._image.alt = this._name;
    this._image.src = this._link;
    this._likeCount.textContent = this._likes.length;
    this._text.textContent = this._name;
    return this._element;
  }

  // Проверка лайкнул ли пользователь карточку
  _isLiked() {
    return this._likes.map((item) => item._id).includes(this._userId)
  }

  _renderLikes() {
    if (this._isLiked()) {
      this._likeButton.classList.add('item__like_active');
    } else {
      this._likeButton.classList.remove('item__like_active');
    }
    this._likesCount.textContent = this._likes.length;
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    this._renderLikes();
  }

  _handleLikeButtonClick = () => {
    this._handleToggle(this._id, this._isLiked(), this.setLikes);
  }

  _handleImageClick = () => {
    this._openPopupImage({name: this._name, link: this._link});
  }

  removeCard = () => {
    this._element.remove();
    this._element = null;
  }

  _handleDeleteClick = () => {
    this._handleCardDelete(this._id, this.removeCard);
  }
  


  _setEventListeners() {
    this._image.addEventListener('click', this._handleImageClick);
    this._likeButton.addEventListener('click', this._handleLikeButtonClick);

    if (this._isOwner) {
      this._deleteButton.addEventListener("click", this._handleDeleteClick);
    } else {
      this._deleteButton.remove();
    }
  }

}

// Свяжите класс Card c попапом. Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick. Эта функция должна открывать попап с картинкой при клике на карточку.