const Notification = require("../custom/Notification");

module.exports.execute = async function (bot, msg) {
  Notification.notifications.dayEventRoad({chatID: msg.chat.id});
}