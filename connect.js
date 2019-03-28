const mongodb = require('mongodb');
const url = 'mongodb://localhost:27017/';
exports.connect = new Promise(function(resolve, reject) {
    mongodb.connect(url, {
        useNewUrlParser: true
    }, function(err, db) {
        if (err) {
            return err;
        } else {
            var dbo = db.db("db");
            resolve(dbo);
            reject('reject');
        }
    });
});