import { Context } from 'koa';
import { cryptoPwd,dateFormat,DBHelper} from '../../utils/tools';
import { Store } from '../../core';
import {T_User} from '../../entity/mysql';
import { JWT_TOKEN,JWT_SECRET,CUR_USER,EXP_TIME} from '../../constants';
import { LOGIN_SUCCESS,LOGOUT_SUCCESS,PASSWORD_ERROR,TOEKN_INVALID } from '../../constants/message';
import { ErrorCode } from '../../constants/code';
import LogsController from './../LogsController';

const jwt = require('jsonwebtoken');
const store = new Store();
export default class AccountController {

  public static async login(ctx: Context) {
    const inputs: any = (ctx.request as any).body;
    const loginName: string = inputs.username;
    const loginPwd: string = inputs.password;
    if (loginName && loginPwd) {
      // 查询数据库
      const result = await DBHelper.manager().findOne(T_User, {
        select: ['id', 'loginName', 'userName','nickName','age', 'gender', 'state'],
        where: {
          loginName,
          loginPwd: cryptoPwd(loginPwd, loginName)
        },
      });
      if (result) {
        //生成令牌
        var token = jwt.sign({ user: result },JWT_SECRET,{expiresIn:EXP_TIME});

        await LogsController.addLoginInfo(ctx,'login',result.id);
        const token_sid = await store.set(token, {
          sid: `${JWT_TOKEN}_${result.id}`,
          maxAge: EXP_TIME // millisecond
        });
        ctx.json({ data: token });
      } else {
        ctx.json({data:null,msg:PASSWORD_ERROR});
      }
    } else {
      ctx.throw(400, PASSWORD_ERROR);
    }
  }

  public static async logout(ctx: Context) {
    const user = store.getLoginer(ctx);
    try {
      //删除redis里的token令牌
      if(user){
        await store.destroy(`${JWT_TOKEN}_${user.id}`);
        await LogsController.addLoginInfo(ctx,'logout',user.id);
      }
      ctx.json({data:null, msg: LOGOUT_SUCCESS });
    } catch (error) {
      ctx.json({data:null, msg: TOEKN_INVALID,code:ErrorCode.TokenInvalid });
    }
  }
}