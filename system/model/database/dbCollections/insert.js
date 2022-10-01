const Model = require('./model');

class InsertCollections extends Model {
  async insert(data) {
    try {
      return this.instance()
        .insertMany(data);
    } catch (e) {
      console.error(e.message);
    }
  }
}

module.exports = InsertCollections;