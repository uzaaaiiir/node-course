"use strict";

const request = require("postman-request");

const url =
    "http://api.weatherstack.com/current?access_key=0353de7307be4eee4eb9e53769f0b567&query=Empire%20State%20Building&units=f";

request({ url: url, json: true }, (error, response) => {
    if (error) {
        console.log("Unable to connect to weather service!");
    } else if (response.body.error) {
        console.log("Unable to find location.");
    } else {
        const data = response.body.current;
        console.log(
            `${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out.`
        );
    }
});

// Geocoding
// Address -> Lat/Long -> Weather
const geocodeURL =
    "https://us1.locationiq.com/v1/search?key=pk.48e5fe92d6629a18152f39424ad4f237&q=Empire%20State%20Building&format=json&limit=1";

request({ url: geocodeURL, json: true }, (error, response) => {
    if (error) {
        console.log("Unable to connect to weather service!");
    } else if (response.body.error) {
        console.log("Unable to find location.");
    } else {
        const data = response.body[0];
        const location = data.display_name.split(",")[0];
        console.log(
            `The latitude and longitude of ${location} is: Lat ${data.lat} and Long ${data.lon}`
        );
    }
});
