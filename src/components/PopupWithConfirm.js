import { Popup } from './Popup.js';

export class PopupWithConfirm extends Popup {
  constructor (
    popupSelector,
    popupConfig,
    formSelector,
    submitButtonSelector,
    handleSubmitCallback,
    {captionNormal, captionActive}
    ) {
    super(popupSelector, popupConfig);
    this._formSelector = formSelector;
    this._handleConfirm = handleSubmitCallback;
    this._formElement = this._popup.querySelector(this._formSelector);
    this._captionActive = captionActive;
    this._captionNormal = captionNormal;
    this.toggleSubmitBtnCaption = this.toggleSubmitBtnCaption.bind(this);
    this._submitButton = this._popup.querySelector(submitButtonSelector);
    this._submitCallbacks = {
      toggleBtnCallback: this.toggleSubmitBtnCaption,
      removeCardCallback: () => {},
      closeConfirmCallback: this.close,
    };
    // this.open = this.open.bind(this);
    // this.close = this.close.bind(this);
    console.log(this)
  }

  toggleSubmitBtnCaption (state) {
    this._submitButton.textContent = state
    ? this._captionActive
    : this._captionNormal;
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._handleConfirm(this._id, this._submitCallbacks);
  }

  open = (id, deleteCardCallback) => {
    this._id = id;
    this._submitCallbacks.removeCardCallback = deleteCardCallback;
    super.open();
  }

  close = () => {
    super.close();
    this._id = null;
    this._submitCallbacks.removeCardCallback = () => {};
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._handleSubmit);
  }

}
// Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
// Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
// Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
// Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
// Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
// Для каждого попапа создавайте свой экземпляр класса PopupWithForm.