var sd = require('silly-datetime');

function RolePrivilege() {
    var Connect = require('../connect');
    this.insert_role_privilege = function (roleId,privilegeId) {
        var db = Connect.connect;
        db.then(value =>
            value.collection('role_privilege').insertOne({
                'role_id': roleId,
                'privilege_id': privilegeId,
                'update_time':sd.format(new Date(),'YYYY-MM-DD HH:mm:ss')

            }, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('succeed in insert role_privilege');
                }
            })
        );
    }

    this.search_role_privilege = function (roleId) {
        var db = Connect.connect;
        db.then(value =>
            value.collection('role_privilege').findOne({
                'role_id': roleId
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

    this.delete_role_privilege = function (roleId,privilegeId) {
        var db = Connect.connect;
        db.then(value => value.collection('role_privilege').deleteOne({
            'role_id': roleId,
            'privilege_id':privilegeId
        }, function (err, res) {
            if (err) {
                console.log('id不存在');
                console.log(err);
            } else {
                console.log('角色权限解除绑定成功');
                console.log(res);
            }
        }))
    }
}
module.exports = RolePrivilege;