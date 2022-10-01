const database = require('mongoose');
const Storage = require('../storage/storage');
const storage = Storage.getInstance();

const db = (function () {
    return {
      init: function () {
        database
          .connect(storage.get('db_mongo'), {useNewUrlParser: true, useUnifiedTopology: true})
          .then((res) => console.log('Connected to DB'))
          .catch((error) => console.log(error));
      },
    }
  }
)();

module.exports = db;