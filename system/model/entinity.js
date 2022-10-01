class Entinity {
  constructor(data) {
    this.id = data.id || null;
    this.is_bot = data.is_bot || null;
    this.first_name = data.first_name || null;
    this.last_name = data.last_name || null;
    this.username = data.username || null;
    this.language_code = data.language_code || null;
  }

  getID() {
    return this.id;
  }

  getFirsName() {
    return (this.first_name || '');
  }

  getLastName() {
    return (this.last_name || '');
  }

  getUserName() {
    return this.username;
  }
}

module.exports = Entinity;