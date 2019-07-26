import * as Koa from 'koa';
import * as jsonMiddleware from 'koa-json';
import requestMiddleware from './request';
import ResponseMiddleware from './response';
import routeMiddleware from '../route';
import Auth from './auth';
import Cors from './cors';

const koaBody = require('koa-body');
const path = require('path');
const fs = require('fs');

const Middlewares = (app: Koa) => {
  
  app.use(koaBody({
    multipart:true, // 支持文件上传
    formidable:{
      uploadDir:path.join(__dirname,'../uploads'), // 设置文件上传目录
      keepExtensions: true,    // 保持文件的后缀
      maxFieldsSize:2 * 1024 * 1024, // 文件上传大小
      onFileBegin:() => { // 文件上传前的设置
        const uploads = path.join(__dirname,'../uploads');
        const images = path.join(__dirname,'../uploads/images');
        if(!fs.existsSync(uploads)){
          fs.mkdirSync(uploads); // 没有就创建
        }
        if(!fs.existsSync(images)){
          fs.mkdirSync(images);
        }
      },
    }
  }));
  app.use(jsonMiddleware());
  app.use(requestMiddleware);
  app.use(Auth);
  app.use(Cors);
  app.use(ResponseMiddleware);
  app.use(routeMiddleware());
};

export default Middlewares;
