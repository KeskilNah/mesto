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
    this._getterCallBack = getterCallBack;
    this._formSelector = formSelector;
    this._errorsResetCallback = errorsResetCallback;
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitBtn = this._formElement.querySelector(this._submitBtnSelector);
    this._captionNormal = captionNormal;
    this._captionActive = captionActive;
    this.toggleSubmitBtnCaption = this.toggleSubmitBtnCaption.bind(this);
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
    return values;
  }

  _setInputValues = (values) => {
    this._inputs.forEach((inputElement) => {
      inputElement.value = values[inputElement.id.slice(6)];
    });
    
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._submitCallBack(
      this._getInputValues(),
      this.toggleSubmitBtnCaption,
      this.close);

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
// ???????????????? ?????????? PopupWithForm, ?????????????? ?????????????????? ???? Popup. ???????? ??????????:
// ?????????? ?????????????????? ???????????? ?????????????????? ?? ?????????????????????? ???????????? ?????????????? ??????????.
// ???????????????? ?????????????????? ?????????? _getInputValues, ?????????????? ???????????????? ???????????? ???????? ?????????? ??????????.
// ???????????????????????????? ???????????????????????? ?????????? setEventListeners. ?????????? setEventListeners ???????????? PopupWithForm ???????????? ???? ???????????? ?????????????????? ???????????????????? ?????????? ???????????? ????????????????, ???? ?? ?????????????????? ???????????????????? ?????????????? ??????????.
// ???????????????????????????? ???????????????????????? ?????????? close, ?????? ?????? ?????? ???????????????? ???????????? ?????????? ???????????? ?????? ?? ????????????????????????.
// ?????? ?????????????? ???????????? ???????????????????? ???????? ?????????????????? ???????????? PopupWithForm.