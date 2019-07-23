import { methodNotAllowed, notImplemented } from 'boom';
import * as compose from 'koa-compose';
import * as Router from 'koa-router';

import UserController from '../controller/UserController';
import AccountController from '../controller/AccountController';
import LogsController from '../controller/LogsController';

const router = new Router();

router
  .post('/account/login',AccountController.login)
  .post('/account/logout',AccountController.logout)
  .get('/account/menus',UserController.getMenus)
  // .get('/account/users', UserController.getList)
  .get('/account/user', UserController.getListByPage)
  .post('/account/user', UserController.add)
  .put('/account/user/:id', UserController.modify)
  .delete('/account/user/:id', UserController.removeById)
  .get('/account/user/:id',UserController.queryById)
  .get('/account/userInfo',UserController.queryInfo)
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
