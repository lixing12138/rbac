var ObjectId = require('mongodb').ObjectID;
var sd = require('silly-datetime');

function Privilege() {
    var Connect = require('../connect');
    this.insert_privilege = function (privilegeDesc) {
        var db = Connect.connect;
        db.then(value =>
            value.collection('privileges').insertOne({
                'privilege_desc':privilegeDesc,
                'update_time':sd.format(new Date(),'YYYY-MM-DD HH:mm:ss')

            }, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('succeed in insert privilege');
                }
            })
        );
    }
    this.search_privilege = function (privilegeId) {
        var db = Connect.connect;
        db.then(value =>
            value.collection('privileges').findOne({
                '_id': ObjectId(privilegeId)
            }, {}, function (err, res) {
                if (err) {
                    console.log('privilegeId不存在');
                    console.log(err);
                } else {
                    console.log(res);
                }
            })
        );
    }
    this.delete_privilege = function (privilegeId) {
        var db = Connect.connect;
        db.then(value =>
            value.collection('privileges').deleteOne({
                '_id': ObjectId(privilegeId)
            }, function (err, res) {
                if (err) {
                    console.log('privilegeId不存在');
                    console.log(err);
                } else {
                    console.log('删除成功');
                    console.log(res);
                }
            })
        );
    }
}
module.exports = Privilege;