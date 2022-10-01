var Storage = require('../storage/storage');
let storage = Storage.getInstance();

module.exports = {
  enabled() {
    return (storage.get('debug').state);
  },

  getUserData() {
    return storage.get('users')[this.getUserID()];
  },

  getUserID() {
    return storage.get('debug').userID;
  },

  getChatID() {
    return storage.get('debug').chatID;
  }
};