var sd = require('silly-datetime');
var Operate = require('../database/operate');
var Connect = require('../connect');

function RoleUserGroup(){
    var operate = new Operate();

    this.insert_roleUserGroup = async function (roleGroupId, roleId) {
        const conn = await Connect.connect;
        const resRoleGroup = await operate.select_table(conn, 'role_userGroup', {
            'userGroup_id': roleGroupId,
            'role_id': roleId,
        });

        if (resRoleGroup.length !== 0) {
            return '该角色已经和用户组进行过绑定';
        }
        const resInsert = await operate.insert_table(conn, 'role_userGroup', {
            'userGroup_id': roleGroupId,
            'role_id': roleId,
            'update_time': sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
        });

        if (resInsert['result']['ok'] === 1) {
            return '绑定成功';
        }
        return '绑定失败';
    }

    this.search_roleUserGroup = async function (roleGroupId) {
        const conn = await Connect.connect;
        const val = await operate.select_table(conn, 'role_userGroup', {
            'userGroup_id': roleGroupId
        });
        if (val.length === 0) {
            return '该用户组没有绑定角色';
        }
        return val;
    }

    this.delete_roleUserGroup = async function (roleGroupId, roleId) {
        const conn= await Connect.connect;
        const val = await operate.delete_table(conn, 'role_userGroup', {
            'userGroup_id': roleGroupId,
            'role_id': roleId
        });
        if (val['result']['ok'] === 1) {
            return '用户组与角色解绑成功';
        }
        return '用户组与角色解绑失败';
    }
}
module.exports = RoleUserGroup;