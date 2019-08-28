/*
 * @Author: dexiaojiang 289608944@qq.com
 * @Description: In User Settings Edit
 * @Date: 2019-07-16 13:59:06
 * @LastEditTime: 2019-08-27 15:25:54
 * @LastEditors: dexiaojiang 289608944@qq.com
 */
import { Context } from 'koa';
import { NO_AUTH_URLS,JWT_SECRET } from '../constants';
import { TOEKN_INVALID } from '../constants/message';
import { log } from '../utils/tools';

const jwt = require('jsonwebtoken');
const auth = async(ctx: Context, next: ()=> Promise<any>)=> {
  const method = ctx.method;
  const path = ctx.path;
  const isNoAuth = NO_AUTH_URLS.some(urlReg => urlReg[0].test(path) && urlReg[1].test(method))
  
  if(isNoAuth 
    || method === 'OPTIONS' 
    || path === '/favicon.ico'
    || ~path.indexOf('/images/')
    || ~path.indexOf('/mobile')) {//如果是跨域预检请求放行  移动接口暂时不校验
    await next()
  }else {
    let token;
    const tokens = ctx.header['authorization'];
    if( tokens ){
      token = tokens.split(' ')[1]
    }
    if(!token) {
      ctx.throw(401, 'Token not found' )
    }
    try{
      jwt.verify(token,JWT_SECRET);
      await next()
    }catch(e){
      // invalid token - synchronous
      ctx.throw(401, e.message, { originalError: e });
    }
  }
}

export default auth;