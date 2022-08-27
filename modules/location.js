'use strict';

const axios = require('axios');
const cache = require('./cache.js').cache;

async function getLocation(req, res, next) {
  try {
    const query = req.query.query;

    const baseUrl = 'https://us1.locationiq.com/v1/search';
    const params = {
      key: process.env.LOCATIONIQ_API_KEY,
      q: query,
      format: 'json',
      addressdetails: 1,
      dedupe: 1,
      normalizeaddress: 1,
      normalizecity: 1,
    };
    const key = `${query}locationSearch`;

    if (cache.isCached(key) && !cache.isExpired(key)) {

      const locationToSend = cache.get(key).data;
      res.status(200).send(locationToSend);
    } else {

      const locationResponse = await axios.get(baseUrl, { params });

      const locationToSend = locationResponse.data[0];

      cache.set(key, locationToSend);

      res.status(200).send(locationToSend);
    }
  } catch (error) {
    next(error);
  }
}

module.exports = getLocation;
