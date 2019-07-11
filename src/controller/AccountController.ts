import { Context } from 'koa';
import Store  from '../utils/session/store';
import { cryptoPwd} from '../utils/tools';
import {getManager, getRepository, Like, Equal} from "typeorm";
import T_User from '../entity/mysql/t_user';
import { JWT_KEY,JWT_SECRET,EXP_TIME } from '../constants';
import { sign } from '../core/jwt/sign';
import { LOGIN_SUCCESS,LOGOUT_SUCCESS,PASSWORD_ERROR } from '../constants/message';
const store = new Store();
export default class AccountController {

  public static async login(ctx: Context) {
    const inputs: any = (ctx.request as any).body;
    const loginName: string = inputs.loginName;
    const loginPwd: string = inputs.loginPwd;
    if ((loginName && loginName.length > 0) && (loginPwd && loginPwd.length > 5)) {
      // 查询数据库
      const result = await getManager().findOne(T_User, {
        select: ['id', 'loginName', 'userName', 'sex', 'state'],
        where: {
          username: loginName,
          password: cryptoPwd(loginPwd, loginName)
        }
      });
      if (result) {
        const token = sign({ ...result, exp: EXP_TIME }, JWT_SECRET)
        await store.set('true', {
          sid: token,
          maxAge: EXP_TIME // millisecond
        })
        ctx.json({ data: token });
      } else {
        ctx.throw(400, PASSWORD_ERROR);
      }
    } else {
      ctx.throw(400, PASSWORD_ERROR);
    }
  }

  public static async logout(ctx: Context) {
    const tokens = ctx.header['authorization'];
    const token = tokens.split(' ')[1];
    const store = new Store;
    await store.destroy(token);
    ctx.json({ data: 1, msg: LOGOUT_SUCCESS });
  }
}