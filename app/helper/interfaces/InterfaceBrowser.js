class InterfaceBrowser {
  constructor(parameters) {
    this.width = parameters.width ?? 1280;
    this.height = parameters.height ?? 800;
    this.url = parameters.url ?? '';
  }

  async get(typeState) {
    return await this[typeState].apply(this);
  }
}

module.exports = InterfaceBrowser;