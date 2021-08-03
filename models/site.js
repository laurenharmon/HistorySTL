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
        <div class="history-card" onload="init()">
            <div class="content">
                <div class="card">
                    <div class="card-header">
                        <div class="card-header-title"><p class="is-pulled-left">${this.name}</p></div>
                        <div class="tabs is-pulled-right mr-3">
                        <ul id="tabs">
                            <li class="history-tab">
                                <a href="#history">History</a>
                            </li>
                            <li class="year-tab">
                                <a href="#year">Year Developed</a>
                            </li>
                            <li class="filler-tab">
                                <a href="#filler">Filler</a>
                            </li>
                        </ul>
                    </div>
                        </div>
                            <div class="card-content history">
                                <div class="content">
                                    <div class="tabContent" id="history">
                                        <div>
                                          <p>${this.history}</p>
                                        </div>
                                      </div>

                                      <div class="tabContent" id="year">
                                      <div>
                                        <p>${this.yearDeveloped}</p>
                                      </div>
                                    </div>

                                    <div class="tabContent" id="filler">
                                    <div>
                                      <p>FILLER STUFF HERE</p>
                                    </div>
                                  </div>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    return response;
});



module.exports = mongoose.model("Site", SiteSchema);