import './index.css';

import { 
  btnEdit,
  btnAdd,
  avatarEdit,
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
  viewPopupImgConfiguration,
  options,
  avatarPopupSelector,
  avatarFormName,
  avatarImg,
  avatarConfiguration,
  deletePopupSelector,
  deleteFormName,
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
import { Avatar } from '../components/Avatar.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';


const api = new Api({url: options.url, headers: options.headers})

// const newItems = api.getCards().then((res) => {
  
//   return newItems;
// })
// console.log(`AAAA${newItems}`)
// const cardsContainer = new Section({
//   items: newItems.map(item => item).reverse(),
//   renderer: makeItem,
// }, cardsContainerSelector)

// cardsContainer.renderAll();

api.getUserInfo().then((res) => {
  user.setUserInfo(res);
});



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
    .catch(console.log);
}

function handleDeleteCard(id, {toggleBtnCallback, removeCardCallback, closeConfirmCallback}) {
  toggleBtnCallback(true);
  api.deleteCard(id).then(() => {
    removeCardCallback();
  }) .catch(console.log())
  .finaly(() => {
    closeConfirmCallback();
    toggleBtnCallback(false);
  })
}

const confirmDeletePopup = new PopupWithConfirm(
  deletePopupSelector,
  popupConfiguration,
  deleteFormSelector,
  handleDeleteCard,
  confirmButtonConfig
)

confirmDeletePopup.setEventListeners()

const newCardCallbacks = {
  handleOpenCallback: viewPopup.open,
  handleLikeCallback: handleLikeCard,
  handleDeleteCallback: confirmDeletePopup.open, 

};

const handleCardSubmit = (item, toggleBtnCallback, closePopupCallback) => {
  console.dir(item);
  toggleBtnCallback(true);
  api
    .setCard(item)
    .then((card) => {
      console.log(`СМАРИ: ${card}`)
      cardsContainer.addItem(card);
      closePopupCallback;
    })
    .catch(console.log)
    .finally(() => {
      toggleBtnCallback(false);
    });
  // cardsContainer.addItem(item);
}

const makeItem = (item) => {
  // console.dir(item)
  // console.dir(newCardCallbacks);
  const card = new Card(
    item,
    cardSelector,
    user._id,
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

api.getCards().then((res) => {
  cardsContainer.renderItems(res);
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

const editAvatarPopup = new PopupWithForm(
  avatarPopupSelector,
  avatarFormName,
  popupConfiguration,
  formConfiguration,
  formValidators[avatarFormName].clearUpForm,
  handleAvatarSubmit,
  saveButtonConfig
  );

editAvatarPopup.setEventListeners();

function handleAvatarSubmit(data, toggleBtnCallback, closePopupCallback) {
  toggleBtnCallback(true);
  console.log(data.avatar)
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


// user.getUserInfo().then(res => {
//   console.dir(`AVATAR: ${res.avatar}`);
//   changeAvatar(res);
// })

// newUserInfo.getUserInfo().then(res => {
//   console.log(`asdasd${res}`);
//   changeName(res)
// })


// const avatar = new Avatar(avatarConfiguration);

// function changeAvatar(data) {
//   avatar.setAvatar(data);
// }



  const editAvatarOpen = () => {
    editAvatarPopup.open();
  }






const addCardOpen = () => {
  newCardPopup.open()
}


// //функция изменения имени и описания
// function changeName(data) {
//   user.setUserInfo(data);
// }



const handleProfliePopupOpen = () => {
  profilePopup.open();
}

//слушатель открытия попап окна с добавлением элемента при нажатии на плюсик
btnAdd.addEventListener('click', addCardOpen);

btnEdit.addEventListener('click', handleProfliePopupOpen);

avatarEdit.addEventListener('click', editAvatarOpen);

Promise.all([api.getUserInfo(), api.getCards()]).then(
  ([userNew, cards]) => {
    user.setUserInfo(userNew);
    cardsContainer.renderItems(cards.reverse());
  }
)