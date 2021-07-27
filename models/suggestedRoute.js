const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const options = { toJSON: { virtuals: true } };

const SuggestedRouteSchema = new Schema({
    name: String,
    neighborhood: String,
    route: {
        sites: [
            {
                type: Schema.Types.ObjectId,
                ref: "Site"
            }
        ]
    }
}, options);

module.exports = mongoose.model("SuggestedRoute", SuggestedRouteSchema);