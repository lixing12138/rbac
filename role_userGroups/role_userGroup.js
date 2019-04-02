var sd = require('silly-datetime');
var Operate = require('../database/operate');
var Connect = require('../connect');

function RoleUserGroup(){
    var operate = new Operate();

    this.insert_roleUserGroup = function (roleGroupId, roleId) {
        var db = Connect.connect;
        db.then(value =>
            operate.select_table(value, 'role_userGroup', {
                'roleGroup_id': roleGroupId,
                'role_id': roleId,
            }).then(val =>
                val.length === 0 ? operate.insert_table(value, 'role_userGroup', {
                    'roleGroup_id': roleGroupId,
                    'role_id': roleId,
                    'update_time': sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }) : console.log('role-userGroup have bind')
            )

        );
    }

    this.search_roleUserGroup = function (roleGroupId, roleId) {
        var db = Connect.connect;
        db.then(value =>
            operate.select_table(value, 'role_userGroup', {
                'roleGroup_id': roleGroupId,
                'role_id': roleId
            }).then(val =>
                console.log(val)
            )
        );
    }

    this.delete_roleUserGroup = function (roleGroupId, roleId) {
        var db = Connect.connect;
        db.then(value =>
            operate.delete_table(value, 'role_userGroup', {
                'roleGroup_id': roleGroupId,
                'role_id': roleId
            })
        );
    }
}
module.exports = RoleUserGroup;