const Storage = require('../../../system/storage/storage.js');
let storage = Storage.getInstance();
const Log = require('../../../system/helper/log');
const botEvents = require("../../../system/events/botEvents");
const UsersModel = require("../../../system/model/database/users");

module.exports.execute = async function (bot, msg) {
  let text = `Welcome to game ${msg.from.first_name}`;

  const users = await UsersModel.find.getBy('list');

  if (
    typeof (users) !== 'undefined' &&
    Object.keys(users).length &&
    typeof (users[msg.from.id]) !== 'undefined'
  ) {
    const user = users[msg.from.id];

    text = `
${user.first_name} ${user.last_name} - You are already registered and will receive a message about the game.

The game is played every working day 
At the ${storage.get('notification').list.gameTime.time}.`;

    Log.add('Show Registered user', msg);

  } else {

    await UsersModel.insert.insert({
      id: msg.from.id,
      is_bot: msg.from.is_bot,
      first_name: msg.from.first_name,
      last_name: msg.from.last_name,
      username: msg.from.username,
    });

    Log.add('Registered user', msg);
  }

  return botEvents.sendEvent('message', {
    id: msg.chat.id,
    data: text
  });
}