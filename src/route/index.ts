import * as compose from 'koa-compose';
import * as Router from 'koa-router';
// Import all routes
import user from './user';
import role from './role';

export default () => compose([
  user(),
  role(),
]);
