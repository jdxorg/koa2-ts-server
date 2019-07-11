/*
 * @Description: UserController
 * @Author: jiangdexiao@icarbonx.com
 * @Date: 2019-06-21 17:23:30
 * @LastEditTime: 2019-06-28 17:29:10
 * @LastEditors: Please set LastEditors
 */
import { Context } from 'koa';
import {getManager, getRepository, Like, Equal} from "typeorm";
import { cryptoPwd } from '../utils/tools';
import T_User from '../entity/mysql/t_user';
import { 
  ADD_SUCCESS,
  ADD_FAIL,
  MODIFY_SUCCESS,
  MODIFY_FAIL,
  DELETE_SUCCESS,
  DELETE_FAIL,
  NO_RECORD
} from '../constants/message';
// import BaseController from '../abstract/BaseController';

export default class UserController {

  /**
   * @description: 获取所有用户列表
   * @param {type} 
   * @return: 
   */
  public static async getList(ctx: Context): Promise<void> {
    const users = await getManager().find(T_User);
    
    ctx.json({data:users})
  }

  /**
   * @description:获取用户分页数据 
   * @param {type} 
   * @return: 
   */
  public static async getListByPage(ctx: Context): Promise<void> {
    const data = (ctx.request as any).body;
    const { page, pageSize, sex} = data;
    let strWhere: string = 'user.state = 0';
    if(sex){
      strWhere += `${strWhere} and user.sex=${sex}`
    }
    try {
      const respository = getRepository(T_User).createQueryBuilder('user');
      const total = await respository.getCount()
      const list = await respository
      .where(strWhere)
      .orderBy("user.id", "DESC")
      .skip((page-1)*pageSize)
      .take(pageSize)
      .getMany();
      
      ctx.page({total,list,page,pageSize})
    } catch (error) {
      throw(error)
    }
  }
  /**
   * @description: 新增用户
   * @param {type} 
   * @return: 
   */
  public static async add(ctx: Context): Promise<void> {
    let user = (ctx.request as any).body;
    
    let model = new T_User();
    model.userName = user.userName;
    model.loginName = user.loginName;
    model.loginPwd = cryptoPwd('123456',user.loginName);
    model.mobile = user.mobile;
    model.remark =  user.remark;
    model.sex =  user.sex;
    model.state = 0;
    model.createdBy = '0';
    model.createdAt = parseInt((Date.now()/1000).toString());
    try {
      const result = await getRepository(T_User).save(model);
      ctx.json({data:result,msg:ADD_SUCCESS});
    } catch (error) {
      ctx.json({data:null,msg:ADD_FAIL});
    }
  }
  /**
   * @description: 修改用户
   * @param {type} 
   * @return: 
   */
  public static async modify(ctx: Context): Promise<void> {
    let data = ctx.params;
    const { id } = data;
    const model = await getRepository(T_User).findOne(id);
    if( model ){
      model.updatedBy = '1';
      model.updatedAt = parseInt((Date.now()/1000).toString());
      try {
        const result = await getRepository(T_User).save(model);
        ctx.json({data:result,msg:MODIFY_SUCCESS});
      } catch (error) {
        ctx.json({data:id,msg:MODIFY_FAIL});
      }
    }else{
      ctx.json({data:id,msg:NO_RECORD});
    }
  }
  /**
   * @description: 删除用户
   * @param {type} 
   * @return: 
   */
  public static async removeById(ctx: Context): Promise<void> {
    let data = ctx.params;
    const { id } = data;
    const model = await getRepository(T_User).findOne(id);
    if(model){
      try {
        const result = await getRepository(T_User).remove(model);
        ctx.body = {code:0,message:'success'};
        ctx.json({data:id,msg:DELETE_SUCCESS});
      } catch (error) {
        ctx.json({data:id,msg:DELETE_FAIL});
      }
    }else{
      ctx.json({data:id,msg:NO_RECORD});
    }
  }
}