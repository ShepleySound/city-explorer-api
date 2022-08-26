'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios').default;

const app = express();

app.use(cors());
const getWeather = require('./modules/weather.js');
const PORT = process.env.PORT || 3002;

// Base Route
app.get('/', (request, response) => {
  response.status(200).send('Welcome to the server!');
});

// API Docs - https://www.weatherbit.io/api
app.get('/weather', getWeather);

// API Docs - https://developers.themoviedb.org/3/getting-started
app.get('/movies', async (request, response, next) => {
  try {
    const city = request.query.city;
    const movieResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}&page=1`);
    const movieArray = movieResponse.data.results.map(element => new Movie(element)).splice(0, 8);
    response.status(200).send(movieArray);
  }
  catch (error) {
    next(error);
  }
});



class Movie {
  constructor(movieObj) {
    this.id = movieObj.id;
    this.title = movieObj.title;
    this.description = movieObj.overview;
    this.release_date = movieObj.release_date;
    this.poster_url = movieObj.backdrop_path && `https://image.tmdb.org/t/p/w780${movieObj.backdrop_path}`;
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
