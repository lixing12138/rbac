const koa = require('koa');
const route = require('koa-route');
const Users = require('./users/user');
const Roles = require('./roles/role');
const Privilege = require('./privileges/privilege');
const UserRole = require('./user_role/user_role');
const RolePrivilege = require('./role_privilege/role_privilege');
const UserGroup = require('./userGroups/userGroup');
const UserUserGroup = require('./user_userGroups/user_userGroup');
const RoleUserGroup = require('./role_userGroups/role_userGroup');

const app = new koa();
const user = new Users();
const role = new Roles();
const privilege = new Privilege();
const userRole = new UserRole();
const rolePrivilege = new RolePrivilege();
const userGroup = new UserGroup();
const userUserGroup = new UserUserGroup();
const roleUserGroup = new RoleUserGroup();

/**
 * user module 
 * */
const userInsert = async (ctx) => {
    ctx.response.body = await user.insert_user(ctx.query['userName']);
}
const userSearch = async (ctx) => {
    ctx.response.body = await user.search_user(ctx.query['userId']);
}
const userDelete = async (ctx) => {
    ctx.response.body = await user.delete_user(ctx.query['userId']);
}
app.use(route.post('/user', userInsert));
app.use(route.get('/user', userSearch));
app.use(route.delete('/user', userDelete));

/*
 *role module
 */
const roleInsert = async (ctx) => {
    ctx.response.body = await role.insert_role(ctx.query['roleName']);
}
const roleSearch = async (ctx) => {
    ctx.response.body = await role.search_role(ctx.query['roleId']);
}
const roleDelete = async (ctx) => {
    ctx.response.body = await role.delete_role(ctx.query['roleId']);
}
app.use(route.post('/role', roleInsert));
app.use(route.get('/role', roleSearch));
app.use(route.delete('/role', roleDelete));
/* 
 *privilege module
 */
const privilegeInsert = async (ctx) => {
    ctx.response.body = await privilege.insert_privilege(ctx.query['privilegeDescEn'], ctx.query['privilegeDescCh']);
}
const privilegeSearch = async (ctx) => {
    ctx.response.body = await privilege.search_privilege(ctx.query['privilegeId']);
}
const privilegeDelete = async (ctx) => {
    ctx.response.body = await privilege.delete_privilege(ctx.query['privilegeId']);
}
app.use(route.post('/privilege', privilegeInsert));
app.use(route.get('/privilege', privilegeSearch));
app.use(route.delete('/privilege', privilegeDelete));

/* 
 *user-role module 
 *bind role and user
 */
const userRoleInsert = async (ctx) => {
    ctx.response.body = await userRole.insert_user_role(ctx.query['userId'], ctx.query['roleId']);
}
const userRoleSearch = async (ctx) => {
    ctx.response.body = await userRole.search_user_role(ctx.query['userId']);
}
const userRoleDelete = async (ctx) => {
    ctx.response.body = await userRole.delete_user_role(ctx.query['userId'], ctx.query['roleId']);
}
app.use(route.post('/userRole', userRoleInsert));
app.use(route.get('/userRole', userRoleSearch));
app.use(route.delete('/userRole', userRoleDelete));

/*
*role-privilege module
*/
const rolePrivilegeInsert = async (ctx) => {
    ctx.response.body = await rolePrivilege.insert_role_privilege(ctx.query['roleId'], ctx.query['privilegeId']);
}
const rolePrivilegeSearch = async (ctx) => {
    ctx.response.body = await rolePrivilege.search_role_privilege(ctx.query['roleId']);
}
const rolePrivilegeDelete = async (ctx) => {
    ctx.response.body = await rolePrivilege.delete_role_privilege(ctx.query['roleId'], ctx.query['privilegeId']);
}
app.use(route.post('/rolePrivilege', rolePrivilegeInsert));
app.use(route.get('/rolePrivilege', rolePrivilegeSearch));
app.use(route.delete('/rolePrivilege', rolePrivilegeDelete));

/**
 * 校验权限
 *  */
const userCkeckPrivilege = async (ctx) => {
    ctx.response.body = await user.check_user(ctx.query['userId'], ctx.query['privilegeId']);
}
app.use(route.get('/user/check', userCkeckPrivilege));

/**
 * 用户组
 * userGroup
 */
const userGroupInsert = async (ctx) => {
    ctx.response.body = await userGroup.insert_userGroup(ctx.query['groupName']);
}
const userGroupSearch = async (ctx) => {
    ctx.response.body = await userGroup.search_userGroup(ctx.query['groupId']);
}
const userGroupDelete = async (ctx) => {
    ctx.response.body = await userGroup.delete_userGroup(ctx.query['groupId']);
}
app.use(route.post('/userGroup', userGroupInsert));
app.use(route.get('/userGroup', userGroupSearch));
app.use(route.delete('/userGroup', userGroupDelete));

/**
 * 用户组-用户
 * user-userGroup
 */
const userUserGroupInsert = async (ctx) => {
    ctx.response.body = await userUserGroup.insert_userUserGroup(ctx.query['userGroupId'], ctx.query['userId']);
}
const userUserGroupSearch = async (ctx) => {
    ctx.response.body = await userUserGroup.search_userUserGroup(ctx.query['userGroupId']);
}
const userUserGroupDelete = async (ctx) => {
    ctx.response.body = await userUserGroup.delete_userUserGroup(ctx.query['userGroupId'], ctx.query['userId']);
}
app.use(route.post('/userUserGroup', userUserGroupInsert));
app.use(route.get('/userUserGroup', userUserGroupSearch));
app.use(route.delete('/userUserGroup', userUserGroupDelete));

/**
 * 用户组-角色
 * role-userGroup
 */
const roleUserGroupInsert = async (ctx) => {
    ctx.response.body = await roleUserGroup.insert_roleUserGroup(ctx.query['userGroupId'], ctx.query['roleId']);
}
const roleUserGroupSearch = async (ctx) => {
    ctx.response.body = await roleUserGroup.search_roleUserGroup(ctx.query['userGroupId']);
}
const roleUserGroupDelete = async (ctx) => {
    ctx.response.body = await roleUserGroup.delete_roleUserGroup(ctx.query['userGroupId'], ctx.query['roleId']);
}
app.use(route.post('/roleUserGroup', roleUserGroupInsert));
app.use(route.get('/roleUserGroup', roleUserGroupSearch));
app.use(route.delete('/roleUserGroup', roleUserGroupDelete));


app.listen(3000);