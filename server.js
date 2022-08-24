'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios').default;

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;

// Base Route
app.get('/', (request, response) => {
  response.status(200).send('Welcome to the server!');
});

app.get('/weather', async (request, response, next) => {
  try {
    const lat = request.query.lat;
    const lon = request.query.lon;
    const weatherResponse = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&units=I&days=3`);
    // const dataResult = weatherResponse.data.find(dataPoint => dataPoint?.city_name.toLowerCase().includes(searchQuery?.toLowerCase()));
    const dataResult = weatherResponse.data;
    console.log(dataResult);
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


// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}. App should be functioning.`));
