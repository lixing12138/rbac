const koa = require('koa');
const route = require('koa-route');
const Users = require('./users/user');
const Roles = require('./roles/role');
const Privilege = require('./privileges/privilege');
const UserRole = require('./user_role/user_role');
const RolePrivilege = require('./role_privilege/role_privilege');
const UserGroup = require('./userGroups/userGroup');
const UserUserGroup=require('./user_userGroups/user_userGroup');

const app = new koa();
const user = new Users();
const role = new Roles();
const privilege = new Privilege();
const userRole = new UserRole();
const rolePrivilege = new RolePrivilege();
const userGroup = new UserGroup();
const userUserGroup=new UserUserGroup();

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
app.use(route.delete('/user', userDelete));

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
app.use(route.post('/role', roleInsert));
app.use(route.get('/role', roleSearch));
app.use(route.delete('/role', roleDelete));
/* 
 *privilege module
 */
const privilegeInsert = ctx => {
    privilege.insert_privilege(ctx.query['privilegeDescEn'], ctx.query['privilegeDescCh']);
}
const privilegeSearch = ctx => {
    privilege.search_privilege(ctx.query['privilegeId']);
}
const privilegeDelete = ctx => {
    privilege.delete_privilege(ctx.query['privilegeId']);
}
app.use(route.post('/privilege', privilegeInsert));
app.use(route.get('/privilege', privilegeSearch));
app.use(route.delete('/privilege', privilegeDelete));

/* 
 *user-role module 
 *bind role and user
 */
const userRoleInsert = ctx => {
    userRole.insert_user_role(ctx.query['userId'], ctx.query['roleId']);
}
const userRoleSearch = ctx => {
    userRole.search_user_role(ctx.query['userId']);
}
const userRoleDelete = ctx => {
    userRole.delete_user_role(ctx.query['userId'], ctx.query['roleId']);
}
app.use(route.post('/userRole', userRoleInsert));
app.use(route.get('/userRole', userRoleSearch));
app.use(route.delete('/userRole', userRoleDelete));

/*
*role-privilege module
*/
const rolePrivilegeInsert = ctx => {
    rolePrivilege.insert_role_privilege(ctx.query['roleId'], ctx.query['privilegeId']);
}
const rolePrivilegeSearch = ctx => {
    rolePrivilege.search_role_privilege(ctx.query['roleId']);
}
const rolePrivilegeDelete = ctx => {
    rolePrivilege.delete_role_privilege(ctx.query['roleId'], ctx.query['privilegeId']);
}
app.use(route.post('/rolePrivilege', rolePrivilegeInsert));
app.use(route.get('/rolePrivilege', rolePrivilegeSearch));
app.use(route.delete('/rolePrivilege', rolePrivilegeDelete));

/**
 * 校验权限
 *  */
const userCkeckPrivilege = ctx => {
    user.check_user(ctx.query['userId'], ctx.query['privilegeId']);
}
app.use(route.get('/user/check', userCkeckPrivilege));

/**
 * 用户组
 * userGroup
 */
const userGroupInsert = ctx => {
    userGroup.insert_userGroup(ctx.query['groupName']);
}
const userGroupSearch = ctx => {
    userGroup.search_userGroup(ctx.query['groupId']);
}
const userGroupDelete = ctx => {
    userGroup.delete_userGroup(ctx.query['groupId']);
}
app.use(route.post('/userGroup',userGroupInsert));
app.use(route.get('/userGroup',userGroupSearch));
app.use(route.delete('/userGroup',userGroupDelete));

/**
 * 用户组-用户
 * user-userGroup
 */
const userUserGroupInsert = ctx => {
    userUserGroup.insert_userUserGroup(ctx.query['userGroupId'],ctx.query['userId']);
}
const userUserGroupSearch = ctx => {
    userUserGroup.search_userUserGroup(ctx.query['userGroupId'],ctx.query['userId']);
}
const userUserGroupDelete = ctx => {
    userUserGroup.delete_userUserGroup(ctx.query['userGroupId'],ctx.query['userId']);
}
app.use(route.post('/userUserGroup',userUserGroupInsert));
app.use(route.get('/userUserGroup',userUserGroupSearch));
app.use(route.delete('/userUserGroup',userUserGroupDelete));


app.listen(3000);