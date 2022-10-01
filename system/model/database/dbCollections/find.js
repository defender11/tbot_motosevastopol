const Model = require('./model');

class FindCollections extends Model {
  async getBy(type, value) {
    try {
      return this[type].call(this, value);
    } catch (e) {
      console.error(e.message);
    }
  }

  async list() {
    return this.queryFind();
  }

  async name(label) {
    return this.queryFind({username: label});
  }

  async id(key) {
    return this.queryFind({id: key});
  }

  queryFind(data = {}) {
    return this.instance()
      .find(data)
      .then((response) => {
        return response.reduce((acc, item) => {
          acc[item.id] = item;
          return acc;
        }, {});
      })
      .catch((error) => console.log(error));
  }
}

module.exports = FindCollections;