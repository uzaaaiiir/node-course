const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Uzair Mohiuddin",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Uzair Mohiuddin",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Uzair Mohiuddin",
        helpMessage: "Here's where you find help.",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address",
        });
    }

    console.log(req.query.address);
    res.send({
        address: req.query.address,
    });
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term.",
        });
    }

    res.send({
        products: [],
    });
    console.log(req);
    console.log(req.query);
});

// 404 for any help route not found
app.get("/help/*", (req, res) => {
    res.render("404", {
        errorMessage: "Help article not found.",
    });
});

// 404 for any route not found
app.get("*", (req, res) => {
    // renders a view, sends an object
    res.render("404", {
        title: "404",
        name: "Uzair Mohiuddin",
        errorMessage: "Page not found.",
    });
});

// Starts up server
app.listen(3000, () => {
    console.log(`Server is up on port ${3000}.`);
});
