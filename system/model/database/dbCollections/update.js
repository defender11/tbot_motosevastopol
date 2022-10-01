const Model = require('./model');

class UpdateCollections extends Model {
  async update(id, data) {
    try {
      return this.instance()
        .updateOne(data);
    } catch (e) {
      console.error(e.message);
    }
  }
}

module.exports = UpdateCollections;