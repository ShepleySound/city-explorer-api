'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors')
const data = require('./data/weather.json');

const app = express();
app.use(cors);
const PORT = process.env.PORT || 3002;

// Base Route
app.get('/', (request, response) => {
  response.status(200).send('Welcome to the server!');
});

app.get('/weather', (request, response, next) => {
  try {
    const lat = request.query.lat;
    const lon = request.query.lon;
    const searchQuery = request.query.searchQuery;
    const dataResult = data.find(dataPoint => new RegExp(searchQuery, 'i').test(dataPoint.city_name));
    const forecastArray = dataResult.data.map(day => new Forecast(day));
    console.log(searchQuery)
    response.status(200).send(forecastArray);
  } catch (error) {
    next(error);
  }
});

class Forecast {
  constructor(weatherObj) {
    this.date = weatherObj.datetime;
    this.description = weatherObj.weather.description;
  }
}

// Catch all. Sends a 404 error when path/route does not exist.
app.get('*', (request, response) => {
  response.status(404).send('Sorry! This does not exist!');
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});
