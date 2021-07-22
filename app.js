const express = require("express");
const app = express();
const path = require("path");
const ejsEngine = require("ejs-mate");
const methodOverride = require("method-override");
const mapboxgl = require('mapbox-gl');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsEngine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.listen("3000", () => {
    console.log(`On Port 3000`);
})

app.get("/", (req, res) => {
    res.render("home");
})