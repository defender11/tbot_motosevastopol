const database = require("mongoose");

class Model {
  constructor(name, schema) {
    this.name = name;
    this.schema = schema ?? null;

    this.model = null;
  }

  instance() {
    if (this.model === null) {
      this.model = database.model(this.name, this.schema);
    }

    return this.model;
  }
}

module.exports = Model;