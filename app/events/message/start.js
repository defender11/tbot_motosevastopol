const Storage = require('../../../system/storage/storage.js');
let storage = Storage.getInstance();
const botEvents = require("../../../system/events/botEvents");

module.exports.execute = async function (bot, msg) {
  let image = storage.get('image').motosevastopol_avatar,
    options = {
      caption: storage.get('messages_list').chat_rules
    };

  msg['_' + storage.get('botName') + '_start'] = storage.get('messages_list').chat_rules;

  return await botEvents.sendEvent('photo',
    {
      id: msg.chat.id,
      data: image,
      options: options
    },
    {
      message: 'Start',
      data: msg,
    });
}