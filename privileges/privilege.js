var ObjectId = require('mongodb').ObjectID;
var sd = require('silly-datetime');
var Operate = require('../database/operate');

function Privilege() {
    var Connect = require('../connect');
    var operate = new Operate();
    this.insert_privilege = function (privilegeDescEn,privilegeDescCh) {
        var db = Connect.connect;
        db.then(value =>
            operate.insert_table(value,'privileges',{
                'privilege_desc_en':privilegeDescEn,
                'privilege_desc_ch':privilegeDescCh,
                'update_time':sd.format(new Date(),'YYYY-MM-DD HH:mm:ss')
            })
        );
    }
    this.search_privilege = function (privilegeId) {
        var db = Connect.connect;
        db.then(value =>
            operate.select_table_single(value,'privileges',{
                '_id':ObjectId(privilegeId)
            }).then(val =>
                console.log(val)
            )
        );
    }
    this.delete_privilege = function (privilegeId) {
        var db = Connect.connect;
        db.then(value =>
            operate.delete_table(value,'privileges',{
                '_id':ObjectId(privilegeId)
            })
        );
    }
}
module.exports = Privilege;