const Storage = require('../../../system/storage/storage.js');
let storage = Storage.getInstance();
const Log = require('../../../system/helper/log');
const UsersModel = require("../../../system/model/database/users");

module.exports.execute = async function (bot, msg) {
  let text = `Members to game, ${msg.from.first_name}`,
    options = {};

  const users = await UsersModel.find.getBy('list');

  if (
    typeof (users) !== 'undefined' &&
    Object.keys(users).length
  ) {

    let i = 1;
    for (let user in users) {
      text += `\n ${i++}   ${(users[user].first_name || '')} ${(users[user].last_name || '')}`;
    }

  } else {
    text = 'Members is empty :('
  }

  msg['_' + storage.get('botName') + '_game_members'] = text;

  Log.add('Show game members', msg);

  return bot.sendMessage(msg.chat.id, text, options);
}