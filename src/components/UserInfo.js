export class UserInfo {
  constructor( {titleSelector, jobSelector, avatarSelector}) {
    this._titleSelector = titleSelector;
    this._jobSelector = jobSelector;
    this._avatarSelector = avatarSelector;

    this._titleElement = document.querySelector(this._titleSelector);
    this._jobElement = document.querySelector(this._jobSelector);
    this._avatarElement = document.querySelector(this._avatarSelector);
  }

  setUserInfo = (data) => {
    this._titleElement.textContent = data.name || '';
    this._jobElement.textContent = data.about || '';
    this._avatarElement.src = data.avatar || '';
    this._name = data.name;
    this._about = data.about;
    this._avatar = data.avatar;
    this._id = data._id;
  }

  getUserInfo = () => {
    return {
      name: this._titleElement.textContent,
      about: this._jobElement.textContent,
      avatar: this._avatarElement.src
    };
  }
  getUserAvatar() {
    return {
      avatar: this._avatar
    }
  }

  get id(){
    return this._id;
  }

}


// Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:
// Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
// Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
// Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.