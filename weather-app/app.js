"use strict";

const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast");

geocode("Philly", (error, data) => {
    if (error) {
        return console.log(error);
    }

    forecast(data.latitude, data.longitude, (error, forecastData) => {
        if (error) {
            return console.log(error);
        }

        console.log(data.location);
        console.log(forecastData);
        console.log(
            `${forecastData.weatherDescription}. It is currently ${forecastData.temperature} degrees out. It feels like ${forecastData.feelsLike} degrees out.`
        );
    });
});
