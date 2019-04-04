// class Operate {
//     constructor(opts) {
//         // this.db = opts.db
//     }

//     insert_table() {
//         // this.db.collection
//     }
// }


function Operate() {
    this.insert_table = function(db, table, dict) {
        return new Promise(
            function(resolve,reject){
                db.collection(table).insertOne(dict,function(err,res){
                    if(err){
                        return reject(err);
                    }
                    resolve(res);
                });

            }
        );
    }
    this.select_table = function(db, table, dict) {
        return new Promise(
            function(resolve, reject) {
                db.collection(table).find(dict).toArray(function(err, res) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(res);
                })
            }
        );
    }
    this.select_table_single = function(db, table, dict) {
        return new Promise(
            function(resolve, reject) {
                db.collection(table).findOne(dict, {}, function(err, res) {
                    if (err) {
                        return reject(err);
                    } 
                    resolve(res);
                })
            }
        );
    }
    // this.update_table = function(db, table, dict, condict) {
    //     db.collection(table).updateOne(condict, {
    //         $push: dict
    //     });
    // }
    this.delete_table = function(db, table, dict) {
        return new Promise(
            function(resolve,reject){
                db.collection(table).deleteOne(dict,function(err,res){
                    if (err) {
                        return reject(err);
                    } 
                    resolve(res);
                });
            }
        )
    }
}
module.exports = Operate;