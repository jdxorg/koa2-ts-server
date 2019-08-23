/*
 * @Author: dexiaojiang 289608944@qq.com
 * @Description: In User Settings Edit
 * @Date: 2019-08-23 15:36:22
 * @LastEditTime: 2019-08-23 18:46:11
 * @LastEditors: dexiaojiang 289608944@qq.com
 */

import { WEIXIN_SERVER } from '../../constants'
import HttpRequest from '../../utils/tools/request'
import { DBHelper } from '../../utils/database/dbHelper';
import { T_Dictionary } from '../../entity/mysql';

declare type ErrorCode = -1 | 0 | 40029 | 45011
export interface IJsCode2Session {
  openid: string,
  session_key: string,
  unionid: string,
  errcode: ErrorCode,
  errmsg: string
}

export default class Auth {
  
  async login(code: string, APPID?: string): Promise<IJsCode2Session> {
    const jscode2session: string = `${WEIXIN_SERVER}/sns/jscode2session`
    const diactionary = await DBHelper.respository(T_Dictionary).findOne({'key':APPID})
    const SECRET = diactionary?diactionary.value:''
    if( !SECRET ){
      throw 'SECRET is null'
    }
    
    return HttpRequest.sendRequest({
      url:jscode2session,
      data:{
        appid:APPID,
        secret:SECRET,
        js_code:code,
        grant_type:'authorization_code'
      }
    })
  }
}