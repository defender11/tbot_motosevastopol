var Storage = require('../storage/storage');
var storage = Storage.getInstance();

const Log = require('../helper/log');
const debug = require('../helper/debug');

module.exports = {
  sendEvent: async function (event = 'message', {id, data, options, fileOptions}, logData = false) {
    if (debug.enabled()) {
      id = debug.getChatID();
    }

    if (logData) {
      Log.add(logData.message, JSON.stringify(logData.data));
    }

    const bot = storage.get('botInstance');

    switch (event) {
      case "message":
        return await bot.sendMessage(id, data, options);
      case "video":
        return await bot.sendVideo(id, data, options, fileOptions);
      case "sticker":
        return await bot.sendSticker(id, data, options, fileOptions);
      case "photo":
        return await bot.sendPhoto(id, data, options);
      default:
        return await bot.sendMessage(id, data, options);
    }
  }
}