const LightHouse = require('./LightHouseSevstar');

class LightHouseChecker {
  #lightHouse

  constructor(parameters = {}) {
    this.#lightHouse = new LightHouse(parameters);
  }

  async check() {
    await this.#lightHouse.check();
  }
}

module.exports = LightHouseChecker;