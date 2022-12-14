const moment = require("moment");
const Storage = require('../../system/storage/storage.js');
let storage = Storage.getInstance();

module.exports = {
  addedCurrentTime: () => '[ ' + moment().format('HH:mm:ss') + ' ] ',

  preparedTime: (time) => moment(time, 'HH:mm:ss'),

  preparedGameTime: function (time) {
    return this.preparedTime(time)
      .subtract(storage.get('notification').timeBefore, 'minute')
      .format('HH:mm:00');
  },
}