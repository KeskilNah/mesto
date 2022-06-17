import { initialCards, config } from './constants.js';
import { Card } from './Cards.js';
import { FormValidator } from './FormValidator.js';

const popups = document.querySelectorAll('.popup');
const editPopup = document.querySelector('.edit-popup');
const editPopupForm = editPopup.querySelector('.popup__form');
const btnEdit = document.querySelector('.profile__edit');
const editForm = document.querySelector('.edit-popup__form');
const nameInput = document.querySelector('.edit-popup__text-name');
const jobInput = document.querySelector('.edit-popup__text-description');
const nameOutput = document.querySelector('.profile__title');
const descriptionOutput = document.querySelector('.profile__subtitle');
const addingPopup = document.querySelector('.adding-popup');
const addingPopupForm = addingPopup.querySelector('.popup__form');
const addButton = document.querySelector('.profile__button');
const addingForm = document.querySelector('.adding-popup__form');
const placeInput = addingForm.querySelector('.adding-popup__text-place');
const urlInput = addingForm.querySelector('.adding-popup__text-url');
const startList = document.querySelector('.gallery__items');
const imgPopup = document.querySelector('.image-popup');
const formValidators = {};

//функция добавления карточки в разметку
function renderCard (cell) {
  startList.prepend(cell);
}
//универсальная функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

//универсальная функция закрытия попапа
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

//функция создания карточки
function makeItem (placeInput, urlInput) {
  const card = new Card(placeInput, urlInput, '.item-template');
  renderCard(card.generateCard());
}

//функция добавляения нового элемента из заданых значений
function addItem(evt) {
  evt.preventDefault();
  makeItem (placeInput.value, urlInput.value);
  closePopup (addingPopup);
}

//вызов функции добавления карточки в разметку из массива initialCards
initialCards.reverse().forEach(function(item) {
  makeItem (item.name, item.link);
});

//слушатель добавляения нового элемента
addingForm.addEventListener('submit', function (evt) {
  // Отменим стандартное поведение
  evt.preventDefault();
  addItem(evt);
  evt.target.reset();
});

//слушатель открытия попап окна с добавлением элемента при нажатии на плюсик
addButton.addEventListener('click', function() {
  formValidators[addingPopupForm.name].clearUpForm();
  openPopup (addingPopup);
});

//функция добавления данных с сайта в инпуты в форме
function handlerChangeName() {
  nameInput.value = nameOutput.textContent;
  jobInput.value = descriptionOutput.textContent ;
}

//слушатель открытия попап окна с изменением имени и описания при нажатии на карандашик
btnEdit.addEventListener('click', function() {
  handlerChangeName()
  formValidators[editPopupForm.name].clearUpForm();
  openPopup (editPopup);
});

//вешаем на все попапы слушатель закрытия попап окна при нажатии на крестик или оверлей 
popups.forEach((popup) => { 
  popup.addEventListener('mousedown', (evt) => { 
      if (evt.target.classList.contains('popup_opened')) { 
          closePopup(popup) 
      } 
      if (evt.target.classList.contains('popup__close')) { 
        closePopup(popup) 
      } 
  }) 
}) 

//функция изменения имени и описания
function changeName() {
  nameOutput.textContent = `${nameInput.value}`;
  descriptionOutput.textContent = `${jobInput.value}`;
  closePopup (editPopup);
}

//слушатель кнопки сохранения попап окна с изменением имени и описания
editForm.addEventListener('submit', function (evt) {
  // Отменим стандартное поведение
  evt.preventDefault();
  changeName();
});

//функция закрытия попапа нажатием Escape
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup (openedPopup);
  }
};

//Привязываем валидацию ко всем формам
Array.from(document.forms).forEach((formElement) => {
  formValidators[formElement.name] = new FormValidator(config, formElement);
  formValidators[formElement.name].enableValidation();
});

export { openPopup, imgPopup };