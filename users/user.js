var mongoose = require('mongoose');

function User() {
    var Connect = require('../connect');
    this.insert_user = function(userName) {
        var db = Connect.connect;
        db.then(value =>
            value.collection('users').insertOne({
                'name': userName
            }, function(err, db) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('succeed in insert user');
                }
            })
        );

    }
    this.search_user = function(userId) {
        var db = Connect.connect;
        db.then(value =>
            value.collection('users').find({
                '_id': mongoose.Types.ObjectId(userId)
            }).toArray(function(err, res) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res);
                }
            })
        );
    }
}
module.exports = User;