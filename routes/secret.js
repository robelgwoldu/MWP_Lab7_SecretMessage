/**
 * Created by robelwoldu on 7/4/17.
 */

var express = require('express');
var router = express.Router();
var mongo = require('mongoskin');
var crypto = require('crypto');

router.get('/', function(req, res, next) {
    var db = mongo.db('mongodb://localhost:27017/Lab7_1', {native_parser: true});

    db.bind('homework7');

    db.homework7.findOne({}, function(err, item){
        if (err){
            console.log(err);
        }
        else {
            const decipher = crypto.createDecipher('aes256', 'asaadsaad');
            const encrypted = item.message;
            var decrypted = decipher.update(encrypted, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            db.close();
            res.render('index', {'decrypted': decrypted, 'title': 'Lab7'});
        }
        
    });

});

module.exports = router;