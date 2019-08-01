/*
 * @Description: UserController
 * @Author: jiangdexiao@icarbonx.com
 * @Date: 2019-06-21 17:23:30
 * @LastEditTime: 2019-07-31 15:55:25
 * @LastEditors: Please set LastEditors
 */
import { Context } from 'koa';
import { cryptoPwd,DBHelper } from '../utils/tools';
import {T_User} from '../entity/mysql';
import { 
  ADD_SUCCESS,
  ADD_FAIL,
  MODIFY_SUCCESS,
  MODIFY_FAIL,
  DELETE_SUCCESS,
  DELETE_FAIL,
  NO_RECORD
} from '../constants/message';
import { setOwner,getLoginer } from './common';
// import BaseController from '../abstract/BaseController';
import T_Menu from '../entity/mysql/t_menu';
import T_Role from '../entity/mysql/t_role';

const jwt = require('jsonwebtoken');

const select = [
  'id',
  'loginName',
  'userName',
  'nickName',
  'age',
  'mobile',
  'email',
  'gender',
  'remark',
  'state',
  'address',
  'addressCode',
  'familyAddress',
  'avatar',
  'createdAt',
  'createdBy',
]

export default class UserController {

  private static async getUserInfo(id: number): Promise<T_User|undefined> {
    let result: T_User|undefined;
    try {
      result = await DBHelper.respository(T_User)
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.loginName',
        'user.userName',
        'user.nickName',
        'user.age',
        'user.mobile',
        'user.email',
        'user.gender',
        'user.remark',
        'user.state',
        'user.address',
        'user.addressCode',
        'user.familyAddress',
        'user.avatar',
        'user.visit',
      ])
      .leftJoinAndSelect('user.relations','relation')
      .where('user.id= :id',{id})
      .getOne();
      if(result){
        result.addressCode = result.addressCode?JSON.parse(result.addressCode):null;
        result.visit = result.visit?JSON.parse(result.visit):null;
        const ids  = result.relations?result.relations.map(r=> r.roleId):[];
        if(ids){
          const roles = await DBHelper.manager().findByIds(T_Role,ids);
          result.roles = roles.map(r=>r.roleName);
        }
      }
    } catch (error) {
      throw error;
    }
    return result;
  }

  /**
   * 获取当前登录用户
   * @param ctx 
   */
  public static async queryInfo(ctx: Context): Promise<void> {
    const user = getLoginer(ctx);
    try {
      const result = await UserController.getUserInfo(user?user.id:'');
      const menus = await UserController.getMenusByIds(result&&result.visit?result.visit:'');
      result.menus = menus;
      ctx.json({data:result});
    } catch (error) {
      ctx.json({data:null,msg:error.message});
    }
  }

  /**
   * 根据id查询
   * @param ctx 
   */
  public static async queryById(ctx: Context): Promise<void> {
    const {id} = ctx.params;
    try {
      const result = await UserController.getUserInfo(id);
      ctx.json({data:result});
    } catch (error) {
      ctx.json({data:null,msg:error.message});
    }
  }

  /**
   * @description:获取用户分页数据 
   * @param {type} 
   * @return: 
   */
  public static async getListByPage(ctx: Context): Promise<void> {
    const {offset,limit,params} = ctx.getParams;
    const {state=1,...rest} = params||{};
    // const options = DBHelper.getManyOptions<T_User>({
    //   offset,
    //   limit,
    //   order:{id:'ASC'},
    //   where:{
    //     state,
    //     ...rest,
    //   },
    //   select,
    // });
    // const pages = await DBHelper.respository(T_User).findAndCount(options)
    try {
      const query = DBHelper.respository(T_User)
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.loginName',
        'user.userName',
        'user.nickName',
        'user.age',
        'user.mobile',
        'user.email',
        'user.gender',
        'user.remark',
        'user.state',
        'user.address',
        'user.addressCode',
        'user.familyAddress',
        'user.avatar',
        'user.createdAt',
        'user.createdBy',
        'user.updatedAt',
        'user.updatedBy',
      ])
      .where('user.state=:state');
      if(rest && rest.userName){
        query.andWhere('user.userName= :userName');
      }
      if(rest && rest.addressCode){
        query.andWhere('user.addressCode= :addressCode');
      }
      if(rest && rest.createBegin){
        query.andWhere('user.createdAt>= :createBegin');
      }
      if(rest && rest.createEnd){
        query.andWhere('user.createdAt<= :createEnd');
      }
      const pages = await query.orderBy('user.id','ASC')
      .offset(offset)
      .limit(limit)
      .setParameters({state,...rest})
      .getManyAndCount();

      const list = pages[0].map(user=>{
        if(user.addressCode){
          user.addressCode = JSON.parse(user.addressCode);
        }
        return user;
      });
      ctx.page({list:list,total:pages[1]})
    } catch (error) {
      throw(error)
    }
  }

  /**
   * @description: 获取列表
   * @param {type} 
   * @return: 
   */
  public static async getList(ctx: Context): Promise<void> {
    try {
      const result = await DBHelper.respository(T_User)
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.loginName',
        'user.userName'
      ])
      .orderBy('user.id','ASC')
      .getMany();
      ctx.json({data:result});
    } catch (error) {
      ctx.json({data:null,msg:error.message});
    }
  }

  /**
   * @description: 新增用户
   * @param {type} 
   * @return: 
   */
  public static async add(ctx: Context): Promise<void> {
    const PWD = '123456';
    let user = ctx.getParams.params;
    let model = new T_User();
    model.userName = user.userName;
    model.loginName = user.loginName;
    model.nickName = user.nickName;
    model.loginPwd = cryptoPwd(PWD,user.loginName);
    model.mobile = user.mobile;
    model.remark =  user.remark;
    model.gender =  user.gender;
    model.state = user.state;
    model.address = user.address;
    model.addressCode = JSON.stringify(user.addressCode);
    model.familyAddress = user.familyAddress;
    model.age = user.age;
    model.avatar = user.avatar;
    model.email = user.email;
    setOwner(model,ctx,'insert');
    try {
      const result = await DBHelper.respository(T_User).save(model);
      ctx.json({data:result,msg:ADD_SUCCESS});
    } catch (error) {
      ctx.json({data:null,msg:error.message});
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
      let user = ctx.getParams.params;
      model.userName = user.userName;
      model.nickName = user.nickName;
      model.mobile = user.mobile;
      model.remark =  user.remark;
      model.gender =  user.gender;
      model.state = user.state;
      model.address = user.address;
      model.addressCode = JSON.stringify(user.addressCode);
      model.familyAddress = user.familyAddress;
      model.age = user.age;
      model.avatar = user.avatar;
      model.email = user.email;
      setOwner(model,ctx);
      try {
        const result = await DBHelper.respository(T_User).save(model);
        ctx.json({data:result,msg:MODIFY_SUCCESS});
      } catch (error) {
        ctx.json({data:null,msg:error.message});
      }
    }else{
      ctx.json({data:null,msg:NO_RECORD});
    }
  }

  public static async modifyPermission(ctx: Context): Promise<void> {
    const { id } = ctx.params;
    let {visit} = ctx.getParams.params;
    try {
      const result = await DBHelper.respository(T_User)
      .createQueryBuilder()
      .update(T_User)
      .set({visit:visit?JSON.stringify(visit):''})
      .where("id= :id",{id})
      .execute();
      ctx.json({data:id,msg:MODIFY_SUCCESS});
    } catch (error) {
      ctx.json({data:null,msg:error.message});
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
        ctx.json({data:id,msg:DELETE_SUCCESS});
      } catch (error) {
        ctx.json({data:null,msg:DELETE_FAIL});
      }
    }else{
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
      const users = await DBHelper.respository(T_User).findByIds(ids);
      const result = await DBHelper.respository(T_User).remove(users);
      ctx.json({data:result,msg:DELETE_SUCCESS});
    } catch (error) {
      ctx.json({data:null,msg:DELETE_FAIL});
    }
  } 

  private static recursion(result: T_Menu[] ,item: T_Menu): object{
    let children = result.filter(p=> p.parentid === item.id);
    children = children.map(child=>{
      return UserController.recursion(result,child)
    })
    return{
      id:item.id.toString(),
      key:item.id.toString(),
      parentid:item.parentid,
      name:item.name,
      zh:{
        name:item.zh,
      },
      title:item.name,
      icon:item.icon,
      route:item.route,
      display:!!item.display,
      children:children.length>0?children:null,
    }
  }
  public static async getMenus(ctx: Context): Promise<void>{
    const result: T_Menu[] = await DBHelper.respository(T_Menu)
    .createQueryBuilder('menu')
    .select([
      'menu.id',
      'menu.parentid',
      'menu.name',
      'menu.zh',
      'menu.icon',
      'menu.route',
      'menu.display'
    ])
    .getMany();
    const roots = result.filter(p=>p.parentid===null);
    const menus = roots.map(o=>{
      return UserController.recursion(result,o);
    })
    ctx.json({data:menus})
  }
  
  public static async getMenusByIds(ids:string):Promise<object[]> {
    let menus: object[] = [];
    try {
      let result: T_Menu[] = await DBHelper.respository(T_Menu)
      .createQueryBuilder('menu')
      .select([
        'menu.id',
        'menu.parentid',
        'menu.name',
        'menu.zh',
        'menu.icon',
        'menu.route',
        'menu.display'
      ])
      .where('menu.id in (:ids)',{ids})
      .getMany();
      const roots = result.filter(p=>p.parentid===null);
      menus = roots.map(o=>{
        return UserController.recursion(result,o);
      })
    } catch (error) {
      throw error;
    }
    return menus;
  }
}