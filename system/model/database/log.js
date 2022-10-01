const database = require('mongoose');
const Scheme = database.Schema;

const logSchema = new Scheme({
  date: {
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
  insert: ModelFactory.execute('InsertCollections','log', logSchema),
};