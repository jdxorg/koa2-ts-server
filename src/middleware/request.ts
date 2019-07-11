import { Context } from 'koa';

const interceptors = async (ctx: Context, next: () => void) => {
  console.log(`request from ${ctx.request.ip} to ${ctx.path}`);
  await next();
};

export default interceptors;
