var ObjectId = require('mongodb').ObjectID;
var sd = require('silly-datetime');
var Operate = require('../database/operate');
var Connect = require('../connect');

function User() {
    var operate = new Operate();
    this.insert_user = async function(userName) {
        const conn = await Connect.connect;
        const val = await operate.insert_table(conn, 'users', {
            'user_name': userName,
            'update_time': sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
        });

        if (val['result']['ok'] === 1) {
            return '插入用户成功';
        }
        return '插入用户失败';
    }

    this.search_user = async function() {
        const conn = await Connect.connect;
        const val = await operate.select_table(conn, 'users', {});
        if (val === null) {
            return '暂时无用户';
        }
        return val;
    }

    this.delete_user = async function(userId) {
        const conn = await Connect.connect;
        const val = await operate.delete_table(conn, 'users', {
            '_id': ObjectId(userId)
        });
        if (val['result']['ok'] === 1) {
            return 'delete user successfully';
        }
        return 'failed in delete user';
    }

    this.check_user = async function(userId, privilegeId) {
        const conn = await Connect.connect;
        const resGroup = await operate.select_table(conn, 'user_userGroup', {
            'user_id': userId
        });
        if (resGroup.length !== 0) {
            var groupIds = [];
            var roleIds = [];
            //find useGroupId
            for (let i = 0; i < resGroup.length; i++) {
                groupIds.push(resGroup[i]['userGroup_id']);
            }
            //find roelId
            for (let j = 0; j < groupIds.length; j++) {
                let resRole = await operate.select_table(conn, 'role_userGroup', {
                    'userGroup_id': groupIds[j]
                });
                if (resRole.length !== 0) {
                    for (let k = 0; k < resRole.length; k++) {
                        roleIds.push(resRole[k]['role_id']);
                    }
                }
            }
            //judge
            for (let m = 0; m < roleIds.length; m++) {
                let resPrivilege = await operate.select_table(conn, 'role_privilege', {
                    'role_id': roleIds[m],
                    'privilege_id': privilegeId
                });
                if (resPrivilege.length !== 0) {
                    return '该用户具有该权限，角色ID为：' + roleIds[m];
                }
            }

        }
        return '该用户不具有该权限';
    }
}
module.exports = User;