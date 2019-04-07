var ObjectId = require('mongodb').ObjectID;
var sd = require('silly-datetime');
var Operate = require('../database/operate');

function Privilege() {
    var Connect = require('../connect');
    var operate = new Operate();
    this.insert_privilege = async function(privilegeDescEn, privilegeDescCh) {
        const conn = await Connect.connect;
        const val = await operate.insert_table(conn, 'privileges', {
            'privilege_desc_en': privilegeDescEn,
            'privilege_desc_ch': privilegeDescCh,
            'update_time': sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
        });
        if (val['result']['ok'] === 1) {
            return '插入权限成功';
        }
        return '插入权限失败';
    }
    this.search_privilege = async function() {
        const conn = await Connect.connect;
        const val = await operate.select_table(conn, 'privileges', {});
        if (val === null) {
            return '暂时无权限';
        }
        return val;
    }
    this.delete_privilege = async function(privilegeId) {
        const conn = await Connect.connect;
        const val = await operate.delete_table(conn, 'privileges', {
            '_id': ObjectId(privilegeId)
        });
        if (val['result']['ok'] === 1) {
            return '删除权限成功';
        }
        return '删除权限失败';
    }
}
module.exports = Privilege;