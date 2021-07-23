const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const options = { toJSON: { virtuals: true } };

const StateSchema = new Schema({
    name: {
        type: String
    },
    cities: [
        {
            type: Schema.Types.ObjectId,
            ref: "City"
        }
    ]
}, options);


module.exports = mongoose.model("State", StateSchema);