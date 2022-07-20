import './styles/index.css';

import { 
  btnEdit,
  btnAdd,
  cardSelector,
  initialCards,
  formValidators,
  config, 
  formConfiguration, 
  popupConfiguration, 
  cardsContainerSelector,
  newPlacePopupSelector,
  newPlaceFormName,
  profileFormName,
  profilePopopSelector,
  imagePopupSelector,
  profileConfiguration,
  viewPopupConfiguration
} from './constants.js';

import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import Section from './Section.js';
import { PopupWithForm } from './PopupWithForm.js';
import { PopupWithImage } from './PopupWithImage.js';
import { UserInfo } from './UserInfo.js';

//Привязываем валидацию ко всем формам
Array.from(document.forms).forEach((formElement) => {
  formValidators[formElement.name] = new FormValidator(config, formElement);
  formValidators[formElement.name].enableValidation();
});

const viewPopup = new PopupWithImage(
  imagePopupSelector,
  popupConfiguration,
  viewPopupConfiguration
  )

viewPopup.setEventListeners();

const makeItem = (item) => {
  const card = new Card({item}, cardSelector, viewPopup.open);
  return card.generateCard();
}

const cardsContainer = new Section({
  items: initialCards.reverse(),
  renderer: makeItem,
}, cardsContainerSelector);

cardsContainer.renderAll();

const handleCardSubmit = (item) => {
  cardsContainer.addItem(item);
}

const newCardPopup = new PopupWithForm(
  newPlacePopupSelector,
  newPlaceFormName,
  popupConfiguration,
  formConfiguration,
  formValidators[newPlaceFormName].clearUpForm,
  handleCardSubmit
  )

newCardPopup.setEventListeners();

const addCardOpen = () => {
  newCardPopup.open()
}

const user = new UserInfo(profileConfiguration);

//функция изменения имени и описания
function changeName(data) {
  user.setUserInfo(data);
}

const profilePopup = new PopupWithForm (
  profilePopopSelector,
  profileFormName,
  popupConfiguration,
  formConfiguration,
  formValidators[profileFormName].clearUpForm,
  changeName,
  user.getUserInfo
  );
profilePopup.setEventListeners();

const handleProfliePopupOpen = () => {
  profilePopup.open();
}

//слушатель открытия попап окна с добавлением элемента при нажатии на плюсик
btnAdd.addEventListener('click', addCardOpen);

btnEdit.addEventListener('click', handleProfliePopupOpen);