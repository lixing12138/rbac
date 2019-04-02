var sd = require('silly-datetime');
var Operate = require('../database/operate');
var Connect = require('../connect');

function UserUserGroup() {

    var operate = new Operate();

    this.insert_userUserGroup = function (userGroupId, userId) {
        var db = Connect.connect;
        db.then(value =>
            operate.select_table(value, 'user_userGroup', {
                'userGroup_id': userGroupId,
                'user_id': userId,
            }).then(val =>
                val.length === 0 ? operate.insert_table(value, 'user_userGroup', {
                    'userGroup_id': userGroupId,
                    'user_id': userId,
                    'update_time': sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                }) : console.log('user-userGroup have bind')
            )

        );
    }

    this.search_userUserGroup = function (userGroupId, userId) {
        var db = Connect.connect;
        db.then(value =>
            operate.select_table(value, 'user_userGroup', {
                'userGroup_id': userGroupId,
                'user_id': userId
            }).then(val =>
                console.log(val)
            )
        );
    }

    this.delete_userUserGroup = function (userGroupId, userId) {
        var db = Connect.connect;
        db.then(value =>
            operate.delete_table(value, 'user_userGroup', {
                'userGroup_id': userGroupId,
                'user_id': userId
            })
        );
    }
}
module.exports = UserUserGroup;