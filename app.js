const express = require("express");
const app = express();
const path = require("path");
const ejsEngine = require("ejs-mate");
const methodOverride = require("method-override");
const mongoose = require("mongoose");

const Site = require("./models/site");


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsEngine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.listen("3000", () => {
    console.log(`On Port 3000`);
})

app.get("/", async (req, res) => {
    const sites = await Site.find({});
    res.render("home", {sites});
})
// const db = mongoose.connection;
mongoose.connect("mongodb://localhost:27017/sitesDB", {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
}).then(() => {
    console.log("database connected");
}).catch(err => {
    console.log("whoops, there was an error:", err);
})


