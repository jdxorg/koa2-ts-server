/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-29 17:42:19
 * @LastEditTime: 2019-08-23 18:29:37
 * @LastEditors: dexiaojiang 289608944@qq.com
 */
import { Context } from 'koa';
import { Store } from '../index';
const store = new Store();

export const setOwner = (model: any,ctx: Context,flag: string = 'update') =>{
  const currentUser = store.getLoginer(ctx);
  if(flag === 'insert'){
    model.createdBy = currentUser.loginName;
    model.createdAt = Date.now();
  }
  model.updatedBy = currentUser.loginName;
  model.updatedAt = Date.now();
}

export const getLoginer = (ctx: Context) =>{
  const currentUser = store.getLoginer(ctx);
  return currentUser;
}