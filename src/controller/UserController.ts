/*
 * @Description: UserController
 * @Author: jiangdexiao@icarbonx.com
 * @Date: 2019-06-21 17:23:30
 * @LastEditTime: 2019-07-24 14:48:48
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
// import BaseController from '../abstract/BaseController';
const jwt = require('jsonwebtoken');
const EnumRoleType = {
  ADMIN: 'admin',
  DEFAULT: 'guest',
  DEVELOPER: 'developer',
}
const userPermission = {
  DEFAULT: {
    visit: ['1', '2', '21', '7', '5', '51', '52', '53'],
    role: EnumRoleType.DEFAULT,
  },
  ADMIN: {
    role: EnumRoleType.ADMIN,
  },
  DEVELOPER: {
    role: EnumRoleType.DEVELOPER,
  },
}

export default class UserController {

  /**
   * 获取当前用户
   * @param ctx 
   */
  public static async queryInfo(ctx: Context): Promise<void> {
    const authorization = ctx.header['authorization'];
    const token = authorization.split(' ')[1];
    const {user} = jwt.decode(token);
    let result=null;
    try {
      result = await DBHelper.manager().findOne(T_User,{
        select:[
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
          'avatar',
          'createdAt',
          'createdBy',
        ],
        where:{
          id:user.id,
        },
      });
      result.permissions = userPermission.ADMIN;
    } catch (error) {
      
    }
    ctx.json({data:result});
  }

  /**
   * 根据id查询
   * @param ctx 
   */
  public static async queryById(ctx: Context): Promise<void> {
    console.log(ctx);
  }
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
      order:{id:'ASC'},
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

  public static async getMenus(ctx: Context) {
    const database = [
      { id: '1',
        icon: 'dashboard',
        name: 'Dashboard',
        zh: {
          name: '仪表盘'
        },
        route: '/dashboard',
      },
      {
        id: '2',
        name: 'Account',
        zh: {
          name: '账户管理'
        },
        icon: 'user',
        route:'/account',
        children:[
          {id:'21',parentid:'2',name:'user',zh: {name: '用户管理'},icon:'user',route:'/account/user'},
          {id:'22',parentid:'2',name:'role',zh: {name: '角色管理'},icon:'user',route:'/account/role'},
        ]
      },
      {
        id: '7',
        name: 'Posts',
        zh: {
          name: '岗位管理'
        },
        icon: 'shopping-cart',
        route: '/post',
      },
      {
        id: '3',
        name: 'Request',
        zh: {
          name: 'Request'
        },
        icon: 'api',
        route: '/request',
      },
      {
        id: '4',
        name: 'UI Element',
        zh: {
          name: 'UI组件'
        },
        icon: 'camera-o',
        route:'/UIElement',
        children:[
          { id: '41',parentid: '4',name: 'Button',zh: {name: 'Button'},icon: 'edit',route: '/UIElement/button',},
          { id: '42',parentid: '4',name: 'Form',zh: {name: 'Form'},icon: 'edit',route: '/UIElement/form',},
          { id: '43',parentid: '4',name: 'Table',zh: {name: 'Table'},icon: 'edit',route: '/UIElement/table',},
          { id: '44',parentid: '4',name: 'Editor',zh: {name: 'Editor'},icon: 'edit',route: '/UIElement/editor',},
        ]
      },
      {
        id: '5',
        name: 'Charts',
        zh: {
          name: 'Charts'
        },
        icon: 'code-o',
        route:'/chart',
        children:[
          {id: '51', parentid: '5',name: 'ECharts',zh: { name: 'ECharts'}, icon: 'line-chart',route: '/chart/ECharts',},
          {id: '52', parentid: '5',name: 'HighCharts',zh: { name: 'HighCharts'}, icon: 'bar-chart',route: '/chart/highCharts',},
          {id: '53', parentid: '5',name: 'Rechartst',zh: { name: 'Rechartst'}, icon: 'area-chart',route: '/chart/Recharts',},
        ]
      },
      {
        id: '6',
        name: 'Test',
        zh: {
          name: '测试'
        },
        icon: 'code-o',
        route:'/test',
        hideInMenu: true,
        authority: ['admin'],
      },
    ]
    ctx.json({data:database})
  }
}