const FindCollections = require("./dbCollections/find"),
  InsertCollections = require("./dbCollections/insert"),
  UpdateCollections = require("./dbCollections/update"),
  DeleteCollections = require("./dbCollections/delete");


class ModelFactory {
  static factoryCollections = {
    FindCollections,
    InsertCollections,
    UpdateCollections,
    DeleteCollections,
  };

  static execute(classType, name, schema = null) {
    try {
      return new this.factoryCollections[classType](name, schema);
    } catch (e) {
      console.error(e.message);
    }
  }
}

module.exports = ModelFactory;