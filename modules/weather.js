'use strict';

const axios = require('axios');
const cache = require('./cache.js').cache;


// API Docs - https://www.weatherbit.io/api
async function getWeather(req, res, next) {
  try {

    // Front-End sends a latitude and longitude when making a weather request.
    const lat = req.query.lat;
    const lon = req.query.lon;
    const baseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
    // Use API Key, lat, & lon to create a URL to make a request to the Weatherbit API.
    const params = {
      key: process.env.WEATHER_API_KEY,
      lat: lat,
      lon: lon,
    };
    const key = `${lat}${lon}weatherSearch`;

    if (cache.isCached(key) && !cache.isExpired(key)) {
      // Pull data from cache
      const forecastArray = cache.get(key).data;
      // Send data back to front-end
      res.status(200).send(forecastArray);
    } else {
      // Request new data from API
      const weatherResults = await axios.get(baseUrl, { params });
      const forecastArray = weatherResults?.data.data.map(day => new Weather(day));
      // Set new data in cache
      cache.set(key, forecastArray);

      // Send data back to front-end
      res.status(200).send(forecastArray);
    }
  } catch (error) {
    next(error);
  }
}

// Class for cleaning up response from Weatherbit API.
class Weather {
  constructor(weatherObj) {
    this.date = weatherObj.valid_date;
    this.description = weatherObj.weather.description;
    this.icon = weatherObj.weather.icon;
    this.lowTemp = weatherObj.low_temp;
    this.highTemp = weatherObj.high_temp;
    this.pop = weatherObj.pop;
    this.humidity = weatherObj.rh;
  }
}

module.exports = getWeather;



