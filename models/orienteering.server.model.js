/**
 * Created by Agnieszka on 2016-02-24.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var oEventsSchema = new Schema({
    oEventName: String,
    oEventLocation: String,
    oEventDate: Date,
    course: String,
    oCup: String,
    ranked: Number,
    createdOn: {type: Date, default: Date.now}
});

module.exports = mongoose.model('oEvent', oEventsSchema);