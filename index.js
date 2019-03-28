const koa = require('koa');
const route = require('koa-route');
const Users = require('./users/user');
const app = new koa();
const user = new Users();
const userInsert = ctx => {
    user.insert_user(ctx.query['userName']);
}
const userSearch = ctx => {
    user.search_user(ctx.query['userId']);
}
app.use(route.post('/user', userInsert));
app.use(route.get('/user', userSearch))
app.listen(3000);