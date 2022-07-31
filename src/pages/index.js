import './index.css';

import { 
  btnEdit,
  btnAdd,
  avatarEdit,
  cardSelector,
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
  viewPopupImgConfiguration,
  options,
  avatarPopupSelector,
  avatarFormName,
  deletePopupSelector,
  deleteFormSelector,
  confirmButtonConfig,
  newCardButtonConfig,
  saveButtonConfig
} from '../utils/constants.js';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js'
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';


const api = new Api({url: options.url, headers: options.headers})

const viewPopup = new PopupWithImage(
  imagePopupSelector,
  popupConfiguration,
  viewPopupImgConfiguration
  )

viewPopup.setEventListeners();

function handleLikeCard (cardId, isLiked, setLikesCallback) {
  api
    .toggleLike(cardId, isLiked)
    .then(({likes}) => setLikesCallback(likes))
}

function handleDeleteCard(id, {toggleBtnCallback, removeCardCallback, closeConfirmCallback}) {
  toggleBtnCallback(true);
  api.deleteCard(id).then(() => {
    removeCardCallback();
    closeConfirmCallback();
  }) .catch(console.log())
  .finally(() => {
    toggleBtnCallback(false);
  })
}

const сonfirmationDeletePopup = new PopupWithConfirm(
  deletePopupSelector,
  popupConfiguration,
  deleteFormSelector,
  formConfiguration.submitBtnSelector,
  handleDeleteCard,
  confirmButtonConfig
)

сonfirmationDeletePopup.setEventListeners()

const newCardCallbacks = {
  handleOpenCallback: viewPopup.open,
  handleLikeCallback: handleLikeCard,
  handleDeleteCallback: сonfirmationDeletePopup.open, 

};

const handleCardSubmit = (item, toggleBtnCallback, closePopupCallback) => {
  toggleBtnCallback(true);
  api
    .setCard(item)
    .then((card) => {
      cardsContainer.addItem(card);
      closePopupCallback();
    })
    .catch(console.log)
    .finally(() => {
      toggleBtnCallback(false);
    });
}

const makeItem = (item) => {
  const card = new Card(
    item,
    cardSelector,
    user.id,
    newCardCallbacks
    );
  return card.generateCard();
}

const cardsContainer = new Section(
  {
    renderer: makeItem,
  },
  cardsContainerSelector
);

Promise.all([api.getUserInfo(), api.getCards()])
  .then
    (([info, initialCards]) => {
      user.setUserInfo(info);
      cardsContainer.renderItems(initialCards);
    })
  .catch((err) => {
    console.log(err);
  })

//Привязываем валидацию ко всем формам
Array.from(document.forms).forEach((formElement) => {
  formValidators[formElement.name] = new FormValidator(config, formElement);
  formValidators[formElement.name].enableValidation();
});

const newCardPopup = new PopupWithForm(
  newPlacePopupSelector,
  newPlaceFormName,
  popupConfiguration,
  formConfiguration,
  formValidators[newPlaceFormName].clearUpForm,
  handleCardSubmit,
  newCardButtonConfig,
  )

newCardPopup.setEventListeners();


const user = new UserInfo(profileConfiguration);

const editingAvatarPopup = new PopupWithForm(
  avatarPopupSelector,
  avatarFormName,
  popupConfiguration,
  formConfiguration,
  formValidators[avatarFormName].clearUpForm,
  handleAvatarSubmit,
  saveButtonConfig
  );

editingAvatarPopup.setEventListeners();

function handleAvatarSubmit(data, toggleBtnCallback, closePopupCallback) {
  toggleBtnCallback(true);
  api
    .editAvatar(data)
    .then((res) => {
      user.setUserInfo(res);
      closePopupCallback();
    })
    .catch(console.log)
    .finally(() => toggleBtnCallback(false))
}

function handleSubmitProfile(data, toggleBtnCallback, closePopupCallback) {
  toggleBtnCallback(true);
  api
    .editProfile(data)
    .then((data) => {
      user.setUserInfo(data);
      closePopupCallback();
    })
    .catch(console.log)
    .finally(() => toggleBtnCallback(false));
}

const profilePopup = new PopupWithForm (
  profilePopopSelector,
  profileFormName,
  popupConfiguration,
  formConfiguration,
  formValidators[profileFormName].clearUpForm,
  handleSubmitProfile,
  saveButtonConfig,
  user.getUserInfo
  );

profilePopup.setEventListeners();

  const editAvatarOpen = () => {
    editingAvatarPopup.open();
  }

const addCardOpen = () => {
  newCardPopup.open()
}

const handleProfliePopupOpen = () => {
  profilePopup.open();
}

//слушатель открытия попап окна с добавлением элемента при нажатии на плюсик
btnAdd.addEventListener('click', addCardOpen);

btnEdit.addEventListener('click', handleProfliePopupOpen);

avatarEdit.addEventListener('click', editAvatarOpen);