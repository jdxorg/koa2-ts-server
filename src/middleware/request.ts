import { Context } from 'koa';

interface IFilter {
  col: string
  val: string
  exp: string
}
interface IOrder {
  col: string
  dir: string
}

const getParams = (ctx: Context) => {
  const data: any = {};
  const query = (ctx.request as any).query;
  const body = (ctx.request as any).body;
  if (query && Object.keys(query).length>0) {
    const { current, pageSize } = query;
    data['limit'] = (pageSize ? pageSize : 10) * 1;
    let pageNum = (current ? current : 1) - 1;//offset start 0(如果不存在则只返回一条)
    let offset = (current < 1 ? 0 : pageNum) * data['limit'];
    data['offset'] = offset * 1;
  }
  if(body && Object.keys(body).length>0){
    data['params'] = body||{};
  }
  return data;
};

const interceptors = async (ctx: Context, next: () => void) => {
  ctx.getParams = getParams(ctx);
  await next();
};

export default interceptors;
