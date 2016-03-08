var express = require('express');
var router = express.Router();
var orienteeringCtrl = require('../controllers/orienteering.server.controller.js');
var oEvent = require('../models/orienteering.server.model.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    oEvent.count({}, function (err, count) {
        req.totalPages = count;
        next();
    });
}, function (req, res, next) {
    return orienteeringCtrl.listOEvents(req, res);
});

/* GET new oEvent page. */
router.get('/newevent', function (req, res) {
    return orienteeringCtrl.getOEvent(req, res);
});

/* POST new oEvent page. */
router.post('/newevent', function (req, res) {
    return orienteeringCtrl.createOEvent(req, res);
});

module.exports = router;