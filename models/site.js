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
    const response = `<h4><strong>${this.name}</strong></h4>`;
    const id = this._id;
    return response;
});

SiteSchema.virtual("properties.clickDisplay").get(function () {
    const response = `
    <article class="tile is-child notification odd">
        <div class="content facts">
            
    
<h2 class="has-text-white">${this.name}</h2>
    <div class="card mr-3">
    <div class="card-content">
      <div class="content facts">
        ${this.history}
        <br>
        <p><strong>Developed In:</strong> ${this.yearDeveloped}</p>
      </div>
    </div>
  </div></article></div>`;
    return response;
});



module.exports = mongoose.model("Site", SiteSchema);