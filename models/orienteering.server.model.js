/**
 * Created by Agnieszka on 2016-02-24.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var matchString = /^[0-9a-ząćęłńóśźż \-_]+$/i;

var requiredNonEmptyVal = [
    function (value) {
        console.log('wartość: ', value);
        if (value) {
            value = String(value);
            value = value.trim();
            return value.length > 0;
        }
    }, ' nie może być puste'
];

mongoose.Error.messages.general.required = ' jest wymagane';
mongoose.Error.messages.String.match = ' zawierało nieprawidłową wartość ({VALUE})';
mongoose.Error.messages.Number.min = ' zawierało zbyt małą wartość ({VALUE})';

var oEventsSchema = new Schema({
    oEventName: {type: String, required: true, match: matchString, validate: requiredNonEmptyVal},
    oEventLocation: { type: String, match: matchString, validate: requiredNonEmptyVal},
    oEventDate: {type: Date, required: true, validate: requiredNonEmptyVal},
    oCourse: {type: String, match: matchString, validate: requiredNonEmptyVal},
    oCup: {type: String, match: matchString, validate: requiredNonEmptyVal},
    oRank: {type: Number, min: 1, validate: requiredNonEmptyVal},
    createdOn: {type: Date, default: Date.now}
});

module.exports = mongoose.model('oEvent', oEventsSchema);