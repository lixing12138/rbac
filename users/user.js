var ObjectId = require('mongodb').ObjectID;

function User() {
    var Connect = require('../connect');
    this.insert_user = function (userName) {
        var db = Connect.connect;
        db.then(value =>
            value.collection('users').insertOne({
                'user_name': userName
            }, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('succeed in insert user');
                }
            })
        );

    }
    this.search_user = function (userId) {
        var db = Connect.connect;
        db.then(value =>
            value.collection('users').findOne({
                '_id': ObjectId(userId)
            }, {}, function (err, res) {
                if (err) {
                    console.log('id不存在');
                    console.log(err);
                } else {
                    console.log(res);
                }
            })
        );
    }
    this.delete_user = function (userId) {
        var db = Connect.connect;
        db.then(value => value.collection('users').deleteOne({
            '_id': ObjectId(userId)
        }, function (err, res) {
            if (err) {
                console.log('id不存在');
                console.log(err);
            } else {
                console.log('删除成功');
                console.log(res);
            }
        }))
    }
}
module.exports = User;