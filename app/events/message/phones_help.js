const Storage = require('../../../system/storage/storage.js');
let storage = Storage.getInstance();
const botEvents = require("../../../system/events/botEvents");

module.exports.execute = async function (bot, msg) {
  let text = storage.get('messages_list').phones_help,
    options = {};

  msg['_' + storage.get('botName') + '_phones_help'] = text;

  return await botEvents.sendEvent('message',
    {
      id: msg.chat.id,
      data: text,
      options: options
    },
    {
      message: 'Phones Help',
      data: msg,
    });
}