'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const data = require('./data/weather.json');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;

// Base Route
app.get('/', (request, response) => {
  response.status(200).send('Welcome to the server!');
});

app.get('/weather', (request, response, next) => {
  try {
    // const lat = request.query.lat;
    // const lon = request.query.lon;
    const searchQuery = request.query.search_query;
    const dataResult = data.find(dataPoint => dataPoint?.city_name.toLowerCase().includes(searchQuery?.toLowerCase()));
    const forecastArray = dataResult?.data.map(day => new Forecast(day));
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


app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
