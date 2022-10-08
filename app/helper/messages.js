const Storage = require('../../system/storage/storage.js');
let storage = Storage.getInstance();

module.exports = {
  redirectToBot: () => storage.get('messages_list').redirect_to_bot + ' @' + storage.get('botName'),
};