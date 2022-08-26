# City Explorer API

**Author**: Robert Shepley  
![Version](https://img.shields.io/github/package-json/v/shepleysound/city-explorer-api)

## Overview

This project acts as the back-end server for my [City Explorer](https://github.com/shepleysound/city-explorer) project.

### [Live Site](https://shepleysound-city-explorer.netlify.app/)

## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->
Back-End - [NodeJS](https://nodejs.org/)  
Web Application Framework - [Express](https://expressjs.com/)
External Weather API - [Weatherbit](https://www.weatherbit.io/api)
External Movie Database API - [The Movie Database](https://developers.themoviedb.org/)

This project is a first attempt at creating a back-end to be used in conjunction with the City Explorer front-end. It will take requests from the client, handle the querying of API's, parse any responses, and will return that data back to the client/front-end.

<details><summary>Back-End Request Response Diagram</summary>

![Request Response Diagram](docs/cityexplorer-requestresponse-diagram.jpg)

</details>

## Change Log
<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an example:
-->

***08-23-2022 3:00pm*** - Application is initialized and ready for development.  

***08-23-2022 5:30PM*** - Application receives requests and sends a response with static data.

***08-23-2022 5:30PM*** - Application receives requests and sends a response using the WeatherBit API.

***08-24-2022 11:00PM*** - Application online. Heroku integration repaired. Will continue monitoring for errors.

***08-25-2022 7:45AM*** - Application sends requests to The Movie Database API.

***08-25-2022 8:30PM*** - Back-End is modularized and successfully communicates with the Front-End.

## Credit and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->

## Time Estimates

### August 23, 2022

| Feature Name | Estimated Time | Start Time | Finish Time |
| ------------ | -------------- | ---------- | ----------- |
| Repository/Project Setup | 30 Minutes | 2:45PM | 3:00PM |
| Documentation Work | 30 Minutes | 3:00PM | 3:45PM |
| Server creation | 1 Hour | 3:45PM | 5:30PM |
| Weather API Request/Response | 1 Hour | 6:30PM | 8PM |

### August 25, 2022

| Feature Name | Estimated Time | Start Time | Finish Time |
| ------------ | -------------- | ---------- | ----------- |
| Movie API Request/Response | Estimated Time | 1 Hour | 7:00AM | 7:45AM |
| Modularize/Refactor | Estimated Time | 2 Hours | 5PM | 7:45PM |
