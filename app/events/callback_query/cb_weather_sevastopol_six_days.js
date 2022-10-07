const Notification = require("../custom/Notification");

module.exports.execute = async function (bot, msg) {
 await Notification.notifications.sixDayEventWeather({chatID: msg.message.chat.id}, true);
}