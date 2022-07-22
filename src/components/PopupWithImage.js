import { Popup } from './Popup.js';


export class PopupWithImage extends Popup {
  constructor (popupSelector, popupConfig, {imageSelector, captionSelector}) {
    super(popupSelector, popupConfig);
    this._imageSelector = imageSelector;
    this._captionSelector = captionSelector;
    this._imageElement = this._popup.querySelector(this._imageSelector);
    this._captionElement = this._popup.querySelector(this._captionSelector);
  }

  open = ({name, link}) => {
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._captionElement.textContent = name;
    super.open();
  }
}

// Создайте класс PopupWithImage, который наследует от Popup. Этот класс должен перезаписывать родительский метод open. В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.