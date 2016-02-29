/**
 * Created by Agnieszka on 2016-02-24.
 */
var oEvent = require('../models/orienteering.server.model.js');

exports.listOEvents = function (req, res) {
    var query = oEvent.find();
    query.sort({createdOn: 'desc'})
        .limit(10)
        .exec(function (err, results) {
            res.render('index', {events: results})
        });
};

exports.createOEvent = function (req, res) {
    var entry = new oEvent({
        oEventName: req.body.oEventName,
        oEventLocation: req.body.oEventLocation,
        oEventDate: req.body.oEventDate,
        oCourse: req.body.oCourse,
        oCup: req.body.oCup,
        oRank: req.body.oRank
    });

    entry.save();
    res.redirect(301, '/');
};

exports.getOEvent = function (req, res) {
    res.render('newevent', {title: 'Dodaj InO'});
};

exports.sortOEvents = function(req, res) {
    var query = oEvent.find();

    var sortObj = {};
    var sortKey = req.query.sortBy;
    sortObj[sortKey] = req.query.sortOrder;

    query.sort(sortObj);

    query.exec(function(err, results) {
        var renderObj = {};
        var eventsKey = 'events';
        var orderKey = req.query.sortBy + 'SortOrder';
        var iconKey = req.query.sortBy + 'SortIcon';
        renderObj[eventsKey] = results;
        renderObj[orderKey] = (req.query.sortOrder === 'asc') ? 'desc':'asc';
        renderObj[iconKey] = (req.query.sortOrder === 'asc') ? 'glyphicon-sort-by-attributes':'glyphicon-sort-by-attributes-alt';

        res.render('index', renderObj);
    });
};