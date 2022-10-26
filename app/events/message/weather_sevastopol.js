const Storage = require('../../../system/storage/storage.js');
let storage = Storage.getInstance();
const botEvents = require("../../../system/events/botEvents");

module.exports.execute = async function (bot, msg) {
  let text = '🌦 Погода Севастополь',
    options = {
      caption: '',
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            {text: 'Сегодня', callback_data: '/cb_weather_sevastopol'},
            {text: '3 дня', callback_data: '/cb_weather_sevastopol_few_days'}
          ],
        ]
      })
    };

  msg['_' + storage.get('botName') + '_weather_sevastopol'] = text;

  return await botEvents.sendEvent('messages',
    {
      id: msg.chat.id,
      data: text,
      options: options
    },
    {
      message: 'Weather Sevastopol',
      data: msg,
    });
}