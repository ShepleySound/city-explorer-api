'use strict';

const axios = require('axios');

// API Docs - https://developers.themoviedb.org/3/getting-started
async function getMovies(req, res, next) {
  try {

    // Front-End sends a query for the city name when making a movie request.
    const city = req.query.city;

    // Use city query to create a URL to make a request to the Movie Database API.
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}&page=1`;

    const movieResponse = await axios.get(url);
    const movieArray = movieResponse.data.results.map(element => new Movie(element)).splice(0, 8);

    res.status(200).send(movieArray);
  } catch (error) {
    next(error);
  }
}

// Class for cleaning up response from Movie Database API.
class Movie {
  constructor(movieObj) {
    this.id = movieObj.id;
    this.title = movieObj.title;
    this.description = movieObj.overview;
    this.release_date = movieObj.release_date;
    this.poster_url = movieObj.backdrop_path && `https://image.tmdb.org/t/p/w780${movieObj.backdrop_path}`;
  }
}

module.exports = getMovies;



