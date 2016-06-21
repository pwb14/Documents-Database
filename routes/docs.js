var express = require('express');
var router = express.Router();

/*
 * GET docs.
 */
router.get('/doclist', function(req, res) {
    var db = req.db;
    var collection = db.get('doclist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

module.exports = router;