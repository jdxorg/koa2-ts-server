import { methodNotAllowed, notImplemented } from 'boom';
import * as compose from 'koa-compose';
import * as Router from 'koa-router';

import RoleController from '../controller/RoleController';

import {
  account_role,
  account_role_deleteMany,
  account_role_relations,
} from './api';
const router = new Router();

router
  .get(account_role, RoleController.getListByPage)
  .post(account_role, RoleController.add)
  .put(`${account_role}/:id`, RoleController.modify)
  .delete(`${account_role}/:id`, RoleController.removeById)
  .post(`${account_role_deleteMany}`,RoleController.removeByIds)
  .get(`${account_role}/:id`,RoleController.queryById)
  .get(`${account_role_relations}`,RoleController.getRelations)
  .post(`${account_role}/:id`,RoleController.saveUserRole)

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
