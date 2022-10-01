const Storage = require('../../../system/storage/storage.js');
let storage = Storage.getInstance();
const botEvents = require("../../../system/events/botEvents");

module.exports.execute = async function (bot, msg) {
  let users = storage.get('users'),
    text = `Game participants, ${msg.from.first_name}`,
    options = {};

  if (
    typeof (users) !== 'undefined' &&
    Object.keys(users).length
  ) {

    let i = 1;
    for (let user in users) {
      text += `\n ${i++}   ${users[user].getFirsName()} ${users[user].getLastName()}`;
    }

  } else {
    text = 'Members is empty :('
  }

  msg['_' + storage.get('botName') + '_game_members'] = text;

  return await botEvents.sendEvent('message',
    {
      id: msg.chat.id,
      data: text,
      options: options
    },
    {
      message: 'Show game members',
      data: msg,
    });
}