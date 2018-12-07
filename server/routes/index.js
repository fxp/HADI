var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    // res.render('index', { title: 'Express' });
    console.log('data', req.url);
    res.send('ok')
});

module.exports = router;
