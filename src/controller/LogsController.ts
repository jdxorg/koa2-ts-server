import { getMongoManager, getMongoRepository, Like, Between, FindManyOptions, Equal } from 'typeorm';
import { Context } from 'koa';
import { API } from '../entity/mongo/Api';
import { Errors } from '../entity/mongo/Error';
import { Guid , dateFormat } from '../utils/tools';

export default class LogsController {

  /**
   * @description: 
   * @param {type} 
   * @return: 
   */
  static async getById(id: string = '') {
    const api = await getMongoRepository(API,'mongo').findOne({id});
    return api;
  }
  /**
   * @description: 
   * @param {type} 
   * @return: 
   */
  static async getApiPages(ctx: Context) {
    const params = ctx.getParams;
    const query = ctx.query;

    const options: FindManyOptions<API> = {
      skip: params.offset,
      take: params.limit,
      order: {
        createdAt: 'DESC',
      },
      where:{},
    };
    if(query.path) {
      options.where['path'] = query.path;
    }
    if(query.url) {
      options.where['url'] = query.url;
    }
    const pages = await getMongoRepository('API','mongo').findAndCount(options);
    ctx.page({data: pages});
  }

  static async getErrorPages(ctx: Context) {
    const params = ctx.getParams;
    const query = ctx.query;

    const options: FindManyOptions<Errors> = {
      skip: params.offset,
      take: params.limit,
      order: {
        createdAt: 'DESC',
      },
      where:{},
    };
    if(query.path) {
      options.where['path'] = query.path;
    }
    if(query.url) {
      options.where['url'] = query.url;
    }
    const pages = await getMongoRepository('Errors','mongo').findAndCount(options);
    ctx.page({data: pages}); 
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
        if(/^\/account\/login$/.test(ctx.path)){
          let params = ctx.fields;
          params['password'] = '******';
        }
        model.params = ctx.fields
      }
      model.time = options.time;
      const result = await getMongoManager('mongo').save(model);
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
      if(/^\/api\/login$/.test(ctx.path)){
        let params = ctx.fields;
        params['password'] = '******';
      }
      model.params = ctx.fields;
    }

    model.time = options.time;  // deal time
    const result = await getMongoRepository(Errors, 'mongo').save(model);
  }
}