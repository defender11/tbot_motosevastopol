const Storage = require('../../../system/storage/storage.js');
let storage = Storage.getInstance();

const InterfaceBrowser = require("./../interfaces/InterfaceBrowser");
const puppeteer = require("puppeteer");

class MapYandex extends InterfaceBrowser {
  constructor(parameters) {
    const defaultParameters = Object.assign({}, parameters, {
      url: storage.get('maps').yandex
    });

    super(defaultParameters);
  }

  async now() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({width: this.width, height: this.height});
    await page.goto(this.url, {
      waitUntil: 'networkidle0',
    })
      .catch((err) => console.log("error loading url", err));

    const offsetX = 400;
    const offsetY = 0;

    const map = await page.screenshot({
      clip: {
        x: offsetX,
        y: offsetY,
        width: this.width - offsetX,
        height: this.height,
      }
    });

    await browser.close();

    return map;
  }
}

module.exports = MapYandex;