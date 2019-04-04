var sd = require('silly-datetime');
var Operate = require('../database/operate');

function RolePrivilege() {
    var Connect = require('../connect');
    var operate = new Operate();
    this.insert_role_privilege = async function (roleId, privilegeId) {
        const conn = await Connect.connect;
        const resRolePrivilege = await operate.select_table(conn, 'role_privilege', {
            'role_id': roleId,
            'privilege_id': privilegeId
        });

        if (resRolePrivilege.length !== 0) {
            return '该角色已经和权限进行过绑定';
        }
        const resInsert = await operate.insert_table(conn, 'role_privilege', {
            'role_id': roleId,
            "privilege_id": privilegeId,
            'update_time': sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
        });

        if (resInsert['result']['ok'] === 1) {
            return '绑定成功';
        }
        return '绑定失败';
    }

    this.search_role_privilege = async function (roleId) {
        const conn = await Connect.connect;
        const val = await operate.select_table(conn, 'role_privilege', {
            'role_id': roleId
        });
        if (val.length === 0) {
            return '该角色没有和其他权限进行绑定';
        }
        return val;
    }

    this.delete_role_privilege = async function (roleId, privilegeId) {
        const conn= await Connect.connect;
        const val = await operate.delete_table(conn, 'role_privilege', {
            'role_id': roleId,
                'privilege_id': privilegeId
        });
        if (val['result']['ok'] === 1) {
            return '角色与权限解绑成功';
        }
        return '角色与权限解绑失败';
    }
}
module.exports = RolePrivilege;