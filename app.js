const express = require("express");
const app = express();
const path = require("path");
const ejsEngine = require("ejs-mate");
const methodOverride = require("method-override");
const mongoose = require("mongoose");

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = "pk.eyJ1IjoibGF1cmVuLWhhcm1vbiIsImEiOiJja3F3dHd4enEwM3cxMm9vN2dtZmNsc3B2In0.y-Ru-O-nK-vQak9_JWF3KQ";
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

const Site = require("./models/site");
const Neighborhood = require("./models/neighborhood");
const SuggestedRoute = require("./models/suggestedRoute");


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsEngine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));



app.listen("3000", () => {
    console.log(`On Port 3000`);
});

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/tours", async (req, res, next) => {
    const tours = await SuggestedRoute.find({});
    res.render("tours/index", { tours })
})

// app.get("/tours/all", async (req, res) => {
//     const sites = await Site.find({});
//     const tours = await SuggestedRoute.find({})
//         .populate({
//             path: "route",
//             populate: {
//                 path: "sites",
//                 populate: "geometry"
//             }
//         });
//     const coords = [];
//     res.render("tours/", { sites, tours, coords });
// });

app.get("/tours/:id", async (req, res) => {
    const { id } = req.params;
    const sites = [];
    const tour = await SuggestedRoute.findById(id)
        .populate({
            path: "route",
            populate: {
                path: "sites",
                populate: "geometry"
            }
        });
    const coords = [];
    for (let i = 0; i < tour.route.sites.length; i++) {
        coords.push(tour.route.sites[i].geometry.coordinates)
        sites.push(tour.route.sites[i])
    }
    res.render("tours/details", { sites, tour, coords });
});

app.get("/sites", async (req, res) => {
    const sites = await Site.find({});
    res.render("sites/index", { sites });
})


app.get("/sites/create", async (req, res) => {
    const neighborhoods = await Neighborhood.find({});
    const tours = await SuggestedRoute.find({});
    res.render("sites/create", { neighborhoods, tours })
})

app.post("/sites/create", async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.location,
        limit: 1
    }).send();
    const newSite = new Site(req.body.site);
    newSite.geometry = geoData.body.features[0].geometry;
    const neighborhood = await Neighborhood.findOne({ name: req.body.neighborhood });
    neighborhood.sites.push(newSite);
    const tours = await SuggestedRoute.find({ name: req.body.tours });
    for (let tour of tours) {
        tour.route.sites.push(newSite);
        await tour.save();
    }
    await neighborhood.save();
    await newSite.save();
    res.redirect("/tours");
})

app.get("/sites/:id", async (req, res) => {
    const { id } = req.params;
    const site = await Site.findById(id);
    const neighborhood = await Neighborhood.findOne({ sites: { $in: [ site.id ]}});
    res.render("sites/details", { site, neighborhood });
})

app.get("/sites/:id/edit", async (req, res, next) => {
    const { id } = req.params;
    const site = await Site.findById(id);
    const neighborhoods = await Neighborhood.find({});
    const tours = await SuggestedRoute.find({});
    res.render("sites/edit", { site, neighborhoods, tours })
});

app.put("/sites/:id", async (req, res, next) => {
    const { id } = req.params;
    const site = await Site.findByIdAndUpdate(id, { ...req.body.site });
    const geoData = await geocoder.forwardGeocode({
        query: req.body.location,
        limit: 1
    }).send();
    site.geometry = geoData.body.features[0].geometry;
    await site.save();
    res.redirect(`/sites/${site.id}`);
});

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


