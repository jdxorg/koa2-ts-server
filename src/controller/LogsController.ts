import { Context } from 'koa';
import API from '../entity/mongo/Api';
import Errors from '../entity/mongo/Error';
import { T_User_Login_Info } from '../entity/mysql';
import { Guid , dateFormat,DBHelper } from '../utils/tools';
import { CUR_USER,SYSTEM_PLATFORM } from '../constants/index';

export default class LogsController {

  /**
   * @description: 
   * @param {type} 
   * @return: 
   */
  static async getById(id: string = '') {
    const api = await DBHelper.mongoRespository('API').findOne({id});
    return api;
  }
  /**
   * @description: 
   * @param {type} 
   * @return: 
   */
  static async getApiPages(ctx: Context) {
    const params = ctx.getParams;
    const options = DBHelper.getManyOptions<API>({offset:params.offset,limit:params.limit,order:{createdAt:'DESC'}});
    const pages = await DBHelper.mongoRespository('API').findAndCount(options);
    ctx.page({list: pages[0], total: pages[1]}); 
  }

  static async getErrorPages(ctx: Context) {
    const params = ctx.getParams;
    const options = DBHelper.getManyOptions<API>({offset:params.offset,limit:params.limit,order:{createdAt:'DESC'}});
    const pages = await DBHelper.mongoRespository('Errors').findAndCount(options);
    ctx.page({list: pages[0], total: pages[1]}); 
  }
 /**
   * @description: api log
   * @param {type} 
   * @return: 
   */
  static async addApiLogger(ctx: Context, options: any): Promise<void> {
    if(!/^\/api\/log-(api|errors)$/.test(ctx.path)) {
      const guid = Guid();
      const model = new API();
      const method = ctx.method;
      model.id = guid;
      model.ip = ctx.header['x-real-ip']||ctx.req.connection.remoteAddress;
      model.path = ctx.path;
      model.url = ctx.url;
      model.status = ctx.status;
      model.origin = ctx.origin;
      model.hostname = ctx.header['x-host'];
      model.headers = ctx.header;
      model.resHeaders = ctx.response.header;
      model.resData = ctx.body;
      model.protocol = ctx.protocol;
      model.createdAt = dateFormat(Date.now(),'YYYY/MM/DD HH:mm:ss.SSS');
      model.createdBy = ctx.state['CUR_USER']?ctx.state['CUR_USER'].id:model.ip;
      model.method = method;
      if(method === 'GET') {
        model.params = ctx.querystring;
      } else if(/^P(U|OS)T$/.test(method)) {
        let params = (ctx.request as any ).body;
        if(/^\/account\/login$/.test(ctx.path)){
          params['loginPwd'] = '******';
        }
        model.params = params;
      }
      model.time = options.time;
      try {
        const result = await DBHelper.mongoManager().save(model);
      } catch (error) {
        console.log('addApiLogger error',error)
      }
    }
  }
  /**
   * @description: error log
   * @param {type} 
   * @return: 
   */
  static async addErrorlogger (ctx: Context, options: any): Promise<void> {
    const guid = Guid();
    const model = new Errors();
    const method = ctx.method;
    model.id = guid;
    model.ip = ctx.header['x-real-ip'] || ctx.req.connection.remoteAddress;
    model.path = ctx.path;
    model.url = ctx.url;
    model.origin = ctx.origin;
    model.hostname = ctx.header['x-host'];
    model.headers = ctx.header;
    model.resHeaders = ctx.response.header;
    model.resData = ctx.body;
    model.protocol = ctx.protocol;
    model.createdAt = dateFormat(Date.now(),'YYYY/MM/DD HH:mm:ss.SSS');
    model.createdBy = ctx.state['CUR_USER'] ? ctx.state['CUR_USER'].id : model.ip;

    model.status = options.status;
    model.errors = options.errors;
    model.msg = options.msg;

    model.method = method;
    if(method === 'GET') {
      model.params = ctx.querystring;
    } else if(/^P(U|OS)T$/.test(method)){
      let params = (ctx.request as any ).body;
      if(/^\/account\/login$/.test(ctx.path)){
        params['loginPwd'] = '******';
      }
      model.params = params;
    }

    model.time = options.time;  // deal time
    try {
      const result = await DBHelper.mongoRespository('Errors').save(model);
    } catch (error) {
      console.log('addErrorlogger',error)
    }
  }

   /**
   * @description: 登录/登出日志
   * @param {type} 
   * @return: 
   */
  public static async addLoginInfo(ctx: Context,operate: string,id: number): Promise<void> {
    let model: T_User_Login_Info  = new T_User_Login_Info();
    model.user_id = id?id:-1;
    model.last_ip = ctx.header['x-real-ip'] || ctx.req.connection.remoteAddress;
    model.last_time = dateFormat(Date.now(),'YYYY/MM/DD HH:mm:ss.SSS');
    model.system_type = SYSTEM_PLATFORM.ADMIN;
    model.operate = operate;
    try {
      const result = await DBHelper.respository(T_User_Login_Info).save(model);
    } catch (error) {
      console.log('addLoginInfo error',error)
    }
  }
}