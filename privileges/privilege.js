var ObjectId = require('mongodb').ObjectID;
var sd = require('silly-datetime');
var Operate = require('../database/operate');

function Privilege() {
    var Connect = require('../connect');
    var operate = new Operate();
    this.insert_privilege = async function (privilegeDescEn,privilegeDescCh) {
        const conn = await Connect.connect;
        const val = await operate.insert_table(conn,'privileges',{
            'privilege_desc_en':privilegeDescEn,
            'privilege_desc_ch':privilegeDescCh,
            'update_time':sd.format(new Date(),'YYYY-MM-DD HH:mm:ss')
        });
        if (val['result']['ok'] === 1) {
            return 'insert privilege successfully';
        }
        return 'failed in insert user';
    }
    this.search_privilege = async function (privilegeId) {
        const conn = await Connect.connect;
        const val = await operate.select_table_single(conn, 'privileges', {
            '_id': ObjectId(privilegeId)
        });
        if (val === null) {
            return 'find no privilege';
        }
        return val;
    }
    this.delete_privilege = async function (privilegeId) {
        const conn = await Connect.connect;
        const val = await operate.delete_table(conn, 'privileges', {
            '_id': ObjectId(privilegeId)
        });
        if (val['result']['ok'] === 1) {
            return 'delete privilege successfully';
        }
        return 'failed in delete privilege';
    }
}
module.exports = Privilege;