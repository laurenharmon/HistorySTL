const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const options = { toJSON: { virtuals: true } };

const SiteSchema = new Schema({
    name: {
        type: String
    }, 
    type: {
        type: String
    },
    yearDeveloped: {
        type: Number
    },
    // geometry: {
    //     type: {
    //         type: String,
    //         enum: ["Point"],
    //         required: true
    //     },
    //     coordinates: {
    //         type: [Number],
    //         required: true
    //     }
    // },
    history: {
        type: String
    }
}, options);


module.exports = mongoose.model("Site", SiteSchema);