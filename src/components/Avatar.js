export class Avatar {
  constructor( {avatarSelector}) {
    this._avatarSelector = avatarSelector;
    this._avatarElement = document.querySelector(this._avatarSelector);
    console.log(`1111${this._avatarElement}`)
  }

  setAvatar = (data) => {
    this._avatarElement.src = data.avatar || '';
  }

  getAvatarInfo = () => {
    return {avatar: this._avatarElement.src};

  }


}