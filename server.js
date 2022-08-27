'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getWeather = require('./modules/weather.js');
const getMovies = require('./modules/movies.js');
const getLocation = require('./modules/location.js');

const app = express();

const PORT = process.env.PORT || 3002;

app.use(cors());

// Base Route
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the server!');
});

app.get('/location', getLocation);

// API Docs - https://www.weatherbit.io/api
app.get('/weather', getWeather);

// API Docs - https://developers.themoviedb.org/3/getting-started
app.get('/movies', getMovies);

// Catch all. Sends a 404 error when path/route does not exist.
app.get('*', (req, res) => {
  res.status(404).send('Sorry! This does not exist!');
});

// ERRORS
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).send(err.message);
});

// LISTEN
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}. App should be functioning.`));

