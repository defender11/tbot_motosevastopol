const Storage = require('../../../system/storage/storage.js');
let storage = Storage.getInstance();

const InterfaceBrowser = require("./../interfaces/InterfaceBrowser");
const puppeteer = require("puppeteer");

class WeatherGismeteo extends InterfaceBrowser {
  constructor(parameters) {
    const defaultParameters = Object.assign({}, parameters, {
      url: storage.get('weather').gismeteo
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
        x: 0,
        y: 310,
        width: 670,
        height: 460,
      },
    });

    await browser.close();

    return dayNow;
  }

  async fewDays() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({width: this.width, height: this.height});
    await page.goto(this.url + '/3-days/');

    const days = await page.screenshot({
      clip: {
        x: 0,
        y: 310,
        width: 670,
        height: 385,
      },
    });

    await browser.close();

    return days;
  }

  name() {
    return 'Gismeteo';
  }
}

module.exports = WeatherGismeteo;