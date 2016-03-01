/**
 * Created by Agnieszka on 2016-02-24.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var matchString = /^[0-9a-ząćęłńóśźż \-_]+$/i;

mongoose.Error.messages.general.required = ' jest wymagane';
mongoose.Error.messages.String.match = ' zawierało nieprawidłową wartość ({VALUE})';
mongoose.Error.messages.Number.min = ' zawierało zbyt małą wartość ({VALUE})';

var oEventsSchema = new Schema({
    oEventName: {type: String, trim: true, required: true, match: matchString},
    oEventLocation: { type: String, trim: true, match: matchString},
    oEventDate: {type: Date, required: true},
    oCourse: {type: String, trim: true, match: matchString},
    oCup: {type: String, trim: true, match: matchString},
    oRank: {type: Number, min: 1},
    createdOn: {type: Date, default: Date.now}
});

module.exports = mongoose.model('oEvent', oEventsSchema);