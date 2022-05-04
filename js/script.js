let popup = document.querySelector('.popup');
let edit = document.querySelector('.profile__edit');
let closeEdit = document.querySelector('.popup__exit');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__description');
let saveButton = document.querySelector('.popup__save-button');
let nameOutput = document.querySelector('.profile__title');
let DescriptionOutput = document.querySelector('.profile__subtitle');

function showPopup() {
  popup.classList.add('popup_opened')
}

edit.addEventListener('click', showPopup);

function closePopup() {
  popup.classList.remove('popup_opened')
}

closeEdit.addEventListener('click', closePopup);

function changeName() {
  
  nameOutput.textContent = `${nameInput.value}`;
  DescriptionOutput.textContent = `${jobInput.value}`;
  closePopup()
}

saveButton.addEventListener('click', changeName);
