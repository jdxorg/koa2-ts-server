import * as Koa from 'koa';
import * as jsonMiddleware from 'koa-json';
import requestMiddleware from './request';
import ResponseMiddleware from './response';
import routeMiddleware from '../route';
import Auth from './auth';
const koaBordyParser = require('koa-bodyparser');

const Middlewares = (app: Koa) => {
  
  app.use(koaBordyParser());
  app.use(jsonMiddleware());
  app.use(requestMiddleware);
  app.use(Auth);
  app.use(ResponseMiddleware);
  app.use(routeMiddleware());
};

export default Middlewares;
