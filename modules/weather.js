'use strict';

const axios = require('axios');

// API Docs - https://www.weatherbit.io/api
async function getWeather(req, res, next) {
  try {

    // Front-End sends a latitude and longitude when making a weather request.
    const lat = req.query.lat;
    const lon = req.query.lon;

    // Use lat & lon to create a URL to make a request to the Weatherbit API.
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&units=I&days=14`;

    const weatherResults = await axios.get(url);

    const forecastArray = weatherResults?.data.data.map(day => new Weather(day));
    res.status(200).send(forecastArray);
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



