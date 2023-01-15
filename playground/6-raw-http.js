const http = require("http");

const url = `http://api.weatherstack.com/current?access_key=0353de7307be4eee4eb9e53769f0b567&query=40,-75&units=m`;

const request = http.request(url, (response) => {
    let data = "";

    console.log("statusCode:", response.statusCode);
    console.log("headers:", response.headers);

    response.on("data", (chunk) => {
        data = data + chunk.toString();
    });

    response.on("end", () => {
        const body = JSON.parse(data);
        console.log(body);
    });
});

request.on("error", (error) => {
    console.log("An error", error);
});

request.end();
