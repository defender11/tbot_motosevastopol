const Storage = require('../../system/storage/storage.js');
let storage = Storage.getInstance();

const InterfaceYandex = require("./InterfaceYandex");
const puppeteer = require("puppeteer");

class WeatherYandex extends InterfaceYandex {
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
    const dayNow = await page.screenshot({
      clip: {
        x: 25,
        y: 110,
        width: 600,
        height: 280,
      },
    });

    await browser.close();

    return dayNow;
  }

  async sixDays() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({width: this.width, height: this.height});
    await page.goto(this.url);

    const days = await page.screenshot({
      clip: {
        x: 135,
        y: 540,
        width: 635,
        height: 200,
      },
    });

    await browser.close();

    return days;
  }
}

module.exports = WeatherYandex;