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
const Neighborhood = require("../models/neighborhood");
const SuggestedRoute = require("../models/suggestedRoute");

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

// const updateSite = async () => {
//     const site = await Site.updateOne({ _id: "610073bf605b7a2390e76155"}, {$set: { geometry: { coordinates: [-90.18945461279078, 38.62776993924334]}}});
//     // await site.updateOne()
//     console.log(site);    
// }

// updateSite().then(() => {
//     mongoose.connection.close();
// })

const addRoute = async () => {
    const downtown = await Neighborhood.findById("60fb2235e1e38f5420093fe5");
    const site = await Site.findById("610073bf605b7a2390e76155");
    const Architecture = new SuggestedRoute({
        name: "Architectural Tour",
        neighborhood: downtown.name,
    });
    Architecture.route.sites.push(site);    
    await Architecture.save();
    console.log(Architecture);
}

// const addToNeighborhood = async () => {
//     const downtown = await Neighborhood.findById("60fb2235e1e38f5420093fe5");
//     const site = await Site.find({ _id: "61006c048248633fc839a72a" } );
//     const New = new SuggestedRoute({
//         name: "Architectural Tour",
//         neighborhood: downtown.name,
//     });
//     await New.save();
//     New.route.sites.push(site);
//     await New.save();
//     console.log(New);
// }

addRoute().then(() => {
    mongoose.connection.close();
    console.log("connection closed");
})

