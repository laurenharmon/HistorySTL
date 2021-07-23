const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const options = { toJSON: { virtuals: true } };

const CitySchema = new Schema({
    name: String,
    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    neighborhoods: [
        {
            type: Schema.Types.ObjectId,
            ref: "Neighborhood"
        }
    ]
}, options);



module.exports = mongoose.model("City", CitySchema);