const database = require('mongoose');
const Scheme = database.Schema;

const banSchema = new Scheme({
  user_id: {
    type: Intl,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },

  date_create: {
    type: Date,
    required: true
  },

  date_restore: {
    type: Date,
    required: true
  },

  message: {
    type: String,
    required: false,
  },

  queryObject: {
    type: String,
    default: false,
  }
});

const ModelFactory = require('./modelFactory');

module.exports = {
  find: ModelFactory.execute('FindCollections','ban', banSchema),
  insert: ModelFactory.execute('InsertCollections','ban', banSchema),
  update: ModelFactory.execute('UpdateCollections','ban', banSchema),
  delete: ModelFactory.execute('DeleteCollections','ban', banSchema),
};