const mongodb=require('mongodb');
const url='mongodb://localhost:27017';
exports.connect=function (cb) {
    mongodb.connect(url,{useNewUrlParser: true},cb);
}

// function func (params, callback) {
//     // ...
//     callback(err, params)
// }

// func({a: 1}, (err, params) => {
// });