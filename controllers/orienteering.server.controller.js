/**
 * Created by Agnieszka on 2016-02-24.
 */
var oEvent = require('../models/orienteering.server.model.js');

exports.listOEvents = function (req, res) {
    console.log(req, res);
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