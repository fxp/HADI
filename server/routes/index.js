var express = require('express');
var router = express.Router();

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});
client.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: 1000
}, function (error) {
    if (error) {
        console.trace('elasticsearch cluster is down!');
    } else {
        console.log('All is well');
    }
});

const flatten = require('flat')

router.post('/', function (req, res, next) {
    // console.log(req.body);
    console.log(req.body.device.uniqueId, req.body.position.latitude, req.body.position.longitude);
    let log = flatten(req.body);
    log.timestamp = new Date(req.body.position.fixTime).getTime();
    console.log(log)

    client.index({
        index: 'traccar',
        body: log
    },function(err,resp,status) {
        console.log(resp);
    });

    // db.put(log)
    //     .then(function (result) {
    //         console.log(result)
    //     }, function (err) {
    //         console.error(err)
    //     })

    res.send('ok');
})

router.get('/', function (req, res, next) {
    // res.render('index', { title: 'Express' });
    console.log('data', req.url);
    res.send('ok')
});

module.exports = router;


