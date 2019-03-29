var ObjectId = require('mongodb').ObjectID;
var sd = require('silly-datetime');

function Role() {
    var Connect = require('../connect');
    this.insert_role = function (roleName) {
        var db = Connect.connect;
        db.then(value =>
            value.collection('roles').insertOne({
                'role_name': roleName,
                'update_time':sd.format(new Date(),'YYYY-MM-DD HH:mm:ss')
            }, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('succeed in insert role');
                }
            })
        );
    }
    this.search_role = function (roleId) {
        var db = Connect.connect;
        db.then(value =>
            value.collection('roles').findOne({
                '_id': ObjectId(roleId)
            }, {}, function (err, res) {
                if (err) {
                    console.log('roleId不存在');
                    console.log(err);
                } else {
                    console.log(res);
                }
            })
        );
    }
    this.delete_role = function (roleId) {
        var db = Connect.connect;
        db.then(value =>
            value.collection('roles').deleteOne({
                '_id': ObjectId(roleId)
            }, function (err, res) {
                if (err) {
                    console.log('roleId不存在');
                    console.log(err);
                } else {
                    console.log('删除成功');
                    console.log(res);
                }
            })
        );
    }
}
module.exports = Role;