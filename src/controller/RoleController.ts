/*
 * @Description: UserController
 * @Author: jiangdexiao@icarbonx.com
 * @Date: 2019-06-21 17:23:30
 * @LastEditTime: 2019-07-30 17:12:05
 * @LastEditors: Please set LastEditors
 */
import { Context } from 'koa';
import { cryptoPwd,DBHelper } from '../utils/tools';
import {T_Role,T_User_Role} from '../entity/mysql';
import { 
  ADD_SUCCESS,
  ADD_FAIL,
  MODIFY_SUCCESS,
  MODIFY_FAIL,
  DELETE_SUCCESS,
  DELETE_FAIL,
  NO_RECORD
} from '../constants/message';

import { setOwner } from './common';
import user from '../route/user';
import T_User from '../../out/entity/mysql/t_user';
export default class UserController {

  /**
   * 根据id查询
   * @param ctx 
   */
  public static async queryById(ctx: Context): Promise<void> {
    const {id} = ctx.params;
    const model = await DBHelper.respository(T_Role).findOne(id);
    ctx.json({data:model});
  }

  /**
   * @description:获取用户分页数据 
   * @param {type} 
   * @return: 
   */
  public static async getListByPage(ctx: Context): Promise<void> {
    const {offset,limit,params} = ctx.getParams;
    const {...rest} = params||{};
    if(rest&&!rest.roleName){
      delete rest.roleName;
    }
    const options = DBHelper.getManyOptions<T_Role>({
      offset,
      limit,
      order:{id:'ASC'},
      where:{
        ...rest,
      },
    });
    try {
      const pages = await DBHelper.respository(T_Role).findAndCount(options)
      ctx.page({list:pages[0],total:pages[1]})
    } catch (error) {
      throw(error)
    }
  }

  /**
   * @description: 获取角色用户
   * @param {type} 
   * @return: 
   */
  public static async getRelations(ctx: Context): Promise<void> {
    const {id} = ctx.params;
    try {
      const list = await DBHelper.respository('T_User')
      .createQueryBuilder('u')
      .select([
        'u.id',
        'u.loginName',
        'u.userName',
      ])
      .innerJoin('T_User_Role','ur','ur.userId=u.id')
      .innerJoin('T_Role','r','ur.roleId=r.id')
      .where('r.id= :id',{id})
      .getMany();
      ctx.json({data:list});
    } catch (error) {
      ctx.json({data:null,msg:error.message});
    }
  }

  /**
   * @description:保存用户角色关系 
   * @param {type} 
   * @return: 
   */
  public static async saveUserRole(ctx: Context): Promise<void> {
    let {id,userIds} = ctx.getParams.params;
    let data: T_User_Role[] = [];
    if(userIds && userIds.length>0){
      data = userIds.map((userId: number)=> {
        return {'userId':userId,'roleId':id};
      })
    }
    try {
      const result = await DBHelper.manager().transaction(async tran=>{
        const r1 = await tran.delete<T_User_Role>(T_User_Role,{roleId:id});
        if(data.length>0){
          const r2 = await tran.insert<T_User_Role>(T_User_Role,data);
        }
        return true;
      })
      ctx.json({data:result});
    } catch (error) {
      ctx.json({data:null,msg:error.message});
    }
  }

  /**
   * @description: 新增角色
   * @param {type} 
   * @return: 
   */
  public static async add(ctx: Context): Promise<void> {
    let data = ctx.getParams.params;
    let model = new T_Role();
    model.roleName = data.roleName;
    model.roleType = data.roleType;
    model.roleDesc = data.roleDesc;
    model.state = data.state;
    setOwner(model,ctx,'insert');
    try {
      const result = await DBHelper.respository(T_Role).save(model);
      ctx.json({data:result,msg:ADD_SUCCESS});
    } catch (error) {
      ctx.json({data:null,msg:error.message});
    }
  }
  /**
   * @description: 修改角色
   * @param {type} 
   * @return: 
   */
  public static async modify(ctx: Context): Promise<void> {
    let params = ctx.params;
    const { id } = params;
    const model = await DBHelper.respository(T_Role).findOne(id);
    if( model ){
      let data = ctx.getParams.params;
      model.roleName = data.roleName;
      model.roleType = data.roleType;
      model.roleDesc = data.roleDesc;
      model.state = data.state;
      setOwner(model,ctx)
      try {
        const result = await DBHelper.respository(T_Role).save(model);
        ctx.json({data:result,msg:MODIFY_SUCCESS});
      } catch (error) {
        ctx.json({data:null,msg:error.message});
      }
    }else{
      ctx.json({data:null,msg:NO_RECORD});
    }
  }

  /**
   * @description: 删除角色
   * @param {type} 
   * @return: 
   */
  public static async removeById(ctx: Context): Promise<void> {
    let data = ctx.params;
    const { id } = data;
    try {
      const result = await DBHelper.respository(T_Role)
      .createQueryBuilder()
      .delete()
      .where('id = :id',{id})
      .execute();
      ctx.json({data:id,msg:DELETE_SUCCESS});
    } catch (error) {
      ctx.json({data:null,msg:NO_RECORD});
    }
  }

  /**
   * @description: 批量删除
   * @param {type} 
   * @return: 
   */
  public static async removeByIds(ctx: Context): Promise<void>{
    let params = ctx.getParams.params;
    const { ids } = params;
    try {
      const result = await DBHelper.respository(T_Role)
      .createQueryBuilder()
      .delete()
      .where('id in (:ids)',{ids:ids.join(',')})
      .execute();
      
      ctx.json({data:ids,msg:DELETE_SUCCESS});
    } catch (error) {
      ctx.json({data:'',msg:DELETE_FAIL});
    }
  } 

}