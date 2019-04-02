function Operate() {
    this.insert_table = function(db, table, dict) {
        db.collection(table).insertOne(dict);
    }
    this.select_table = function(db, table, dict) {
        return new Promise(
            function(resolve, reject) {
                db.collection(table).find(dict).toArray(function(err, res) {
                    if (err) throw err;
                    resolve(res);
                    reject('false');
                })
            }
        );
    }
    this.select_table_single = function(db, table, dict) {
        return new Promise(
            function(resolve, reject) {
                db.collection(table).findOne(dict, {}, function(err, res) {
                    if (err) {
                        console.log('no content');
                        reject(err);
                    } else {
                        resolve(res);
                    }
                })
            }
        );
    }
    this.update_table = function(db, table, dict, condict) {
        db.collection(table).updateOne(condict, {
            $push: dict
        });
    }
    this.delete_table = function(db, table, dict) {
        db.collection(table).deleteOne(dict);
    }
}
module.exports = Operate;