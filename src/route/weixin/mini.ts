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
 * @LastEditTime: 2019-08-27 10:09:48
 * @LastEditors: dexiaojiang 289608944@qq.com
 */
import { methodNotAllowed, notImplemented } from 'boom';
import * as compose from 'koa-compose';
import * as Router from 'koa-router';

import AuthController from '../../controller/weixin/AuthController';
import BannerController from '../../controller/weixin/BannerController';
import NavbarController from '../../controller/weixin/NavbarController';

import { 
  weixinLogin,
  mobileHome,
  saveBanner,
  queryBanner,
  updateBanner,
  removeBanner,

  saveNavbar,
  updateNavbar,
  queryNavbar,
  removeNavbar,

} from '../weixin';

const router = new Router();

router
  .get(weixinLogin, AuthController.wechatLogin)
  .get(mobileHome,BannerController.getMobileHome)
  .post(saveBanner,BannerController.save)
  .put(updateBanner,BannerController.update)
  .get(queryBanner,BannerController.query)
  .delete(removeBanner,BannerController.remove)

  .post(saveNavbar,NavbarController.save)
  .put(updateNavbar,NavbarController.update)
  .get(queryNavbar,NavbarController.query)
  .delete(removeNavbar,NavbarController.remove)

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
