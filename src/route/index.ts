/*
 * @Author: dexiaojiang 289608944@qq.com
 * @Description: In User Settings Edit
 * @Date: 2019-07-11 14:10:03
 * @LastEditTime: 2019-08-23 18:10:17
 * @LastEditors: dexiaojiang 289608944@qq.com
 */
import * as compose from 'koa-compose';
import * as Router from 'koa-router';
// Import all routes
import user from './pc/user';
import role from './pc/role';
import weixin from './weixin/mini'

export default () => compose([
  user(),
  role(),
  weixin()
]);
