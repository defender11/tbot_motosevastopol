const Notification = require("../custom/Notification");

module.exports.execute = async function (bot, msg) {
  Notification.notifications.dayEventHoliday({chatID: msg.chat.id});
}