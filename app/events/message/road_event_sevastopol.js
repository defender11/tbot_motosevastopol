const Storage = require('../../../system/storage/storage.js');
let storage = Storage.getInstance();
const botEvents = require("../../../system/events/botEvents");
const Notification = require("../custom/Notification");

module.exports.execute = async function (bot, msg) {

  // if (msg.chat.id !== storage.get('group_id')) {
  //   Notification.notifications.dayEventRoad({chatID: msg.chat.id}, true);
  // } else {
  //
  //   let text = Messages.redirectToBot(),
  //     options = {};
  //
  //   msg['_' + storage.get('botName') + '_redirect_to_bot'] = text;
  //
  //   return await botEvents.sendEvent('message',
  //     {
  //       id: msg.chat.id,
  //       data: text,
  //       options: options
  //     },
  //     {
  //       message: 'Redirect To Bot',
  //       data: msg,
  //     });
  // }
}