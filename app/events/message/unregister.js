const Storage = require('../../../system/storage/storage.js');
let storage = Storage.getInstance();
const Log = require('../../../system/helper/log');
const UsersModel = require("../../../system/model/database/users");

module.exports.execute = async function (bot, msg) {
  let text = `Welcome to game ${msg.from.first_name}`,
    options = {};

  const users = await UsersModel.find.getBy('list');

  if (
    typeof (users) !== 'undefined' &&
    Object.keys(users).length &&
    typeof (users[msg.from.id]) !== 'undefined'
  ) {
    const user = users[msg.from.id];
    text = `
${user.first_name} ${user.last_name} - You will no longer receive a notification about the game being played. 

Have a nice day!`;

    await UsersModel.delete.delete(user.id);

    return bot.sendMessage(msg.chat.id, text, options);
  }
}