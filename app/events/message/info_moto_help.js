const Storage = require('../../../system/storage/storage.js');
let storage = Storage.getInstance();
const botEvents = require("../../../system/events/botEvents");

module.exports.execute = async function (bot, msg) {
  let image = storage.get('image').motohelp,
    text = storage.get('messages_list').motohelp,
    options = {
      caption: text
    };

  msg['_' + storage.get('botName') + '_info_moto_help'] = text;

  return await botEvents.sendEvent('photo',
    {
      id: msg.chat.id,
      data: image,
      options: options
    },
    {
      message: 'Info Moto Help',
      data: msg,
    });
}