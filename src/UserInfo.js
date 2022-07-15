export class UserInfo {
  constructor( {titleSelector, jobSelector}) {
    this._titleSelector = titleSelector;
    this._jobSelector = jobSelector;
    this._titleElement = document.querySelector(`.${this._titleSelector}`);
    this._jobElement = document.querySelector(`.${this._jobSelector}`);
    this._profile = {title: '', description: ''};
  }

  setUserInfo = (data) => {
    this._titleElement.textContent = data.title || '';
    this._jobElement.textContent = data.description || '';
  }

  getUserInfo = () => {
    return {title: this._titleElement.textContent, description: this._jobElement.textContent};

  }


}


// Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:
// Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
// Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
// Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.