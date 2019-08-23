/*
 * @Author: dexiaojiang 289608944@qq.com
 * @Description: In User Settings Edit
 * @Date: 2019-08-23 16:01:52
 * @LastEditTime: 2019-08-23 16:01:52
 * @LastEditors: dexiaojiang 289608944@qq.com
 */
/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-29 17:31:25
 * @LastEditTime: 2019-08-23 15:35:16
 * @LastEditors: Please set LastEditors
 */
import { methodNotAllowed, notImplemented } from 'boom';
import * as compose from 'koa-compose';
import * as Router from 'koa-router';

import AuthController from '../../controller/weixin/AuthController';

import { weixinLogin } from '../weixin';

const router = new Router();

router
  .get(weixinLogin, AuthController.wechatLogin)

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
