var sd = require('silly-datetime');
var Operate = require('../database/operate')
var operate = new Operate();
function UserRole() {
    var Connect = require('../connect');
    this.insert_user_role = function (userId, roleId) {
        var db = Connect.connect;
        db.then(value =>
            operate.select_table(value, 'user_role', { 'user_id': userId }).then(val =>
                val.length === 0 ? operate.insert_table(value, 'user_role', {
                    'user_id': userId,
                    'roles': [{"role_id":roleId,'update_time': sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')}],
                }) : operate.update_table(value, 'user_role', { 'role_id': roleId }, { 'user_id': userId })
            )

        ).catch(error => console.log(error));
    }
    this.search_user_role = function (userId) {
        var db = Connect.connect;
        db.then(value =>
            operate.select_table_single(value, 'user_role', { 'user_id': userId }).then(val =>
                console.log(val)
            )
        );
    }
    this.delete_user_role = function (userId, roleId) {
        var db = Connect.connect;
        db.then(value => value.collection('user_role').deleteOne({
            'user_id': userId,
            'role_id': roleId
        }, function (err, res) {
            if (err) {
                console.log('id不存在');
                console.log(err);
            } else {
                console.log('解除绑定成功');
                console.log(res);
            }
        }))
    }
}
module.exports = UserRole;