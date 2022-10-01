const Storage = require('../../../system/storage/storage.js');
let storage = Storage.getInstance();
const Log = require('../../../system/helper/log');

module.exports.execute = async function (bot, msg) {

  msg['_' + storage.get('botName') + '_welcome_photo_url'] = storage.get('image').welcome;

  Log.add('Welcome message', msg);

  return await bot.sendPhoto(msg.chat.id, storage.get('image').welcome, {
    caption: `Welcome ${msg.from.first_name} !`,

    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{text: 'Registered in game', callback_data: '/register'}],
      ]
    })

  });
}