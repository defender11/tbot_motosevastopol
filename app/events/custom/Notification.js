const Storage = require('../../../system/storage/storage.js');
let storage = Storage.getInstance();
const moment = require('moment');
const debug = require("../../../system/helper/debug");
const botEvents = require("../../../system/events/botEvents");
const axios = require("axios");
const FactoryWeather = require('../../helper/weather/factoryWeather');
const MapYandex = require('../../helper/map/mapYandex');
const LightHouseChecker = require('../../helper/lightHouse/LightHouseChecker');

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

  async dayEventHoliday({chatID}, withInfoMessage = false) {
    let text = `✅ Праздники на сегодня`,
      options = {
        caption: text
      };

    if (withInfoMessage) {
      await botEvents.sendEvent('message',
        {
          id: chatID,
          data: '⏱ Получаем данные по праздникам...',
          options: {}
        });
    }

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

  async dayEventWeather({chatID}, withInfoMessage = false) {
    let text = '',
      options = {
        caption: text
      };

    // WEATHER YANDEX
    if (withInfoMessage) {
      await botEvents.sendEvent('message',
        {
          id: chatID,
          data: '⏱ Получаем погодные данные...',
          options: {}
        });
    }

    const weather = FactoryWeather.create(storage.get('weather').current);
    const weatherNow = await weather.get('now');

    await botEvents.sendEvent('photo',
      {
        id: chatID,
        data: weatherNow,
        options: {}
      },
      {
        message: `Info Weather Day ${weather.get('name')}`,
        data: `Info Weather Day ${weather.get('name')}`,
      });
  },

  async fewDayEventWeather({chatID}, withInfoMessage = false) {
    let text = '',
      options = {
        caption: text
      };

    // WEATHER YANDEX
    if (withInfoMessage) {
      await botEvents.sendEvent('message',
        {
          id: chatID,
          data: '⏱ Получаем погодные данные...',
          options: {}
        });
    }

    const weather = FactoryWeather.create(storage.get('weather').current);
    const weatherSixDays = await weather.get('fewDays');

    await botEvents.sendEvent('photo',
      {
        id: chatID,
        data: weatherSixDays,
        options: {}
      },
      {
        message: `Info Weather Six Day ${weather.get('name')}`,
        data: `Info Weather Six Day ${weather.get('name')}`,
      });
  },

  async groupEventWeather({chatID}, withInfoMessage = false) {
    let text = '',
      options = {
        caption: text
      };

    // WEATHER YANDEX
    if (withInfoMessage) {
      await botEvents.sendEvent('message',
        {
          id: chatID,
          data: '⏱ Получаем погодные данные...',
          options: {}
        });
    }

    const weather = FactoryWeather.create(storage.get('weather').current);
    const weatherNow = await weather.get('now');
    const weatherSixDays = await weather.get('fewDays');

    await botEvents.sendEvent('mediaGroup',
      {
        id: chatID,
        data: [
          {type: 'photo', media: weatherNow},
          {type: 'photo', media: weatherSixDays},
        ],
        options: {}
      },
      {
        message: `Info Weather Group ${weather.get('name')}`,
        data: `Info Weather Group ${weather.get('name')}`,
      });
  },

  async dayEventRoad({chatID}, withInfoMessage = false) {
    let text = '',
      options = {
        caption: text
      };

    // MAP YANDEX
    if (withInfoMessage) {
      await botEvents.sendEvent('message',
        {
          id: chatID,
          data: '⏱ Получаем данные дорожной обстановки Севастополя...\n⚠ Может занят некоторое время...',
          options: {}
        });
    }

    const map = new MapYandex({
      width: 3920,
      height: 3080,
    });

    const mapNow = await map.get('now');

    await botEvents.sendEvent('photo',
      {
        id: chatID,
        data: mapNow,
        options: {}
      },
      {
        message: 'Info Event Road Sevastopol Yandex Map',
        data: 'Info Event Road Sevastopol Yandex Map',
      });
  },

  async dayLightChecker({chatID}, withInfoMessage = false) {
    await new LightHouseChecker({
      chatID,
      url: 'https://sevstar.net/wp-content/themes/SevStar-Theme-2/js/map/houses.js',
    }).check();
  }
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
