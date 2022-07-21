export class Popup {
  constructor(popupSelector, {activeModifier, closeBtnName}) {
    this._popupSelector = document.querySelector(popupSelector);
    this._activeModifier = activeModifier;
    this._closeBtnName = closeBtnName;
    // console.dir(this._popupSelector);
  }

  //закрытие попапа клавишей Esc
  _handleEscClose = (evt) => {;
    if (evt.key === 'Escape') {
      this.close();
  }
}
  setEventListeners() {
    this._popupSelector.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains(this._activeModifier)) {
        this.close();
      }
      if (evt.target.classList.contains(this._closeBtnName)) {
        this.close();
      }
    })
    
  }
  open() {
    this._popupSelector.classList.add(this._activeModifier);
    document.addEventListener('keydown', this._handleEscClose);
  };

  close() {
    this._popupSelector.classList.remove(this._activeModifier);
    document.removeEventListener('keydown', this._handleEscClose);
  };

}


// Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
// Принимает в конструктор единственный параметр — селектор попапа.
// Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
// Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
// Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.