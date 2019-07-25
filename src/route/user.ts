import { methodNotAllowed, notImplemented } from 'boom';
import * as compose from 'koa-compose';
import * as Router from 'koa-router';

import UserController from '../controller/UserController';
import AccountController from '../controller/AccountController';
import LogsController from '../controller/LogsController';
import UploadController from '../controller/UploadController';

import {
  account_login,
  account_logout,
  account_menus,
  account_upload_file,
  account_upload_files,
  account_user,
  account_userInfo,
} from './api';
const router = new Router();

router
  .post(account_login,AccountController.login)
  .post(account_logout,AccountController.logout)
  .get(account_menus,UserController.getMenus)
  .get(account_user, UserController.getListByPage)
  .post(account_user, UserController.add)
  .put(`${account_user}/:id`, UserController.modify)
  .delete(`${account_user}/:id`, UserController.removeById)
  .get(`${account_user}/:id`,UserController.queryById)
  .get(account_userInfo,UserController.queryInfo)

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
