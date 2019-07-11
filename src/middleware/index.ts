import * as Koa from 'koa';
// import Auth from './auth'
// import Cors from './cors';
// import JWT from './xJwt'
const koaBordyParser = require('koa-bodyparser');
import * as jsonMiddleware from 'koa-json';
import requestMiddleware from './request';
import ResponseMiddleware from './response';
import routeMiddleware from '../route';

const Middlewares = (app: Koa) => {
  
  app.use(koaBordyParser());
  app.use(jsonMiddleware());
  app.use(requestMiddleware);
  app.use(ResponseMiddleware);
  app.use(routeMiddleware());
};

export default Middlewares;
