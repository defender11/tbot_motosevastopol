const messageRegister = require('../message/register');

module.exports.execute = async function (bot, msg) {

  const preparedMsg = {
    chat: msg.message.chat,
    from: msg.from
  };

  return messageRegister.execute(bot, preparedMsg);
}