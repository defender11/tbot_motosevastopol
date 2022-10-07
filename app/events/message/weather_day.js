const Notification = require("../custom/Notification");

module.exports.execute = async function (bot, msg) {
  Notification.notifications.dayEventWeather({chatID: msg.chat.id}, true);
}