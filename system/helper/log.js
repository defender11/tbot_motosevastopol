const Storage = require('../storage/storage.js');
let storage = Storage.getInstance();
const fs = require('fs');
const moment = require('moment');
const LogModel = require("../../system/model/database/log");

module.exports = {
  add: function (message = '', data = '') {
    const dt = moment().format('YYYY/MM/DD HH:mm:ss');
    // const pathLogFile = storage.get('appDir') + storage.get('path').log;

    // let str = `[ ${dt} ] | ${message} | ` + JSON.stringify(data);
    //
    // storage.set('log', str, true);
    //
    // fs.readFile(pathLogFile, 'utf8', function(error, fileContent){
    //   if(error) throw error;
    //
    //   let toWrite = fileContent + "\n" + str;
    //
    //   fs.writeFile(pathLogFile, toWrite, function(error){
    //     if(error) throw error;
    //   });
    // });

    LogModel.insert.insert({
      date: dt,
      message: message,
      queryObject: JSON.stringify(data),
    });
  },

  show: function (data) {
    console.clear();
    console.log('-----------');
    console.log(data);
  },

  clearLog: function () {
    fs.writeFile(storage.get('appDir') + storage.get('path').log, '', function(error){
      if(error) throw error; // ошибка чтения файла, если есть
    });
  }
}