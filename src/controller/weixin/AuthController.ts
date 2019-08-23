/*
 * @Author: dexiaojiang 289608944@qq.com
 * @Description: In User Settings Edit
 * @Date: 2019-08-23 17:59:06
 * @LastEditTime: 2019-08-23 18:30:00
 * @LastEditors: dexiaojiang 289608944@qq.com
 */
import { Context } from 'koa';
import Auth2, { IJsCode2Session } from '../../core/lib/Auth2'

export default class AuthController { 

  /**
   * @description: 微信登录
   * @param {type} 
   * @return: 
   */
  static async wechatLogin(ctx: Context): Promise<void>{
    const { code,appid } = ctx.params;
    const auth2: Auth2 = new Auth2()
    let res: IJsCode2Session | null = null
    try {
      res = await auth2.login(code,appid)
    } catch (error) {
    }
    ctx.json({
      data:res
    })
  }
}