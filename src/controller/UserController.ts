/*
 * @Description: UserController
 * @Author: jiangdexiao@icarbonx.com
 * @Date: 2019-06-21 17:23:30
 * @LastEditTime: 2019-07-16 18:10:09
 * @LastEditors: Please set LastEditors
 */
import { Context } from 'koa';
import { cryptoPwd,DBHelper } from '../utils/tools';
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
    const users = await DBHelper.manager().find(T_User);
    
    ctx.json({data:users})
  }

  /**
   * @description:获取用户分页数据 
   * @param {type} 
   * @return: 
   */
  public static async getListByPage(ctx: Context): Promise<void> {
    const params = ctx.getParams;
    const data = (ctx.request as any).body;
    const {sex=null,state=0} = data;
    const options = DBHelper.getManyOptions<T_User>({
      offset:params.offset,
      limit:params.limit,
      order:{id:'DESC'},
      where:{
        state,
        sex,
      }
    });
    try {
      const pages = await DBHelper.respository(T_User).findAndCount(options);
      ctx.page({list:pages[0],total:pages[1]})
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
      const result = await DBHelper.respository(T_User).save(model);
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
    const model = await DBHelper.respository(T_User).findOne(id);
    if( model ){
      model.updatedBy = '1';
      model.updatedAt = parseInt((Date.now()/1000).toString());
      try {
        const result = await DBHelper.respository(T_User).save(model);
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
    const model = await DBHelper.respository(T_User).findOne(id);
    if(model){
      try {
        const result = await DBHelper.respository(T_User).remove(model);
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