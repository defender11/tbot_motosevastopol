const Notification = require("../custom/Notification");

module.exports.execute = async function (bot, msg) {
  await Notification.notifications.dayEventWeather({chatID: msg.message.chat.id}, true);
}