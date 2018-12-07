var express = require('express');
var router = express.Router();

var PouchDB = require('pouchdb');
var db = new PouchDB('http://116.85.30.223:5984/traccar');
db.info().then(function (info) {
    console.log(info);
})

var flatten = require('flat')

router.post('/', function (req, res, next) {
    console.log(req.body.device.uniqueId, req.body.position);
    let log = flatten(req.body);
    log.timestamp = new Date(req.body.position.fixTime).getTime()
    db.put(flatten(req.body));

    res.send('ok');
})

router.get('/', function (req, res, next) {
    // res.render('index', { title: 'Express' });
    console.log('data', req.url);
    res.send('ok')
});

module.exports = router;


