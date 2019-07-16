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
  const query = (ctx.request as any).body;
  if (query && Object.keys(query).length>0) {
    const { page, pageSize } = query;
    data['limit'] = (pageSize ? pageSize : 10) * 1;
    let pageNum = (page ? page : 1) - 1;//offset start 0(如果不存在则只返回一条)
    let offset = (page < 1 ? 0 : pageNum) * data['limit'];
    data['offset'] = offset * 1;
    /*filter*/
    if (query['filter'] && query['filter'].length > 0) {
      data['where'] = {};
      for (let filter of query['filter']) {
        if (filter.col === '_orFilter_') {
          data['where']['$or'] = filter.val;
        } else {
          switch (filter.exp) {
            case '=':
              data['where'][filter.col] = filter.val;break;
            case '>':
              data['where'][filter.col] = { $gt: filter.val };break;
            case '>=':
              data['where'][filter.col] = { $gte: filter.val };break;
            case '<':
              data['where'][filter.col] = { $lt: filter.val };break;
            case '<=':
              data['where'][filter.col] = { $lte: filter.val };break;
            case 'in':
              data['where'][filter.col] = { $in: filter.val.split(',') };break;
            case '!=':
              data['where'][filter.col] = { $ne: filter.val };break;
            case 'or':
              data['where'][filter.col] = { $or: filter.val };break;
            case 'like':
                data['where'][filter.col] = { $like: `%${filter.val}%` };break;
            case 'between':
              data['where'][filter.col] = { $between: filter.val };break;
            default: // exp: '='
              data['where'][filter.col] = filter.val;break;
          }
        }
      }
    }
    /*order*/
    if (query['orderBy'] && query['orderBy'].length>0) {
      data['order'] = [];
      let orders = query['orderBy'].map((o: IOrder): string[] => {
        return [o.col, o.dir];
      });
      data['order'] = orders;
    }
  }
  return data;
};

const interceptors = async (ctx: Context, next: () => void) => {
  ctx.getParams = getParams(ctx);
  await next();
};

export default interceptors;
