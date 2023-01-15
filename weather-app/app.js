"use strict";

const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast");

const address = process.argv[2];

if (!address) {
    console.log("Please provide an address.");
} else {
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return console.log(error);
        }

        forecast(
            latitude,
            longitude,
            (error, { weatherDescription, temperature, feelsLike }) => {
                if (error) {
                    return console.log(error);
                }

                console.log(location);
                console.log(
                    `${weatherDescription}. It is currently ${temperature} degrees out. It feels like ${feelsLike} degrees out.`
                );
            }
        );
    });
}
