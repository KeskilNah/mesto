const config = ({
  formSelector: 'popup__form',
  inputSelector: 'popup__input',
  submitButtonSelector: 'popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 

const showInputError = (inputConfig) => {
  const {formElement, inputElement, errorMessage, errorClass, inputErrorClass} = inputConfig;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, errorClass, inputErrorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '&nbsp';
};

const isValid = (formElement, inputElement, errorClass, inputErrorClass) => {
  const errorMessage = inputElement.validationMessage;
  if(!inputElement.validity.valid) {
    showInputError({formElement, inputElement, errorMessage, errorClass, inputErrorClass});
  } else {
    hideInputError(formElement, inputElement, errorClass, inputErrorClass);
  }
};

const setEventListeners = (formElement, validConfig) => {
  const {inputSelector, submitButtonSelector, errorClass, inputErrorClass, inactiveButtonClass} = validConfig;
  const inputList = Array.from(formElement.querySelectorAll(`.${inputSelector}`));
  const buttonElement = formElement.querySelector(`.${submitButtonSelector}`);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement, errorClass, inputErrorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};


const enableValidation = (validConfig) => {
  const {formSelector} = validConfig;
  const formList = Array.from(document.querySelectorAll(`.${formSelector}`));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validConfig);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'true');
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled', 'true');
  }
}; 

enableValidation(config);