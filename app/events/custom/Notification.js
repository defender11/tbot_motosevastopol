const Storage = require('../../../system/storage/storage.js');
let storage = Storage.getInstance();
const Log = require('../../../system/helper/log');
const moment = require('moment');
const debug = require("../../../system/helper/debug");
const botEvents = require("../../../system/events/botEvents");
const Time = require('../../helper/time');
const axios = require("axios");
const UsersModel = require("../../../system/model/database/users");

const notifications = {
  async execute(params) {
    let list = storage.get('notification').list;

    for (let item in list) {

      let data = list[item];

      if (data.enabled && !data.excludeDays.includes(params.day)) {
        for (let itemTime in data.time) {

          let time = data.time[itemTime];

          if (time === params.currentTime) {

            let users = await UsersModel.find.getBy('list'),
              chatID = '-648467274';

            if (debug.enabled()) {
              users = {};
              users[debug.getUserID()] = users[debug.getUserID()];
              chatID = debug.getUserID();
            }

            params.time = time;
            params.users = users;
            params.chatID = chatID;

            this[data.method].call(this, params);
          }
        }
      }
    }
  },

  gameNotification({time, users, chatID}) {
    let usersListNotification = '',
      type = 'photo',
      data = '',
      caption = '';

    if (Object.keys(users).length) {
      for (let user in users) {
        usersListNotification += '@' + users[user].username + ' ';
      }
    }

    data = storage.get('image').start;
    caption = usersListNotification + "\n-------\n" + time + ' ! ';

    if (data !== '' && caption !== '') {
      if (Object.keys(users).length) {
        for (let user in users) {
          Log.add('Notification', users[user]);
        }
      }

      botEvents.sendEvent(type, {
        id: chatID,
        data: data,
        options: {
          caption: caption
        }
      });
    }
  },

  dailyNotification({chatID}) {
    const quotes = storage.get('quotes');
    const quotesList = [];

    for (let quote in quotes) {
      quotesList.push(...quotes[quote]);
    }

    const number = Math.floor(Math.random() * quotesList.length);

    let quoteCurrent = quotesList[number];

    let parameters = {
      id: chatID
    }

    let author = (quoteCurrent.author || '');
    let text = (quoteCurrent.text || '');

    if (quoteCurrent.type === 'photo') {
      parameters.data = author;
      parameters.options = {};
      parameters.options.caption = text;
    }

    if (quoteCurrent.type === 'text') {
      parameters.data = author + "\n--------------\n" + text;
    }

    botEvents.sendEvent(quoteCurrent.type, parameters);
  },

  dayEvent({chatID}) {
    axios.get('https://www.calend.ru/img/export/informer.png', {
      responseType: 'arraybuffer'
    }).then(response => {
      const buffer = Buffer.from(response.data, 'base64');

      botEvents.sendEvent('photo', {
        id: chatID,
        data: buffer,
        options: {
          caption: ''
        }
      });
    })
      .catch(ex => {
        console.error(ex);
      });
  },
}

module.exports = {
  init: function () {

    setInterval(() => {
      const currentTime = moment().format('HH:mm:ss'),
        day = moment().format('ddd');

      const params = {
        currentTime,
        day
      };

      notifications.execute(params);

    }, storage.get('notification').interval);
  }
}
