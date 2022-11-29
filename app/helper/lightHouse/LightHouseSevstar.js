const moment = require("moment/moment");
const {LightHouse, sourceMessages} = require('./LightHouse');
const Storage = require('../../../system/storage/storage.js');
let storage = Storage.getInstance();

const Messages = {
  getCopyRight() {
    return `=======================
✅Сформировано на данных компании
© 2003-${moment().year()} Севстар.`;
  }
};

class LightHouseSevstar extends LightHouse {

  constructor(props) {
    super(props);
    this.Messages = Object.assign(sourceMessages, Messages);
    this.searchState = 1;
  }


  getFilteringListByState(list) {
    super.getFilteringListByState();

    const newList = [[]];
    let startIndexMessage = 0,
      limitMessage = 120,
      partsCounts = 0,
      housesCount = 0;

    for (let item in list) {
      if (startIndexMessage >= limitMessage) {
        ++partsCounts;
        startIndexMessage = 0;
        newList.push([]);
      }

      if (list[item] === this.searchState) {
        newList[partsCounts].push({
          street: item,
          state: list[item],
        });

        ++housesCount;
        ++startIndexMessage;
      }
    }

    return {newList, housesCount};
  }

  async sendMessagesList(newList) {
    super.sendMessagesList();

    if (newList.length) {
      let self = this;

      for (let i = 0; i < newList.length; i++) {

        let list = '';

        for (let j = 0; j < newList[i].length; j++) {
          list += (list !== '' ? "\n" : '') + "⚡ " + newList[i][j].street;
        }

        await new Promise((resolve, reject) => {
          setTimeout(async function () {
            await self.send(list);
            resolve();
          }, 500);
        });
      }
    }
  }

  async check() {
    let self = this;
    await super.check(async function (response) {
      if (response.data !== '') {

        let housesLightString = response.data.replace(/sevstar_coverage_map.houses_states = /gm, '');
        housesLightString = housesLightString.replace(/;/gm, '');
        let housesLightJson = JSON.parse(housesLightString);

        let {newList, housesCount} = self.getFilteringListByState(housesLightJson);

        let message = self.Messages.getTitleTime();

        if (newList.length > 0) {
          message += "\n" + self.Messages.getTitleHousesCount(housesCount);

          await self.send(message);

          await self.sendMessagesList(newList);

          message = '';

          if (housesCount > 35) {
            message += self.Messages.getFooterHousesCount(housesCount) + "\n";
          }

          message += self.Messages.getCopyRight();

          storage.set('LightHouseSevstar', newList);

          await self.send(message, {
            reply_markup: JSON.stringify({
              inline_keyboard: [
                [
                  {text: 'Поиск адресов в Новостях СевЭнергоСбыт', callback_data: '/cb_find_sevenergosbit_news_about_light_house'},
                ],
                [
                  {text: 'Телефоны СевЭнергоСбыт', callback_data: '/cb_show_contacts_sevenergosbit'},
                ],
                [
                  {text: 'Дома на карте', callback_data: '/cb_show_light_house_on_the_map'},
                ]
              ]
            })
          });

        } else {

          message += self.Messages.getSuccessMsg();
          message += self.Messages.getCopyRight();

          await self.send(message);
        }
      }
    });
  }
}

module.exports = LightHouseSevstar;