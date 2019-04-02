var ObjectId = require('mongodb').ObjectID;
var sd = require('silly-datetime');
var Operate = require('../database/operate');
var Connect = require('../connect');

function User() {
    var operate = new Operate();
    this.insert_user = function (userName) {
        var db = Connect.connect;
        db.then(value =>
            value.collection('users').insertOne({
                'user_name': userName,
                'update_time': sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
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
        db.then(value =>
            value.collection('users').deleteOne({
                '_id': ObjectId(userId)
            }, function (err, res) {
                if (err) {
                    console.log('id不存在');
                    console.log(err);
                } else {
                    console.log('删除成功');
                    console.log(res);
                }
            })
        );
    }

    this.check_user = function (userId, privilegeId) {
        var db = Connect.connect;
        db.then(value =>
            operate.select_table(value, 'user_role', {
                'user_id': userId
            }).then(val =>
                val.forEach(va =>
                    operate.select_table(value, 'role_privilege', { 'role_id': va['role_id'], 'privilege_id': privilegeId }).then(
                        v => v.length === 0 ? console.log('checking') : console.log('yes'))
                )
            )
        );
    }
    
}
module.exports = User;