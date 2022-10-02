const Storage = require('../../../system/storage/storage.js');
let storage = Storage.getInstance();
const botEvents = require("../../../system/events/botEvents");

module.exports.execute = async function (bot, msg) {
  let text = storage.get('messages_list').chat_rules,
    options = {};

  msg['_' + storage.get('botName') + '_chat_rules'] = text;

  return await botEvents.sendEvent('message',
    {
      id: msg.chat.id,
      data: text,
      options: options
    },
    {
      message: 'Chat Rules',
      data: msg,
    });
}