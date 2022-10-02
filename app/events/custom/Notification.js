const Storage = require('../../../system/storage/storage.js');
let storage = Storage.getInstance();
const moment = require('moment');
const debug = require("../../../system/helper/debug");
const botEvents = require("../../../system/events/botEvents");
const Time = require('../../helper/time');
const axios = require("axios");

const notifications = {
  async execute(params) {
    let list = storage.get('notification').list;

    for (let item in list) {

      let data = list[item];

      if (data.enabled && !data.excludeDays.includes(params.day)) {
        for (let itemTime in data.time) {

          let time = data.time[itemTime];

          if (time === params.currentTime) {

            let users = [],
              chatID = storage.get('group_id');

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

  dayEventHoliday({chatID}) {
    let text = `Праздники на сегодня`,
      options = {
        caption: text
      };

    axios.get('https://www.calend.ru/img/export/informer.png', {
      responseType: 'arraybuffer'
    }).then(response => {
      const buffer = Buffer.from(response.data, 'base64');

      botEvents.sendEvent('photo',
        {
          id: chatID,
          data: buffer,
          options: options
        },
        {
          message: 'Info Holy Day',
          data: 'Info Holy Day',
        });
    })
      .catch(ex => {
        console.error(ex);
      });
  },

  dayEventWeather({chatID}) {
    let text = `Севастополь, погода на сегодня и завтра`,
      options = {
        caption: text
      };

    axios.get('https://wttr.in/sevastopol.png?p&q&d2&lang=ru&time=' + moment().format('HHmmss'), {
      responseType: 'arraybuffer'
    }).then(response => {
      const buffer = Buffer.from(response.data, 'base64');

      botEvents.sendEvent('photo',
        {
          id: chatID,
          data: buffer,
          options: options
        },
        {
          message: 'Info Weather Day',
          data: 'Info Weather Day',
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
  },

  notifications
}
