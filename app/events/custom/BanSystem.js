const Storage = require('../../../system/storage/storage.js');
let storage = Storage.getInstance();
const debug = require('../../../system/helper/debug');
const BanSystem = require('../../helper/BanSystem/banSystem');


module.exports = {
  init: function () {
    let banSystem = new BanSystem();
  }
}