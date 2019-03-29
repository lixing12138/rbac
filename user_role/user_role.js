var ObjectId = require('mongodb').ObjectID;

function UserRole(){
    var Connect = require('../connect');
    this.insert_user_role = function (userId,roleId) {
        var db = Connect.connect;
        db.then(value =>
            value.collection('user_role').insertOne({
                'user_id': userId,
                'role_id': roleId
            }, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('succeed in insert user_role');
                }
            })
        );

    }
    this.search_user_role = function (userId) {
        var db = Connect.connect;
        db.then(value =>
            value.collection('user_role').findOne({
                'user_id': userId
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
    this.delete_user_role = function (userId,roleId) {
        var db = Connect.connect;
        db.then(value => value.collection('user_role').deleteOne({
            'user_id': userId,
            'roleId': roleId
        }, function (err, res) {
            if (err) {
                console.log('id不存在');
                console.log(err);
            } else {
                console.log('解除绑定成功');
                console.log(res);
            }
        }))
    }
}
module.exports=UserRole;