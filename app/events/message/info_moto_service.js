const Storage = require('../../../system/storage/storage.js');
let storage = Storage.getInstance();
const botEvents = require("../../../system/events/botEvents");

module.exports.execute = async function (bot, msg) {
  let image = storage.get('image').info_moto_service,
    text = storage.get('messages_list').info_moto_service,
    options = {
      caption: text
    };

  msg['_' + storage.get('botName') + '_info_moto_service'] = text;

  return await botEvents.sendEvent('photo',
    {
      id: msg.chat.id,
      data: image,
      options: options
    },
    {
      message: 'Info Moto Service',
      data: msg,
    });
}