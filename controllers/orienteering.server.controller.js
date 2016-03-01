/**
 * Created by Agnieszka on 2016-02-24.
 */
var oEvent = require('../models/orienteering.server.model.js');
var endOfLine = require('os').EOL;

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

    entry.save(function (err) {
        if (err) {
            err.name = 'Błąd walidacji:';
            if (err.errors.oEventName) {
                err.errors.oEventName.path = 'Nazwa';
            }
            if (err.errors.oEventLocation) {
                err.errors.oEventLocation.path = 'Lokalizacja';
            }
            if (err.errors.oEventDate) {
                err.errors.oEventDate.path = 'Data';
            }
            if (err.errors.oCourse) {
                err.errors.oCourse.path = 'Trasa';
            }
            if (err.errors.oCup) {
                err.errors.oCup.path = 'Puchar';
            }
            if (err.errors.oRank) {
                err.errors.oRank.path = 'Miejsce';
            }

            var errList = [];
            for (var prop in err.errors) {
                errList.push(' Pole ', err.errors[prop].path, err.errors[prop], '. \n');
            }

            var errMsg = 'Nie udało się zapisać imprezy w bazie danych. \n' + err.name + errList.join('');
            res.render('newevent', {errorMessage: errMsg});
        } else {
            res.redirect(301, '/');
        }
    });
};

exports.getOEvent = function (req, res) {
    res.render('newevent', {title: 'Dodaj InO'});
};

exports.sortOEvents = function (req, res) {
    var query = oEvent.find();

    var sortObj = {};
    var sortKey = req.query.sortBy;
    sortObj[sortKey] = req.query.sortOrder;

    query.sort(sortObj);

    query.exec(function (err, results) {
        var renderObj = {};
        var eventsKey = 'events';
        var orderKey = req.query.sortBy + 'SortOrder';
        var iconKey = req.query.sortBy + 'SortIcon';
        renderObj[eventsKey] = results;
        renderObj[orderKey] = (req.query.sortOrder === 'asc') ? 'desc' : 'asc';
        renderObj[iconKey] = (req.query.sortOrder === 'asc') ? 'glyphicon-sort-by-attributes' : 'glyphicon-sort-by-attributes-alt';

        res.render('index', renderObj);
    });
};