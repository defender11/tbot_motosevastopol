const WeatherYandex = require('./weatherYandex');
const WeatherGismeteo = require('./weatherGismeteo');

class FactoryWeather {
  static create(name) {
    if (name === 'yandex') return new WeatherYandex();
    if (name === 'gismeteo') return new WeatherGismeteo();
  }
}

module.exports = FactoryWeather;