const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/sitesDB", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("database connected");
});

const Site = require("../models/site");
// const Neighborhood = require("../models/neighborhood");
// const { sites } = require("./seedHelpers");

// const makeSites = async () => {
//     const downtown = Neighborhood.find({ name: "Downtown "});
//     for (let site of sites) {
//        const newSite = new Site({
//            name: site.name,
//            yearDeveloped: site.yearDeveloped,
//            history: site.history,
//            geometry: {
//             type: "Point",
//             coordinates: [
//                 site.longitude,
//                 site.latitude
//             ]
//         },
//        });
//        await newSite.save();
//     }
// }

// const addSites = async () => {
//     const downtown = await Neighborhood.findById("60fb2235e1e38f5420093fe5");
//     const sites = await Site.find({});
//     for (let site of sites) {
//        downtown.sites.push(site);
//        await downtown.save();
//     }
// }


// addSites().then(() => {
//     mongoose.connection.close();
//     console.log("connection closed");
// })

// const update = async() => {
//     const id =  "60fb2f53b3e5bd2ff4ef50f5";
//     const toUpdate = await Site.findByIdAndUpdate(id, { $set: { "geometry": { "coordinates": [-90.18753086136303, 38.62471736058001]}}});
//     console.log(toUpdate.geometry.coordinates);
// }
// update().then(() => {
//     mongoose.connection.close();
//     console.log("connection closed");
// })
