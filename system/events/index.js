const Storage = require('../storage/storage');
let storage = Storage.getInstance();
const loader = require("../boot/loader");

const listTypes = {},
  pathEventsList = storage.get('path').events,
  eventList = {};

for (let eventType in pathEventsList) {
  listTypes[eventType] = loader.loadFromPath(pathEventsList[eventType]);
}

for (let type in listTypes) {
  eventList[type] = {};

  if (Object.keys(listTypes[type]).length) {
    for (let objName in listTypes[type]) {
      eventList[type][objName] = listTypes[type][objName].execute;
    }
  }
}

module.exports = eventList;