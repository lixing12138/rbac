var ObjectId = require('mongodb').ObjectID;
var sd = require('silly-datetime');
var Operate = require('../database/operate');

function Role() {
    var Connect = require('../connect');
    var operate = new Operate();
    this.insert_role = async function (roleName) {
        const conn = await Connect.connect;
        const val = await operate.insert_table(conn, 'roles', {
            'role_name': roleName,
            'update_time': sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
        });

        if (val['result']['ok'] === 1) {
            return '添加角色成功';
        }
        return '添加角色失败';
    }
    this.search_role = async function (roleId) {
        const conn = await Connect.connect;
        const val = await operate.select_table_single(conn, 'roles', {
            '_id': ObjectId(roleId)
        });
        if (val === null) {
            return '无效ID';
        }
        return val;
    }
    this.delete_role = async function (roleId) {
        const conn = await Connect.connect;
        const val = await operate.delete_table(conn, 'roles', {
            '_id': ObjectId(roleId)
        });
        if (val['result']['ok'] === 1) {
            return '删除角色成功';
        }
        return '删除角色失败';
    }
}
module.exports = Role;