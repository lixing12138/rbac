var sd = require('silly-datetime');
var Operate = require('../database/operate');
var Connect = require('../connect');
var ObjectId = require('mongodb').ObjectID;

function UserGroup() {

    var operate = new Operate();

    this.insert_userGroup = function (groupName) {
        var db = Connect.connect;
        db.then(value =>
            operate.insert_table(value, 'userGroup', {
                'group_name': groupName,
                'update_time': sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
            })
        );
    }

    this.search_userGroup = function (userGroupId) {
        var db = Connect.connect;
        db.then(value =>
            operate.select_table_single(value, 'userGroup', {
                '_id': ObjectId(userGroupId)
            }).then(val =>
                console.log(val)
            )
        );
    }

    this.delete_userGroup = function (userGroupId) {
        var db = Connect.connect;
        db.then(value =>
            operate.delete_table(value, 'userGroup', {
                '_id': ObjectId(userGroupId)
            })
        );
    }
}
module.exports = UserGroup;