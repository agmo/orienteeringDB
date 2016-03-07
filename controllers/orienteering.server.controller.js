/**
 * Created by Agnieszka on 2016-02-24.
 */
var oEvent = require('../models/orienteering.server.model.js');

var totalPages;
oEvent.count({}, function (err, count) {
    totalPages = count;
});

var paginate = (function () {
    var cache = {
        currentPage: 1
    };
    return function (query, pageNo) {
        var pageSize = 10;
        var pageCount = Math.ceil(totalPages / pageSize);

        cache.currentPage = pageNo || cache.currentPage;
        query.skip((cache.currentPage - 1) * pageSize).limit(pageSize);

        return {
            pageCount: pageCount,
            currentPage: cache.currentPage
        };
    };
}());

var sortOEvents = function (query, sortBy, sortOrder) {
    var sortObj = {};
    var sortKey = sortBy;
    sortObj[sortKey] = sortOrder;

    var renderObj = {};
    var orderKey = sortBy + 'SortOrder';
    var iconKey = sortBy + 'SortIcon';
    renderObj[orderKey] = (sortOrder === 'asc') ? 'desc' : 'asc';
    renderObj[iconKey] = (sortOrder === 'asc') ? 'glyphicon-sort-by-attributes' : 'glyphicon-sort-by-attributes-alt';
    renderObj.sortCriterion = sortBy;
    renderObj.sortOrder = sortOrder;

    return {
        query: query.sort(sortObj),
        renderObj: renderObj
    };
};

exports.listOEvents = function (req, res) {
    var pageNo = parseInt(req.query.page) || 1;
    var query = oEvent.find();
    var renderObj = {};

    if (req.query.sortBy && req.query.sortOrder) {
        var sortedQuery = sortOEvents(query, req.query.sortBy, req.query.sortOrder);
        query = sortedQuery.query;
        renderObj = sortedQuery.renderObj;
    } else {
        query.sort({createdOn: 'desc'});
    }

    var paginatedQuery = paginate(query, pageNo);

    renderObj.pageCount = paginatedQuery.pageCount;
    renderObj.currentPage = paginatedQuery.currentPage;

    query.exec(function (err, results) {
        var eventsKey = 'events';
        renderObj[eventsKey] = results;

        res.render('index', renderObj);
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
