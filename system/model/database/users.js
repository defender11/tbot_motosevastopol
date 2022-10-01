const database = require('mongoose');
const Scheme = database.Schema;

const usersSchema = new Scheme({
  id: {
    type: Intl,
    required: true
  },
  is_bot: {
    type: Boolean,
    default: false
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
  }
});

const ModelFactory = require('./modelFactory');

module.exports = {
  find: ModelFactory.execute('FindCollections','users', usersSchema),
  insert: ModelFactory.execute('InsertCollections','users', usersSchema),
  update: ModelFactory.execute('UpdateCollections','users', usersSchema),
  delete: ModelFactory.execute('DeleteCollections','users', usersSchema),
};