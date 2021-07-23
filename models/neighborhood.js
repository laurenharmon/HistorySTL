const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const options = { toJSON: { virtuals: true } };

const NeighborhoodSchema = new Schema({
    name: String,
    sites: [
        {
            type: Schema.Types.ObjectId,
            ref: "Site"
        }
    ]
}, options);


module.exports = mongoose.model("Neighborhood", NeighborhoodSchema);