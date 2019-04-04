var sd = require('silly-datetime');
var Operate = require('../database/operate');
var Connect = require('../connect');

function UserUserGroup() {

    var operate = new Operate();

    this.insert_userUserGroup = async function (userGroupId, userId) {
        const conn = await Connect.connect;
        const resUserGroup = await operate.select_table(conn, 'user_userGroup', {
            'userGroup_id': userGroupId,
            'user_id': userId,
        });

        if (resUserGroup.length !== 0) {
            return '该用户已经和用户组进行过绑定';
        }
        const resInsert = await operate.insert_table(conn, 'user_userGroup', {
            'userGroup_id': userGroupId,
            'user_id': userId,
            'update_time': sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
        });

        if (resInsert['result']['ok'] === 1) {
            return '绑定成功';
        }
        return '绑定失败';
    }

    this.search_userUserGroup = async function (userGroupId) {
        const conn = await Connect.connect;
        const val = await operate.select_table(conn, 'user_userGroup', {
            'userGroup_id': userGroupId
        });
        if (val.length === 0) {
            return '该用户组没有用户';
        }
        return val;
    }

    this.delete_userUserGroup = async function (userGroupId, userId) {
        const conn= await Connect.connect;
        const val = await operate.delete_table(conn, 'user_userGroup', {
            'userGroup_id': userGroupId,
            'user_id': userId
        });
        if (val['result']['ok'] === 1) {
            return '用户与用户组解绑成功';
        }
        return '用户与用户组解绑失败';
    }
}
module.exports = UserUserGroup;