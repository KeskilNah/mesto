import './index.css';

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
} from '../utils/constants.js';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';

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