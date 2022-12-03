const Storage = require('../../../system/storage/storage.js');
let storage = Storage.getInstance();
const botEvents = require("../../../system/events/botEvents");
const puppeteer = require("puppeteer");

module.exports.execute = async function (bot, msg) {

  let options = {};

  await botEvents.sendEvent('message',
    {
      id: msg.message.chat.id,
      data: 'Получаем данные, подождите...',
      options: options
    },
    {
      message: 'sevenergosbit_contact',
      data: msg,
    });

  let width = 1280;
  let height = 800;
  let url = 'https://sevenergosbyt.ru/?page_id=31';

  const browser = await puppeteer.launch({
    headless: true,
    slowMo: 100,
    devtools: true
  });
  const page = await browser.newPage();
  await page.setViewport({width, height});
  await page.goto(url);
  await page.waitForSelector('.site-main--contacts');

  const contacts = await page.evaluate(async () => {
    let $data = $('.site-main--contacts > .s-contact-wrap[data-address=""]');
    return {
      title: $data.context.title,
      text: $data[0].outerText,
    }
  });

  await browser.close();

  contacts.url = url;

  let text = `
${contacts.url}
-----------------
${contacts.title}
${contacts.text}
`;

  msg['_' + storage.get('botName') + '_sevenergosbit_contact'] = contacts;

  return await botEvents.sendEvent('message',
    {
      id: msg.message.chat.id,
      data: text,
      options: options
    },
    {
      message: 'sevenergosbit_contact',
      data: msg,
    });
}