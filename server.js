'use strict';

require('dotenv').config();
const express = require('express');
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
    const dataResult = weatherResponse?.data;
    const forecastArray = dataResult?.data.map(day => new Forecast(day));
    response.status(200).send(forecastArray);
  } catch (error) {
    next(error);
  }
});

app.get('/movies', async (request, response, next) => {
  try {
    const city = request.query.city;
    const movieResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}&page=1`);
    const movieArray = movieResponse.data.results.map(element => new Movie(element)).splice(0, 3);
    response.status(200).send(movieArray);
  }
  catch (error) {
    next(error);
  }
})

class Forecast {
  constructor(weatherObj) {
    this.date = weatherObj.datetime;
    this.description = weatherObj.weather.description;
  }
}

class Movie {
  constructor(movieObj) {
    this.id = movieObj.id;
    this.title = movieObj.title;
    this.release_date = movieObj.release_date;
    this.poster_url = movieObj.poster_path && `https://image.tmdb.org/t/p/w500${movieObj.poster_path}`;
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
