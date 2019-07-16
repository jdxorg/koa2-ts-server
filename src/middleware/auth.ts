import { Context } from 'koa';
import { verify } from '../core';
import { NO_AUTH_URLS,JWT_SECRET } from '../constants';
import { TOEKN_INVALID } from '../constants/message';
import { log } from '../utils/tools';

export default async(ctx: Context, next: ()=> Promise<any>)=> {
  const method = ctx.method;
  const path = ctx.path;
  if(NO_AUTH_URLS.some(urlReg => urlReg[0].test(path) && urlReg[1].test(method))) {
    await next()
  }else {
    const token = ctx.header['authorization'];
    if(!token) {
      ctx.throw(401, 'Token not found' )
    }
    try{
      let result = verify(token,{secret:JWT_SECRET});
      // 如果考验通过就next，否则就返回登陆信息不正确
      if (!result[0]) {
        ctx.throw(401, result[1])
      }
    }catch(e){
      ctx.throw(401, e.message, { originalError: e });
    }
  }
}