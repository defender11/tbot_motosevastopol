const appDir = require('../helper/appDir.js');
const app = require('../config/enviroment.json');
const config = require('../../app/config/config.json');
const Entinity = require('../model/entinity');
const loader = require('../boot/loader');

const Storage = (function () {

  let instance = null,
    data = {
      users: {},
    };

  class Storage {

    constructor() {
    }

    init() {
      this.initEnvironment();
      this.initUserConfigs();
      this.initManual();
    }

    initEnvironment() {
      this.set('appDir', appDir);
      this.setList(app);
    }

    initUserConfigs() {
      let configs = loader.loadFromPath(this.get('path').configs, true);
      for (let config in configs) {
        this.setList(configs[config]);
      }
    }

    async initManual() {
      // const UsersModel = require('./../model/database/users');
      //
      // const usersList = await UsersModel.find.getBy('list');
      //
      // for (let user in usersList) {
      //   this.set('users', new Entinity(usersList[user]), true, user);
      // }
    }

    setList(list = []) {
      for (let key in list) {
        this.set(key, list[key]);
      }
    }

    get(key = '') {
      return key !== '' ? data[key] : data;
    }

    set(key, value = '', asNewRow = false, newRowID = false, newRowIDKey = '') {
      if (asNewRow) {
        if (newRowID) {
          data[key][newRowIDKey] = value;
        } else {
          data[key].push(value);
        }
      } else {
        data[key] = value;
      }
    }

    del(key, subKey = false) {
      if (subKey) {
        delete (data[key][subKey]);
      } else {
        delete (data[key]);
      }
    }

    update(dataList) {
      data = dataList;
    }
  }

  return {
    getInstance() {
      if (instance == null) {
        instance = new Storage();
        instance.init();
        instance.constructor = null;
      }
      return instance;
    }
  }
})();

module.exports = Storage;