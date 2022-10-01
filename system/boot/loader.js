const Fs = require('fs');
const Path = require('path');

const files = {
  loadFromPath: function (path, withoutSample = false) {
    const appDir = require('../helper/appDir.js');

    const loadedList = [],
      absolutePath = appDir + path;

    Fs.readdirSync(absolutePath).forEach(file => {
      const fileInfo = {
        path: absolutePath + '/' + file,
        name: Path.basename(absolutePath + '/' + file, '.js')
      };

      if (withoutSample && fileInfo.name.includes('-sample')) {
        return false;
      }

      loadedList[fileInfo.name] = this.loadFile(fileInfo);
    });

    return loadedList;
  },
  loadFile: function (fileInfo) {
    const Storage = require('../storage/storage');
    let storage = Storage.getInstance();
    const Log = require('../helper/log');

    try {
      storage.set('loadedFiles', fileInfo, true);
      Log.add('loadedFiles', fileInfo);

      return require(fileInfo.path);
    } catch (e) {

      console.log(e.message);
      Log.add('loadedFiles', e.message);
    }
  }
}

module.exports = files;