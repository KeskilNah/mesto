import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor (
    popupSelector,
    formName,
    popupConfig,
    {inputSelector, submitBtnSelector, formSelector},
    errorsResetCallback,
    submitCallBack,
    {captionNormal, captionActive},
    getterCallBack = null
    ) {
    super(popupSelector, popupConfig);
    this._formName = formName;
    this._submitCallBack = submitCallBack;
    this._inputSelector = inputSelector;
    this._submitBtnSelector = submitBtnSelector;
    // console.log(this._formName)
    this._getterCallBack = getterCallBack;
    this._formSelector = formSelector;
    this._errorsResetCallback = errorsResetCallback;
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitBtn = this._formElement.querySelector(this._submitBtnSelector);
    this._captionNormal = captionNormal;
    this._captionActive = captionActive;
    this.toggleSubmitBtnCaption = this.toggleSubmitBtnCaption.bind(this);
    console.log(this)
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  toggleSubmitBtnCaption(state) {
    this._submitBtn.textContent = state ? this._captionActive : this._captionNormal;
  }

  _getInputValues = () => {
    const values = {};
    this._inputs.forEach((inputElement) => {
      values[inputElement.id.slice(6)] = inputElement.value;
    });
    console.log(values, this._inputs)
    return values;
  }

  _setInputValues = (values) => {
    this._inputs.forEach((inputElement) => {
      inputElement.value = values[inputElement.id.slice(6)];
    });
    
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(this._submitCallBack)
    this._submitCallBack(
      this._getInputValues(),
      this.toggleSubmitBtnCaption,
      this.close);
    this.close();

  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._handleSubmit);
  }

  open() {
    
    if(this._getterCallBack) {
      this._setInputValues(this._getterCallBack());
    } else {
      this._formElement.reset();
    }
    this._errorsResetCallback();
    super.open();
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
// Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
// Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
// Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
// Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
// Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
// Для каждого попапа создавайте свой экземпляр класса PopupWithForm.