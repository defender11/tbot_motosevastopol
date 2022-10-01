const Model = require('./model');

class DeleteCollections extends Model {
  async delete(id) {
    try {
      return this.instance()
        .remove({
          id: id
        });
    } catch (e) {
      console.error(e.message);
    }
  }
}

module.exports = DeleteCollections;