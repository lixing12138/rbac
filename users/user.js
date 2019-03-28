const Connect=require('../connect'); 
exports.insert_user =async function(userName){
    var db = await Connect.connect((err ,db) => {
        if (err){
            return err;
        }else{  
            return db;
        }
    });
    console.log(db);
    // db.collection('users').insertOne({'user_name':userName},function(err,db){
    //     if(err){
    //         return err;
    //     }else{   
    //         db.close();
    //         return 'success';
    //     }
    // });
}


// const add = (a, b) =>{
//     // http
//     // sleep 3
//     // return a + b;
// }

// const addAsync = (a, b, cb) =>{
//     // http a + b
//     // return 

//     cb(null, a + b)
// }

// const run = async () => {
//     add(1, 2)

//     // addAsync(1, 2, (err, result)=>{
//     //     addAsync(1, 2, (err, result)=>{
//     //         addAsync(1, 2, (err, result)=>{
//     //             addAsync(1, 2, (err, result)=>{
        
//     //             })
//     //         })
//     //     })
//     // })

//     // add(2, 3)

//     const ret = await new Promise((resolve, reject) =>{
//         addAsync(1, 2, (err, ret) =>{
//             if (err) {
//                 return reject(err)
//             }

//             resolve(resolve)
//         })
//     })

//     // ...
// }