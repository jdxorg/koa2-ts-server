import { Context } from 'koa';
import { Store } from '../core';
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