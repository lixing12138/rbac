const koa = require('koa');
const route = require('koa-route');
const Users = require('./users/user');
const Roles=require('./roles/role');
const Privilege=require('./privileges/privilege');
const UserRole=require('./user_role/user_role');

const app = new koa();
const user = new Users();
const role=new Roles();
const privilege=new Privilege();
const userRole=new UserRole();
/**
 * user module 
 * */
const userInsert = ctx => {
    user.insert_user(ctx.query['userName']);
}
const userSearch = ctx => {
    user.search_user(ctx.query['userId']);
}
const userDelete = ctx => {
    user.delete_user(ctx.query['userId']);
}
app.use(route.post('/user', userInsert));
app.use(route.get('/user', userSearch));
app.use(route.delete('/user',userDelete));

/*
 *role module
 */
const roleInsert = ctx => {
    role.insert_role(ctx.query['roleName']);
}
const roleSearch = ctx => {
    role.search_role(ctx.query['roleId']);
}
const roleDelete = ctx => {
    role.delete_role(ctx.query['roleId']);
}
app.use(route.post('/role',roleInsert));
app.use(route.get('/role',roleSearch));
app.use(route.delete('/role',roleDelete));
/* 
 *privilege module
 */
const privilegeInsert = ctx => {
    privilege.insert_privilege(ctx.query['privilegeDesc']);
}
const privilegeSearch = ctx => {
    privilege.search_privilege(ctx.query['privilegeId']);
}
const privilegeDelete = ctx => {
    privilege.delete_privilege(ctx.query['privilegeId']);
}
app.use(route.post('/privilege',privilegeInsert));
app.use(route.get('/privilege',privilegeSearch));
app.use(route.delete('/privilege',privilegeDelete));

/* 
 *user-role module 
 *bind role and user
 */
const userRoleInsert = ctx => {
    userRole.insert_user_role(ctx.query['useId'],ctx.query['roleId']);
}
const userRoleSearch = ctx => {
    userRole.search_user_role(ctx.query['userId']);
}
const userRoleDelete = ctx => {
    userRole.delete_user_role(ctx.query['userId'],ctx.query['roleId']);
}
app.use(route.post('/userRole',userRoleInsert));
app.use(route.get('/userRole',userRoleSearch));
app.use(route.delete('/userRole',userRoleDelete));

app.listen(3000);