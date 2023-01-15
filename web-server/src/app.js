const path = require("path");
const express = require("express");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

// get() determines what information to serve up when a url is called

// Will never run if index.html is provided
// app.get("", (req, res) => {
//     res.send("<h1>Hello Express</h1>");
// });

// app.get("/about", (req, res) => {
//     res.send("<h1>About</h1>");
// });

app.get("/weather", (req, res) => {
    res.send({
        forecast: 24,
        location: "Toronto",
    });
});

app.listen(3000, () => {
    console.log(`Server is up on port ${3000}.`);
});
