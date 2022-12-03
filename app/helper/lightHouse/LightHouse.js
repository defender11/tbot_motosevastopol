const axios = require("axios");
const moment = require("moment/moment");
const botEvents = require("../../../system/events/botEvents");

const Messages = {
  getCopyRight() {
    return ''
  },

  getTitleHousesCount(count = 0) {
    let str = '⚠ Домов без света - ' + this.getCount(count) + "\n";
    str += this.getDevideLine();

    return str;
  },

  getCount(count = 0) {
    return count + ' шт.';
  },

  getFooterHousesCount(count = 0) {
    let str = this.getDevideLine();
    str += "\n 🏠 Количество - " + this.getCount(count);

    return str;
  },

  getSuccessMsg() {
    return '💡 Неполадок со светом не найдено. 👍';
  },

  getTitleTime() {
    return "⏰ " + moment().add(3, 'hours').format('LLLL');
  },

  getDevideLine() {
    return "=======================";
  }
};

class LightHouse {
  constructor(parameters) {
    this.parameters = parameters;
    this.Messages = Messages;

    this.url = this.parameters.url;
    this.chatID = this.parameters.chatID;
    this.searchState = this.parameters.chatID || 0;
  }

  getFilteringListByState(list, searchState = 1) {

  }

  sendMessagesList(newList) {

  }

  async check(callback) {
    await axios.get(this.url)
      .then(async response => {
        callback(response);
      })
      .catch(ex => {
        console.error(ex);
      });
  }

  async send(data, options = {}) {
    await botEvents.sendEvent('message',
      {
        id: this.chatID,
        data: data,
        options: options,
      },
      {
        message: 'dayLightChecker',
        data: data,
      });
  }
}

module.exports = {LightHouse, sourceMessages: Messages};