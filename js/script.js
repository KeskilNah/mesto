const page = document.querySelector('.page');
const editPopup = document.querySelector('.edit-popup');
const btnEdit = document.querySelector('.profile__edit');
const closeEdit = document.querySelector('.edit-popup__exit');
const editForm = document.querySelector('.edit-popup__form');
const nameInput = document.querySelector('.edit-popup__text-name');
const jobInput = document.querySelector('.edit-popup__text-description');
const saveButton = document.querySelector('.edit-popup__save-button');
const nameOutput = document.querySelector('.profile__title');
const descriptionOutput = document.querySelector('.profile__subtitle');
const editOverlay = document.querySelector('.edit-popup__overlay');
const addingPopup = document.querySelector('.adding-popup');
const addButton = document.querySelector('.profile__button');
const exitAdd = document.querySelector('.adding-popup__exit');
const addingForm = document.querySelector('.adding-popup__form');
const placeInput = addingForm.querySelector('.adding-popup__text-place');
const urlInput = addingForm.querySelector('.adding-popup__text-url');
const addSaveButton = addingForm.querySelector('.adding-popup__save-button');
const startList = document.querySelector('.gallery__items');
const addOverlay = document.querySelector('.adding-popup__overlay');
const imgPopup = document.querySelector('.image-popup');
const imgExit = document.querySelector('.image-popup__exit')
const imgPopupPic = document.querySelector('.image-popup__pic');
const imgPopupTitle = document.querySelector('.image-popup__title');
const itemTemplate = document.querySelector('.item-template').content.querySelector('.item');
const popupInput = document.querySelector('.popup__input');

//переворачиваем наш массив, что бы при добавлении нового элемента он, добавлялся в начало
initialCards.reverse();

//функция функцию создания карточки
function makeGallery (item) {
  const itemCell = itemTemplate.cloneNode(true);
  const cardName = item.name;
  const cardLink =  item.link;
  const btnDeletItem = itemCell.querySelector('.item__delete');
  const imgItem = itemCell.querySelector('.item__image');
  const textItem = itemCell.querySelector('.item__text');
  const btnLikeItem = itemCell.querySelector('.item__like');
  btnDeletItem.addEventListener('click', handleDeleteCard);
  btnLikeItem.addEventListener('click', handleLike);
  imgItem.addEventListener('click', popupImg);
  textItem.textContent = cardName;
  imgItem.src = cardLink;
  imgItem.alt = cardName;
  return itemCell;
};

//функция добавления карточки в разметку
function renderCard (cell) {
  startList.prepend(makeGallery(cell));
}

//вызов функции добавления карточки в разметку из массива initialCards
initialCards.forEach(renderCard);

//функция добавляения нового элемента из заданых значений
function addItem(evt) {
  evt.preventDefault();
  renderCard(({link: urlInput.value, name: placeInput.value}));
  closePopup (addingPopup);
}

//слушатель добавляения нового элемента
<<<<<<< HEAD
addForm.addEventListener('submit', addItem);
=======
addingForm.addEventListener('submit', function (evt) {
  // Отменим стандартное поведение
  evt.preventDefault();
  addItem(evt);
});
>>>>>>> 1bfdac942e4d2255d599fb18ef36c02fefd993ac

//функция удаления элемента
function handleDeleteCard (evt) {
  evt.target.closest('.item').remove();
}

function popupImg (imgLink) {
  const imgSrc = imgLink.target.getAttribute('src');
  const imgName = imgLink.target.getAttribute('alt');
  imgPopupPic.src = imgSrc;
  imgPopupPic.alt = imgName;
  imgPopupTitle.textContent = imgName;
  openPopup (imgPopup);
}

//универсальная функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opend');
}
//универсальная функция закрытия попапа
function closePopup (popup) {
  popup.classList.remove('popup_opend');
}

//слушатель закрытия попап окна с изображением
imgExit.addEventListener('click', function(evt) {
  closePopup(imgPopup);
})

//функция изменения изображения при клике на лайк
function handleLike (evt) {
  evt.target.classList.toggle('item__like_active');
}

//слушатель открытия попап окна с добавлением элемента при нажатии на плюсик
addButton.addEventListener('click', function(evt){
  openPopup (addingPopup);
});

//слушатель закрытия попап окна с добавлением элемента при нажатии на плюсик
exitAdd.addEventListener('click', function(evt){
  closePopup (addingPopup);
});

//слушатель открытия попап окна с изменением имени и описания при нажатии на карандашик
btnEdit.addEventListener('click', function(evt){
  openPopup (editPopup);
});

//слушатель закрытия попап окна с изменением имени и описания при нажатии на крестик
closeEdit.addEventListener('click', function(evt){
  closePopup (editPopup);
});

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

editOverlay.addEventListener('click', function(evt){
  closePopup (editPopup);
});

addOverlay.addEventListener('click', function(evt){
  closePopup (addingPopup);
});

page.addEventListener('keydown', function(evt){
  if (evt.key === 'Escape'){
    closePopup (editPopup);
    closePopup (addingPopup);
    closePopup(imgPopup);
    }
});