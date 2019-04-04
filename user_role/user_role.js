var sd = require('silly-datetime');
var Operate = require('../database/operate')
var Connect = require('../connect');

function UserRole() {
    var operate = new Operate();
    this.insert_user_role = async function (userId, roleId) {
        const conn = await Connect.connect;
        const resUserRole = await operate.select_table(conn, 'user_role', {
            'user_id': userId,
            'role_id': roleId
        });

        if (resUserRole.length !== 0) {
            return '该用户已经和角色进行过绑定';
        }
        const resInsert = await operate.insert_table(conn, 'user_role', {
            'user_id': userId,
            "role_id": roleId,
            'update_time': sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
        });

        if (resInsert['result']['ok'] === 1) {
            return '绑定成功';
        }
        return '绑定失败';
    }

    this.search_user_role = async function (userId) {
        const conn = await Connect.connect;
        const val = await operate.select_table(conn, 'user_role', {
            'user_id': userId
        });
        if (val.length === 0) {
            return '该用户没有和其他角色进行绑定';
        }
        return val;
    }

    this.delete_user_role = async function (userId, roleId) {
        const conn= await Connect.connect;
        const val = await operate.delete_table(conn, 'user_role', {
            'user_id': userId,
            'role_id': roleId
        });
        if (val['result']['ok'] === 1) {
            return '用户与角色解绑成功';
        }
        return '用户与角色解绑失败';
    }
}
module.exports = UserRole;