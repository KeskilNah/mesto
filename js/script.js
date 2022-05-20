const popup = document.querySelector('.popup');
const edit = document.querySelector('.profile__edit');
const closeEdit = document.querySelector('.popup__exit');
const nameInput = document.querySelector('.popup__text_name');
const jobInput = document.querySelector('.popup__text_description');
const saveButton = document.querySelector('.popup__save-button');
const nameOutput = document.querySelector('.profile__title');
const DescriptionOutput = document.querySelector('.profile__subtitle');

const addingPopup = document.querySelector('.adding-popup');
const add = document.querySelector('.profile__button');
const exitAdd = document.querySelector('.adding-popup__exit');
const addingForm = document.querySelector('.adding-popup__form');
const placeInput = addingForm.querySelector('.adding-popup__text_place');
const urlInput = addingForm.querySelector('.adding-popup__text_url');
const addSaveButton = addingForm.querySelector('.adding-popup__save-button');
const startList = document.querySelector('.gallery__items');
const addForm = document.querySelector('.adding-popup__form');

const imgPopup = document.querySelector('.image-popup');
const imgExit = document.querySelector('.image-popup__exit')
const imgPopupPic = document.querySelector('.image-popup__pic');
const imgPopupTitle = document.querySelector('.image-popup__title');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
]; 





//переворачиваем наш массив, что бы при добавлении нового элемента он, добавлялся в начало
initialCards.reverse();

//функция создания новых блоков
function makeGallery (item) {
  const cardName = item.name;
  const cardLink =  item.link;
  const itemTemplate = document.querySelector('.item-template').content.querySelector('.item').cloneNode(true);
  const btnDeletItem = itemTemplate.querySelector('.item__delete');
  const imgItem = itemTemplate.querySelector('.item__image');
  const textItem = itemTemplate.querySelector('.item__text');
  const btnLikeItem = itemTemplate.querySelector('.item__like');
  btnDeletItem.addEventListener('click', btnDeleteFun);
  btnLikeItem.addEventListener('click', btnLikeFun);
  imgItem.addEventListener('click', popupImg);
  textItem.textContent = cardName;
  imgItem.src = cardLink;
  imgItem.alt = cardName;
  startList.prepend(itemTemplate);
  console.log(itemTemplate);
};

//вызов функции создания элемента для каждого элемента массива initialCards
initialCards.forEach(makeGallery);

//функция добавляения нового элемента из заданых значений
function addItem(evt) {
  evt.preventDefault();
  makeGallery(({link: urlInput.value, name: placeInput.value}));
  console.log(initialCards);
  closeAdd();
}

//слушатель добавляения нового элемента
addSaveButton.addEventListener('click', addItem);

//функция удаления элемента
function btnDeleteFun (evt) {
  evt.target.closest('.item').remove();
}

//функция открытия попап окна с изображением, на которое мы кликнули
function popupImg (evt) {
  console.log(evt.target.src);
  console.log(evt.target.textContent);
  imgPopup.classList.toggle('image-popup_opend');
  imgPopupPic.src = evt.target.src;
  imgPopupTitle.textContent = evt.target.alt;
}

//функция закрытия попап окна с изображением
function closeImg () {
  imgPopup.classList.toggle('image-popup_opend');
}

//слушатель закрытия попап окна с изображением
imgExit.addEventListener('click', closeImg)

//функция изменения изображения при клике на лайк
function btnLikeFun (evt) {
  evt.target.classList.toggle('item__like_active');
}

//функция открытия попап окна с добавлением элемента
function showAdd() {
  addingPopup.classList.add('adding-popup_opened');
}
//слушатель открытия попап окна с добавлением элемента при нажатии на плюсик
add.addEventListener('click', showAdd);

//функция закрытия попап окна с добавлением элемента
function closeAdd() {
  addingPopup.classList.remove('adding-popup_opened');
}

//слушатель закрытия попап окна с добавлением элемента при нажатии на плюсик
exitAdd.addEventListener('click', closeAdd);



//функция открытия попап окна с изменением имени и описания
function showPopup() {
  popup.classList.add('popup_opened')
}

//слушатель открытия попап окна с изменением имени и описания при нажатии на карандашик
edit.addEventListener('click', showPopup);

//функция закрытия попап окна с изменением имени и описания
function closePopup() {
  popup.classList.remove('popup_opened')
}

//слушатель закрытия попап окна с изменением имени и описания при нажатии на крестик
closeEdit.addEventListener('click', closePopup);

//функция изменения имени и описания
function changeName() {
  nameOutput.textContent = `${nameInput.value}`;
  DescriptionOutput.textContent = `${jobInput.value}`;
  closePopup()
}

//слушатель кнопки сохранения попап окна с изменением имени и описания
saveButton.addEventListener('click', changeName);

