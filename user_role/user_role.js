var sd = require('silly-datetime');
var Operate = require('../database/operate')

function UserRole() {
    var Connect = require('../connect');
    var operate = new Operate();
    this.insert_user_role = function(userId, roleId) {
        var db = Connect.connect;
        db.then(value =>
            operate.select_table(value, 'user_role', {
                'user_id': userId
            }).then(val =>
                val.length === 0 ? operate.insert_table(value, 'user_role', {
                    'user_id': userId,
                    'roles': [{
                        "role_id": roleId,
                        'update_time': sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')
                    }],
                }) : operate.update_table(value, 'user_role', {
                    'role_id': roleId
                }, {
                    'user_id': userId
                })
            )

        ).catch(error => console.log(error));
    }
    this.search_user_role = function(userId) {
        var db = Connect.connect;
        db.then(value =>
            operate.select_table_single(value, 'user_role', {
                'user_id': userId
            }).then(val =>
                console.log(val)
            )
        );
    }
    this.delete_user_role = function(userId, roleId) {
        var db = Connect.connect;
        db.then(value =>
            //console.log(val)
            operate.delete_table(value, 'user_role', {
                'user_id': userId,
                'roles': {
                    $elemMatch: {
                        'role_id': roleId
                    }
                }
            })
        );
    }
}
module.exports = UserRole;