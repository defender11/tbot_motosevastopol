const Storage = require('../../../system/storage/storage.js');
let storage = Storage.getInstance();
const moment = require('moment');
const debug = require("../../../system/helper/debug");
const botEvents = require("../../../system/events/botEvents");
const axios = require("axios");
const puppeteer = require('puppeteer');

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

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({width: 1280, height: 800});
    await page.goto('https://yandex.ru/pogoda/?lat=44.61649704&lon=33.52513123');
    const dayNow = await page.screenshot({
      clip: {
        x: 25,
        y: 110,
        width: 600,
        height: 280,
      },
    });

    const days = await page.screenshot({
      clip: {
        x: 135,
        y: 540,
        width: 635,
        height: 200,
      },
    });

    await browser.close();

    await botEvents.sendEvent('mediaGroup',
      {
        id: chatID,
        data: [
          {type: 'photo', media: dayNow},
          {type: 'photo', media: days},
        ],
        options: {}
      },
      {
        message: 'Info Weather Day Yandex',
        data: 'Info Weather Day Yandex',
      });

    if (withInfoMessage) {
      await botEvents.sendEvent('message',
        {
          id: chatID,
          data: '✅ Информация взята с Yandex Weather.',
          options: {}
        });
    }
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

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({width: 3920, height: 3080});
    await page.goto('https://yandex.ru/maps/959/sevastopol/?l=trf%2Ctrfe&ll=33.496600%2C44.577991&z=15.95', {
      waitUntil: 'networkidle0',
    })
      .catch((err) => console.log("error loading url", err));

    const map = await page.screenshot({
      clip: {
        x: 400,
        y: 0,
        width: 3420,
        height: 3080,
      }
    });

    await browser.close();

    await botEvents.sendEvent('photo',
      {
        id: chatID,
        data: map,
        options: {}
      },
      {
        message: 'Info Event Road Sevastopol Yandex Map',
        data: 'Info Event Road Sevastopol Yandex Map',
      });

    if (withInfoMessage) {
      await botEvents.sendEvent('message',
        {
          id: chatID,
          data: '✅ Информация взята с Yandex Maps.',
          options: {}
        });
    }
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
