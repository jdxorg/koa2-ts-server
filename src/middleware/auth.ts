import { Context } from 'koa';
import { NO_AUTH_URLS,JWT_SECRET } from '../constants';
import { TOEKN_INVALID } from '../constants/message';
import { log } from '../utils/tools';

const jwt = require('jsonwebtoken');
const auth = async(ctx: Context, next: ()=> Promise<any>)=> {
  const method = ctx.method;
  const path = ctx.path;
  const isNoAuth = NO_AUTH_URLS.some(urlReg => urlReg[0].test(path) && urlReg[1].test(method))
  if(isNoAuth) {
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