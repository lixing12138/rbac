var ObjectId = require('mongodb').ObjectID;
var sd = require('silly-datetime');

function User() {
    var Connect = require('../connect');
    this.insert_user = function (userName) {
        var db = Connect.connect;
        db.then(value =>
            value.collection('users').insertOne({
                'user_name': userName,
                'update_time':sd.format(new Date(),'YYYY-MM-DD HH:mm:ss')
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
    this.check_user=function(userId,privilegeId){
        var db=Connect.connect;
        db.then(value=>value.collection('user_role').find({
            'user_id': userId
        }).forEach(element => {
          console.log(element['role_id']);  
        }))
    }
}
module.exports = User;