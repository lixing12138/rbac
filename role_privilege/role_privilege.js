var sd = require('silly-datetime');
var Operate = require('../database/operate');

function RolePrivilege() {
    var Connect = require('../connect');
    var operate = new Operate();
    this.insert_role_privilege = function (roleId, privilegeId) {
        var db = Connect.connect;
        db.then(value =>
            operate.select_table(value, 'role_privilege', {
                'role_id': roleId,
                'privilege_id': privilegeId
            }).then(val =>
                val.length === 0 ? operate.insert_table(value, 'role_privilege', {
                    'role_id': roleId,
                    "privilege_id": privilegeId,
                    'update_time': sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }) : console.log('role-privilege have bind')
            )
        ).catch(err => console.log(err));
    }

    this.search_role_privilege = function (roleId) {
        var db = Connect.connect;
        db.then(value =>
            operate.select_table(value, 'role_privilege', {
                'role_id': roleId
            }).then(val =>
                console.log(val)
            )
        );
    }

    this.delete_role_privilege = function (roleId, privilegeId) {
        var db = Connect.connect;
        db.then(value =>
            operate.delete_table(value, 'role_privilege', {
                'role_id': roleId,
                'privilege_id': privilegeId
            })
        )
    }
}
module.exports = RolePrivilege;