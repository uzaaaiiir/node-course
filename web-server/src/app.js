const express = require("express");

const app = express();

// app.com
const port = 3000;

// get() determines what information to serve up when a url is called
app.get("", (req, res) => {
    res.send("<h1>Hello Express</h1>");
});

app.get("/help", (req, res) => {
    res.send([
        {
            name: "Uzair",
            age: 24,
            location: "Toronto, ON",
        },
        {
            name: "John",
            age: 23,
        },
    ]);
});

app.get("/about", (req, res) => {
    res.send("<h1>About</h1>");
});

app.get("/weather", (req, res) => {
    res.send({
        forecast: 24,
        location: "Toronto",
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});
