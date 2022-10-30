var Storage = require('./system/storage/storage');
var storage = Storage.getInstance();

const Log = require('./system/helper/log');
const events = require('./system/events');
const Notification = require('./app/events/custom/Notification');
const BanSystem = require('./app/events/custom/BanSystem');
const debug = require('./system/helper/debug');
const DB = require('./system/database/database');

DB.init();

const TelegramApi = require('node-telegram-bot-api');
const bot = new TelegramApi(storage.get('token'), {polling: true});

bot.setMyCommands(storage.get('commands').message);

storage.set('botInstance', bot);

const run = () => {

  if (debug.enabled()) {
    Log.add(`App in the DEBUG MODE`);
  }

  Log.clearLog();

  Notification.init();
  BanSystem.init();

  for (let event in events) {

    bot.on(event, async msg => {
      Log.show(msg);

      for (let objName in events[event]) {
        let queryText = msg.data || msg.text;

        if (
          (
            (queryText === `/${objName}`) ||
            (queryText === `/${objName}@` + storage.get('botName'))
          )
        ) {

          Log.show(msg);

          Log.add(`Action: ${queryText}`, msg);

          return events[event][objName](bot, msg);
        }
      }

      // return bot.sendMessage(msg.chat.id, 'Неизвестная команда');
    });
  }
}

run();