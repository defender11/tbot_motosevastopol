const Storage = require('../../../system/storage/storage.js');
let storage = Storage.getInstance();

const InterfaceBrowser = require("./../interfaces/InterfaceBrowser");
const puppeteer = require("puppeteer");

class WeatherYandex extends InterfaceBrowser {
  constructor(parameters) {
    const defaultParameters = Object.assign({}, parameters, {
      url: storage.get('weather').yandex
    });

    super(defaultParameters);
  }

  async now() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({width: this.width, height: this.height});
    await page.goto(this.url);

    await page.waitForSelector('.content__top');

    const offset = await page.evaluate(async () => {
      let contentTop = document.querySelector('.content__top > .fact');
      let data = contentTop.getBoundingClientRect();

      return {
        height: data.height,
        left: data.left,
        right: data.right,
        top: data.top,
        width: data.width,
      };
    });

    const dayNow = await page.screenshot({
      clip: {
        x: offset.left,
        y: offset.top,
        width: offset.width,
        height: offset.height,
      },
    });

    await browser.close();

    return dayNow;
  }

  async fewDays() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({width: this.width, height: this.height});
    await page.goto(this.url);

    await page.waitForSelector('.forecast-briefly');

    const offset = await page.evaluate(async () => {
      let contentTop = document.querySelector('.forecast-briefly');
      let data = contentTop.getBoundingClientRect();

      return {
        height: data.height,
        left: data.left,
        right: data.right,
        top: data.top,
        width: data.width,
      };
    });

    const days = await page.screenshot({
      clip: {
        x: offset.left,
        y: offset.top,
        width: offset.width,
        height: offset.height,
      },
    });

    await browser.close();

    return days;
  }

  name() {
    return 'Yandex';
  }
}

module.exports = WeatherYandex;