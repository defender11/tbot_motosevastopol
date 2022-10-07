const Storage = require('../../../system/storage/storage.js');
let storage = Storage.getInstance();
const botEvents = require("../../../system/events/botEvents");

module.exports.execute = async function (bot, msg) {
  let text = 'Погода Севастополь',
    options = {
      caption: text,
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            {text: 'Сегодня', callback_data: '/cb_weather_sevastopol'},
            {text: '6 дней', callback_data: '/cb_weather_sevastopol_six_days'}
          ],
        ]
      })
    };

  msg['_' + storage.get('botName') + '_weather_sevastopol'] = text;

  return await botEvents.sendEvent('photo',
    {
      id: msg.chat.id,
      data: storage.get('image').weather,
      options: options
    },
    {
      message: 'Weather Sevastopol',
      data: msg,
    });
}