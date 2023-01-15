const request = require("postman-request");

// const url =
//     "http://api.weatherstack.com/current?access_key=0353de7307be4eee4eb9e53769f0b567&query=Empire%20State%20Building&units=f";

// request({ url: url, json: true }, (error, response) => {
//     if (error) {
//         console.log("Unable to connect to weather service!");
//     } else if (response.body.error) {
//         console.log("Unable to find location.");
//     } else {
//         const data = response.body.current;
//         console.log(
//             `${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out.`
//         );
//     }
// });

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=0353de7307be4eee4eb9e53769f0b567&query=${latitude},${longitude}&units=f`;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined);
        } else if (response.body.error) {
            callback("Unable to find location.", undefined);
        } else {
            callback(undefined, {
                weatherDescription:
                    response.body.current.weather_descriptions[0],
                temperature: response.body.current.temperature,
                feelsLike: response.body.current.feelslike,
            });
        }
    });
};

module.exports = forecast;
