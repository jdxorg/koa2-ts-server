/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-11 14:10:03
 * @LastEditTime: 2019-08-23 15:35:27
 * @LastEditors: Please set LastEditors
 */
import { methodNotAllowed, notImplemented } from 'boom';
import * as compose from 'koa-compose';
import * as Router from 'koa-router';

import UserController from '../../controller/pc/UserController';
import AccountController from '../../controller/pc/AccountController';
import LogsController from '../../controller/LogsController';
import UploadController from '../../controller/UploadController';

import {
  account_login,
  account_logout,
  account_menus,
  account_upload_file,
  account_upload_files,
  account_user,
  account_users,
  account_userInfo,
  accoutn_user_deleteMany,
  accoutn_user_permission,
} from '../api';
const router = new Router();

router
  .post(account_login,AccountController.login)
  .post(account_logout,AccountController.logout)
  .get(account_menus,UserController.getMenus)
  .get(account_user, UserController.getListByPage)
  .post(account_user, UserController.add)
  .put(`${account_user}/:id`, UserController.modify)
  .delete(`${account_user}/:id`, UserController.removeById)
  .post(`${accoutn_user_deleteMany}`,UserController.removeByIds)
  .get(`${account_user}/:id`,UserController.queryById)
  .get(account_userInfo,UserController.queryInfo)
  .get(account_users,UserController.getList)
  .put(`${accoutn_user_permission}/:id`,UserController.modifyPermission)

  .post(account_upload_file,UploadController.uploadFile)
  .post(account_upload_files,UploadController.uploadFiles)
  .get('/api/logger', LogsController.getApiPages);

const routes = router.routes();
const allowedMethods = router.allowedMethods({
  methodNotAllowed: () => methodNotAllowed(),
  notImplemented: () => notImplemented(),
  throw: true,
});

export default () => <any>compose([
  routes,
  allowedMethods,
]);
