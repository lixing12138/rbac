var sd = require('silly-datetime');
var Operate = require('../database/operate');
var Connect = require('../connect');
var ObjectId = require('mongodb').ObjectID;

function UserGroup() {

    var operate = new Operate();

    this.insert_userGroup = async function(groupName) {
        const conn = await Connect.connect;
        const val = await operate.insert_table(conn, 'userGroup', {
            'group_name': groupName,
            'update_time': sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
        });

        if (val['result']['ok'] === 1) {
            return '添加用户组成功';
        }
        return '添加用户组失败';
    }

    this.search_userGroup = async function() {
        const conn = await Connect.connect;
        const val = await operate.select_table(conn, 'userGroup', {});
        if (val === null) {
            return '暂时无数据';
        }
        return val;
    }

    this.delete_userGroup = async function(userGroupId) {
        const conn = await Connect.connect;
        const val = await operate.delete_table(conn, 'userGroup', {
            '_id': ObjectId(userGroupId)
        });
        if (val['result']['ok'] === 1) {
            return '删除用户组成功';
        }
        return '删除用户组失败';
    }
}
module.exports = UserGroup;