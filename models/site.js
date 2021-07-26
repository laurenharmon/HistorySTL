const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const options = { toJSON: { virtuals: true } };

const SiteSchema = new Schema({
    name: {
        type: String
    }, 
    yearDeveloped: {
        type: Number
    },
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
    history: {
        type: String
    }
}, options);

SiteSchema.virtual("properties.popUpInfo").get(function () {
    const response = `<h4>${this.name}</h4>
    <p>Developed In: ${this.yearDeveloped}</p>`;
    const id = this._id;
    return response;  
});


module.exports = mongoose.model("Site", SiteSchema);