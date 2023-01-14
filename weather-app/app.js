"use strict";

// Synchronous Programming - goes in order from top to bottom
// console.log("Starting");

// setTimeout(() => {
//     console.log("2 Second Timer");
// }, 2000);

// setTimeout(() => {
//     console.log("0 Second Timer");
// }, 0);

// console.log("Stopping");

const request = require("postman-request");

const url =
    "http://api.weatherstack.com/current?access_key=0353de7307be4eee4eb9e53769f0b567&query=Toronto";

request({ url: url, json: true }, (error, response) => {
    // const data = JSON.parse(response.body);
    // console.log(data);
    // console.log(data.current);

    const data = response.body.current;
    console.log(data);
    console.log(
        `It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out.`
    );
});
