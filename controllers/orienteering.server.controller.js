/**
 * Created by Agnieszka on 2016-02-24.
 */
var oEvent = require('../models/orienteering.server.model.js');

exports.createOEvent = function (req, res) {
    var entry = new oEvent({
        oEventName: req.body.oEventName,
        oEventLocation: req.body.oEventLocation,
        oEventDate: req.body.oEventDate,
        course: req.body.course,
        oCup: req.body.oCup,
        ranked: req.body.ranked
    });

    entry.save();
    res.redirect(301, '/');
};

exports.getOEvent = function (req, res) {
    res.render('newevent', {title: 'Dodaj InO'});
};