const koa=require('koa');
const route=require('koa-route');
const users=require('./users/user');
const app=new koa();

const user=ctx=>{
    users.insert_user(ctx.query['name']);
}
app.use(route.post('/user',user));
app.listen(3000);